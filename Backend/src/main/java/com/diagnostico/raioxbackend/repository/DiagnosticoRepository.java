package com.diagnostico.raioxbackend.repository;

import com.diagnostico.raioxbackend.model.AnaliseDiagnostico;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiagnosticoRepository extends JpaRepository<AnaliseDiagnostico, String> {
    Page<AnaliseDiagnostico> findByUsuarioIdOrderByCriadoEmDesc(String usuarioId, Pageable pageable);
}
