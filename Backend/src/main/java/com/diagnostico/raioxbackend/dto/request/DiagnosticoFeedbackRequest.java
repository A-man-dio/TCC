package com.diagnostico.raioxbackend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record DiagnosticoFeedbackRequest(
        @NotBlank  String       analiseId,
        @NotBlank  String       predicaoPrimaria,
        @NotEmpty  List<String> correcao
) {}
