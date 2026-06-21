package com.diagnostico.raioxbackend.repository;

import com.diagnostico.raioxbackend.model.FineTuningRun;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FineTuningRunRepository extends JpaRepository<FineTuningRun, Long> {
    List<FineTuningRun> findByTipoOrderByDisparadoEmDesc(String tipo);
}
