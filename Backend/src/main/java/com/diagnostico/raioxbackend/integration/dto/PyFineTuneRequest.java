package com.diagnostico.raioxbackend.integration.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PyFineTuneRequest(
        @JsonProperty("tipo")        String tipo,
        @JsonProperty("runId")       Long runId,
        @JsonProperty("datasetPath") String datasetPath,
        @JsonProperty("imageCount")  long imageCount
) {}
