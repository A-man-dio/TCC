package com.diagnostico.raioxbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "analises_diagnostico")
@Getter @Setter @NoArgsConstructor
public class AnaliseDiagnostico {

    @Id
    @UuidGenerator
    @Column(length = 36, updatable = false, nullable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "imagem_hash", nullable = false, length = 64)
    private String imagemHash;

    @Column(name = "imagem_path", length = 500)
    private String imagemPath;

    @Enumerated(EnumType.STRING)
    @Column(name = "imagem_formato", nullable = false, length = 10)
    private ImagemFormato imagemFormato;

    @Column(name = "diagnostico_primario", nullable = false, length = 50)
    private String diagnosticoPrimario;

    @Column(name = "ai_model_version", length = 50)
    private String aiModelVersion;

    @Column(name = "duracao_ms")
    private Integer duracaoMs;

    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm = LocalDateTime.now();

    @OneToMany(mappedBy = "analise", cascade = CascadeType.ALL,
               orphanRemoval = true, fetch = FetchType.EAGER)
    private List<DiagnosticoProbabilidade> probabilidades = new ArrayList<>();
}
