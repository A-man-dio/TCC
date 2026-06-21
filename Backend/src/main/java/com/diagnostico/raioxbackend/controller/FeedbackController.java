package com.diagnostico.raioxbackend.controller;

import com.diagnostico.raioxbackend.dal.AnalyseDal;
import com.diagnostico.raioxbackend.dto.request.DiagnosticoFeedbackRequest;
import com.diagnostico.raioxbackend.dto.request.TriagemFeedbackRequest;
import com.diagnostico.raioxbackend.dto.response.FeedbackResponse;
import com.diagnostico.raioxbackend.model.Feedback;
import com.diagnostico.raioxbackend.service.FeedbackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final AnalyseDal analyseDal;

    @PostMapping("/triagem")
    public ResponseEntity<FeedbackResponse> feedbackTriagem(
            @Valid @RequestBody TriagemFeedbackRequest request,
            Principal principal) {
        FeedbackResponse resp = feedbackService.processarFeedbackTriagem(request, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @PostMapping("/diagnostico")
    public ResponseEntity<FeedbackResponse> feedbackDiagnostico(
            @Valid @RequestBody DiagnosticoFeedbackRequest request,
            Principal principal) {
        FeedbackResponse resp = feedbackService.processarFeedbackDiagnostico(request, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> stats() {
        long triagem = analyseDal.countUnusedFeedbacks(Feedback.TipoFeedback.TRIAGEM);
        long diagnostico = analyseDal.countUnusedFeedbacks(Feedback.TipoFeedback.DIAGNOSTICO);
        Map<String, Long> distribuicao = analyseDal.getDiseaseDistribution();
        return ResponseEntity.ok(Map.of(
                "feedbacksTriagemPendentes", triagem,
                "feedbacksDiagnosticoPendentes", diagnostico,
                "distribuicaoDoencas", distribuicao
        ));
    }
}
