package com.diagnostico.raioxbackend.service;

import com.diagnostico.raioxbackend.dto.response.DiagnosticoResponse;
import com.diagnostico.raioxbackend.dto.response.DiseaseProbabilityDto;
import com.diagnostico.raioxbackend.exception.ResourceNotFoundException;
import com.diagnostico.raioxbackend.integration.PythonAiClient;
import com.diagnostico.raioxbackend.integration.dto.PyDiagnosticoRequest;
import com.diagnostico.raioxbackend.integration.dto.PyDiagnosticoResponse;
import com.diagnostico.raioxbackend.model.AnaliseDiagnostico;
import com.diagnostico.raioxbackend.model.DiagnosticoProbabilidade;
import com.diagnostico.raioxbackend.model.ImagemFormato;
import com.diagnostico.raioxbackend.model.Usuario;
import com.diagnostico.raioxbackend.repository.DiagnosticoRepository;
import com.diagnostico.raioxbackend.repository.UsuarioRepository;
import com.diagnostico.raioxbackend.validation.ImageValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.security.MessageDigest;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class DiagnosticoService {

    private static final Map<String, String> SEVERIDADE_MAP = Map.of(
            "Normal",          "none",
            "Pneumonia",       "moderate",
            "Tuberculose",     "high",
            "Cardiomegalia",   "moderate",
            "Derrame Pleural", "high"
    );

    private final DiagnosticoRepository diagnosticoRepository;
    private final UsuarioRepository usuarioRepository;
    private final StorageService storageService;
    private final PythonAiClient pythonAiClient;
    private final ImageValidator imageValidator;

    @Async("aiExecutor")
    @Transactional
    public CompletableFuture<DiagnosticoResponse> analisar(MultipartFile imagem, String usuarioId) throws Exception {
        ImagemFormato formato = imageValidator.validarEDetectarFormato(imagem);

        byte[] bytes = imagem.getBytes();
        String hash = computarHash(bytes);
        String imagemPath = storageService.armazenarTemp(imagem, hash, formato);
        String base64 = Base64.getEncoder().encodeToString(bytes);
        String requestId = UUID.randomUUID().toString();

        long inicio = System.currentTimeMillis();
        PyDiagnosticoResponse pyResp = pythonAiClient.preverDiagnostico(
                new PyDiagnosticoRequest(base64, hash, requestId));
        int duracaoMs = (int) (System.currentTimeMillis() - inicio);

        List<PyDiagnosticoResponse.Probabilidade> sorted = pyResp.probabilidades().stream()
                .sorted(Comparator.comparingInt(PyDiagnosticoResponse.Probabilidade::probabilidade).reversed())
                .toList();

        String primario = sorted.get(0).doenca();

        Usuario usuario = usuarioRepository.getReferenceById(usuarioId);

        AnaliseDiagnostico analise = new AnaliseDiagnostico();
        analise.setUsuario(usuario);
        analise.setImagemHash(hash);
        analise.setImagemPath(imagemPath);
        analise.setImagemFormato(formato);
        analise.setDiagnosticoPrimario(primario);
        analise.setAiModelVersion(pyResp.modelVersion());
        analise.setDuracaoMs(duracaoMs);

        sorted.forEach(p -> {
            DiagnosticoProbabilidade dp = new DiagnosticoProbabilidade();
            dp.setAnalise(analise);
            dp.setDoenca(p.doenca());
            dp.setProbabilidade(p.probabilidade());
            dp.setSeveridade(SEVERIDADE_MAP.getOrDefault(p.doenca(), "none"));
            analise.getProbabilidades().add(dp);
        });

        AnaliseDiagnostico salva = diagnosticoRepository.save(analise);

        List<DiseaseProbabilityDto> probsDto = salva.getProbabilidades().stream()
                .map(dp -> new DiseaseProbabilityDto(dp.getDoenca(), dp.getProbabilidade(), dp.getSeveridade()))
                .toList();

        DiseaseProbabilityDto primarioDto = probsDto.get(0);

        return CompletableFuture.completedFuture(
                new DiagnosticoResponse(salva.getId(), primarioDto, probsDto, salva.getCriadoEm(), duracaoMs));
    }

    public AnaliseDiagnostico buscarPorId(String id) {
        return diagnosticoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AnaliseDiagnostico", id));
    }

    private String computarHash(byte[] bytes) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        return HexFormat.of().formatHex(md.digest(bytes));
    }
}
