package com.diagnostico.raioxbackend.integration.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record PyDiagnosticoResponse(
        @JsonProperty("requestId")     String requestId,
        @JsonProperty("probabilidades") List<Probabilidade> probabilidades,
        @JsonProperty("modelVersion")  String modelVersion,
        @JsonProperty("inferenceMs")   Integer inferenceMs
) {
    public record Probabilidade(
            @JsonProperty("doenca")       String doenca,
            @JsonProperty("probabilidade") Integer probabilidade
    ) {}
}
