package com.diagnostico.raioxbackend.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record DiagnosticoResponse(
        String                  id,
        DiseaseProbabilityDto   diagnosticoPrimario,
        List<DiseaseProbabilityDto> probabilidades,
        LocalDateTime           timestamp,
        Integer                 duracaoMs
) {}
