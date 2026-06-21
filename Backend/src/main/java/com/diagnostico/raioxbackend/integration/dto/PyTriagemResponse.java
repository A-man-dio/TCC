package com.diagnostico.raioxbackend.integration.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PyTriagemResponse(
        @JsonProperty("requestId")     String requestId,
        @JsonProperty("status")        String status,
        @JsonProperty("confianca")     Integer confianca,
        @JsonProperty("modelVersion")  String modelVersion,
        @JsonProperty("inferenceMs")   Integer inferenceMs
) {}
