package com.diagnostico.raioxbackend.service;

import com.diagnostico.raioxbackend.dto.request.DiagnosticoFeedbackRequest;
import com.diagnostico.raioxbackend.dto.request.TriagemFeedbackRequest;
import com.diagnostico.raioxbackend.dto.response.FeedbackResponse;
import com.diagnostico.raioxbackend.exception.ResourceNotFoundException;
import com.diagnostico.raioxbackend.model.*;
import com.diagnostico.raioxbackend.repository.DiagnosticoRepository;
import com.diagnostico.raioxbackend.repository.FeedbackRepository;
import com.diagnostico.raioxbackend.repository.TriagemRepository;
import com.diagnostico.raioxbackend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss");

    private final FeedbackRepository feedbackRepository;
    private final TriagemRepository triagemRepository;
    private final DiagnosticoRepository diagnosticoRepository;
    private final UsuarioRepository usuarioRepository;
    private final StorageService storageService;
    private final FineTuningService fineTuningService;

    @Transactional
    public FeedbackResponse processarFeedbackTriagem(TriagemFeedbackRequest req, String usuarioId) {
        AnaliseTriagem analise = triagemRepository.findById(req.analiseId())
                .orElseThrow(() -> new ResourceNotFoundException("AnaliseTriagem", req.analiseId()));

        byte[] imagemBytes = storageService.carregar(analise.getImagemPath());

        String ext = analise.getImagemFormato().extensao();
        String nomeArquivo = sanitizar(req.correcao()) + "-" + LocalDateTime.now().format(FMT) + ext;
        String caminhoRelativo = "triagem/" + nomeArquivo;
        String caminhoSalvo = storageService.salvarImagemFeedback(imagemBytes, caminhoRelativo);
        storageService.eliminarTemp(analise.getImagemPath());

        Feedback feedback = new Feedback();
        feedback.setUsuario(usuarioRepository.getReferenceById(usuarioId));
        feedback.setTipo(Feedback.TipoFeedback.TRIAGEM);
        feedback.setAnaliseTriagem(analise);
        feedback.setPredicaoOriginal(req.predicao());
        feedback.setCorrecao(req.correcao());
        feedback.setImagemSalvaPath(caminhoSalvo);
        feedbackRepository.save(feedback);

        fineTuningService.verificarETrigger(Feedback.TipoFeedback.TRIAGEM);

        long total = feedbackRepository.countByTipoAndUsadoEmTreino(Feedback.TipoFeedback.TRIAGEM, false);
        return new FeedbackResponse(feedback.getId(), "Feedback registado com sucesso.", caminhoSalvo, total);
    }

    @Transactional
    public FeedbackResponse processarFeedbackDiagnostico(DiagnosticoFeedbackRequest req, String usuarioId) {
        AnaliseDiagnostico analise = diagnosticoRepository.findById(req.analiseId())
                .orElseThrow(() -> new ResourceNotFoundException("AnaliseDiagnostico", req.analiseId()));

        byte[] imagemBytes = storageService.carregar(analise.getImagemPath());

        String ext = analise.getImagemFormato().extensao();
        String rotulo = req.correcao().stream()
                .map(this::sanitizar)
                .collect(Collectors.joining("_"));
        String nomeArquivo = rotulo + "-" + LocalDateTime.now().format(FMT) + ext;
        String caminhoRelativo = "diagnostico/" + nomeArquivo;
        String caminhoSalvo = storageService.salvarImagemFeedback(imagemBytes, caminhoRelativo);
        storageService.eliminarTemp(analise.getImagemPath());

        Feedback feedback = new Feedback();
        feedback.setUsuario(usuarioRepository.getReferenceById(usuarioId));
        feedback.setTipo(Feedback.TipoFeedback.DIAGNOSTICO);
        feedback.setAnaliseDiagnostico(analise);
        feedback.setPredicaoOriginal(req.predicaoPrimaria());
        feedback.setCorrecao(String.join(",", req.correcao()));
        feedback.setImagemSalvaPath(caminhoSalvo);
        feedbackRepository.save(feedback);

        fineTuningService.verificarETrigger(Feedback.TipoFeedback.DIAGNOSTICO);

        long total = feedbackRepository.countByTipoAndUsadoEmTreino(Feedback.TipoFeedback.DIAGNOSTICO, false);
        return new FeedbackResponse(feedback.getId(), "Feedback registado com sucesso.", caminhoSalvo, total);
    }

    private String sanitizar(String s) {
        return s.replaceAll("[^a-zA-ZÀ-ÿ0-9]", "");
    }
}
