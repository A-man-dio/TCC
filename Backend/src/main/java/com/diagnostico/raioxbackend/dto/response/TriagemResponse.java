package com.diagnostico.raioxbackend.dto.response;

import java.time.LocalDateTime;

public record TriagemResponse(
        String        id,
        String        status,
        Integer       confianca,
        LocalDateTime timestamp,
        Integer       duracaoMs
) {}
