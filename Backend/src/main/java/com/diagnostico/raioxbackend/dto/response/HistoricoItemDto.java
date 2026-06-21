package com.diagnostico.raioxbackend.dto.response;

import java.time.LocalDateTime;

public record HistoricoItemDto(
        String id,
        String tipo,
        String resultado,
        Integer confianca,
        LocalDateTime criadoEm
) {}
