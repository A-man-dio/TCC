package com.diagnostico.raioxbackend.dal.impl;

import com.diagnostico.raioxbackend.dal.AnalyseDal;
import com.diagnostico.raioxbackend.dto.response.HistoricoItemDto;
import com.diagnostico.raioxbackend.model.Feedback;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Repository
public class AnalyseDalImpl implements AnalyseDal {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<HistoricoItemDto> findHistoricoByUsuario(String usuarioId, Pageable pageable) {
        String sql = """
                SELECT id, 'TRIAGEM' AS tipo, status AS resultado, confianca, criado_em
                FROM analises_triagem
                WHERE usuario_id = :uid
                UNION ALL
                SELECT id, 'DIAGNOSTICO' AS tipo, diagnostico_primario AS resultado, NULL AS confianca, criado_em
                FROM analises_diagnostico
                WHERE usuario_id = :uid
                ORDER BY criado_em DESC
                LIMIT :lim OFFSET :off
                """;

        String countSql = """
                SELECT COUNT(*) FROM (
                    SELECT id FROM analises_triagem WHERE usuario_id = :uid
                    UNION ALL
                    SELECT id FROM analises_diagnostico WHERE usuario_id = :uid
                ) t
                """;

        @SuppressWarnings("unchecked")
        List<Object[]> rows = em.createNativeQuery(sql)
                .setParameter("uid", usuarioId)
                .setParameter("lim", pageable.getPageSize())
                .setParameter("off", pageable.getOffset())
                .getResultList();

        Long total = ((Number) em.createNativeQuery(countSql)
                .setParameter("uid", usuarioId)
                .getSingleResult()).longValue();

        List<HistoricoItemDto> items = rows.stream().map(r -> new HistoricoItemDto(
                (String) r[0],
                (String) r[1],
                (String) r[2],
                r[3] != null ? ((Number) r[3]).intValue() : null,
                ((java.sql.Timestamp) r[4]).toLocalDateTime()
        )).toList();

        return new PageImpl<>(items, pageable, total);
    }

    @Override
    public long countUnusedFeedbacks(Feedback.TipoFeedback tipo) {
        Query q = em.createQuery(
                "SELECT COUNT(f) FROM Feedback f WHERE f.tipo = :tipo AND f.usadoEmTreino = false");
        q.setParameter("tipo", tipo);
        return ((Number) q.getSingleResult()).longValue();
    }

    @Override
    public Map<String, Long> getDiseaseDistribution() {
        @SuppressWarnings("unchecked")
        List<Object[]> rows = em.createNativeQuery(
                "SELECT diagnostico_primario, COUNT(*) FROM analises_diagnostico GROUP BY diagnostico_primario ORDER BY COUNT(*) DESC"
        ).getResultList();

        Map<String, Long> result = new LinkedHashMap<>();
        for (Object[] r : rows) {
            result.put((String) r[0], ((Number) r[1]).longValue());
        }
        return result;
    }
}
