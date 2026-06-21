package com.diagnostico.raioxbackend.dto.request;

import jakarta.validation.constraints.NotBlank;

public record TriagemFeedbackRequest(
        @NotBlank String analiseId,
        @NotBlank String predicao,
        @NotBlank String correcao
) {}
