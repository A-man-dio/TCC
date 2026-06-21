package com.diagnostico.raioxbackend.repository;

import com.diagnostico.raioxbackend.model.AnaliseTriagem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TriagemRepository extends JpaRepository<AnaliseTriagem, String> {
    Page<AnaliseTriagem> findByUsuarioIdOrderByCriadoEmDesc(String usuarioId, Pageable pageable);
    List<AnaliseTriagem> findByUsuarioIdOrderByCriadoEmDesc(String usuarioId);
}
