package com.diagnostico.raioxbackend.dal;

import com.diagnostico.raioxbackend.dto.response.HistoricoItemDto;
import com.diagnostico.raioxbackend.model.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface AnalyseDal {
    Page<HistoricoItemDto> findHistoricoByUsuario(String usuarioId, Pageable pageable);
    long countUnusedFeedbacks(Feedback.TipoFeedback tipo);
    Map<String, Long> getDiseaseDistribution();
}
