package com.diagnostico.raioxbackend.integration.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PyTriagemRequest(
        @JsonProperty("imagemBase64") String imagemBase64,
        @JsonProperty("imagemHash")   String imagemHash,
        @JsonProperty("requestId")    String requestId
) {}
