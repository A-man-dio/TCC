package com.diagnostico.raioxbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
@Getter @Setter @NoArgsConstructor
public class Feedback {

    @Id
    @UuidGenerator
    @Column(length = 36, updatable = false, nullable = false)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoFeedback tipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analise_triagem_id")
    private AnaliseTriagem analiseTriagem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analise_diag_id")
    private AnaliseDiagnostico analiseDiagnostico;

    @Column(name = "predicao_original", nullable = false)
    private String predicaoOriginal;

    @Column(nullable = false)
    private String correcao;

    @Column(name = "imagem_salva_path", length = 500)
    private String imagemSalvaPath;

    @Column(name = "usado_em_treino", nullable = false)
    private boolean usadoEmTreino = false;

    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm = LocalDateTime.now();

    public enum TipoFeedback {
        TRIAGEM, DIAGNOSTICO
    }
}
