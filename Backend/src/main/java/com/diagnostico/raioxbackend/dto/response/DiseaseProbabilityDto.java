package com.diagnostico.raioxbackend.dto.response;

public record DiseaseProbabilityDto(
        String nome,
        Integer probabilidade,
        String severidade
) {}
