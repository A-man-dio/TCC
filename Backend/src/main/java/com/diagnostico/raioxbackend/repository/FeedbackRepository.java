package com.diagnostico.raioxbackend.repository;

import com.diagnostico.raioxbackend.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, String> {

    long countByTipoAndUsadoEmTreino(Feedback.TipoFeedback tipo, boolean usadoEmTreino);

    @Modifying
    @Query("UPDATE Feedback f SET f.usadoEmTreino = true WHERE f.tipo = :tipo AND f.usadoEmTreino = false")
    int marcarTodosComoUsados(@Param("tipo") Feedback.TipoFeedback tipo);
}
