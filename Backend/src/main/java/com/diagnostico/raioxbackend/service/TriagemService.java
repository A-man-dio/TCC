package com.diagnostico.raioxbackend.service;

import com.diagnostico.raioxbackend.dto.response.TriagemResponse;
import com.diagnostico.raioxbackend.exception.ResourceNotFoundException;
import com.diagnostico.raioxbackend.integration.PythonAiClient;
import com.diagnostico.raioxbackend.integration.dto.PyTriagemRequest;
import com.diagnostico.raioxbackend.integration.dto.PyTriagemResponse;
import com.diagnostico.raioxbackend.model.AnaliseTriagem;
import com.diagnostico.raioxbackend.model.ImagemFormato;
import com.diagnostico.raioxbackend.model.Usuario;
import com.diagnostico.raioxbackend.repository.TriagemRepository;
import com.diagnostico.raioxbackend.repository.UsuarioRepository;
import com.diagnostico.raioxbackend.validation.ImageValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.security.MessageDigest;
import java.util.Base64;
import java.util.HexFormat;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class TriagemService {

    private final TriagemRepository triagemRepository;
    private final UsuarioRepository usuarioRepository;
    private final StorageService storageService;
    private final PythonAiClient pythonAiClient;
    private final ImageValidator imageValidator;

    @Async("aiExecutor")
    @Transactional
    public CompletableFuture<TriagemResponse> analisar(MultipartFile imagem, String usuarioId) throws Exception {
        ImagemFormato formato = imageValidator.validarEDetectarFormato(imagem);

        byte[] bytes = imagem.getBytes();
        String hash = computarHash(bytes);

        String imagemPath = storageService.armazenarTemp(imagem, hash, formato);
        String base64 = Base64.getEncoder().encodeToString(bytes);
        String requestId = UUID.randomUUID().toString();

        long inicio = System.currentTimeMillis();
        PyTriagemResponse pyResp = pythonAiClient.preverTriagem(
                new PyTriagemRequest(base64, hash, requestId));
        int duracaoMs = (int) (System.currentTimeMillis() - inicio);

        Usuario usuario = usuarioRepository.getReferenceById(usuarioId);

        AnaliseTriagem analise = new AnaliseTriagem();
        analise.setUsuario(usuario);
        analise.setImagemHash(hash);
        analise.setImagemPath(imagemPath);
        analise.setImagemFormato(formato);
        analise.setStatus(AnaliseTriagem.TriagemStatus.valueOf(
                "Anômalo".equals(pyResp.status()) ? "Anomalo" : pyResp.status()));
        analise.setConfianca(pyResp.confianca());
        analise.setAiModelVersion(pyResp.modelVersion());
        analise.setDuracaoMs(duracaoMs);

        AnaliseTriagem salva = triagemRepository.save(analise);

        return CompletableFuture.completedFuture(
                new TriagemResponse(salva.getId(), pyResp.status(), salva.getConfianca(),
                        salva.getCriadoEm(), duracaoMs));
    }

    public AnaliseTriagem buscarPorId(String id) {
        return triagemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AnaliseTriagem", id));
    }

    private String computarHash(byte[] bytes) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        return HexFormat.of().formatHex(md.digest(bytes));
    }
}
