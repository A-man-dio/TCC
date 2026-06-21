package com.diagnostico.raioxbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "fine_tuning_runs")
@Getter @Setter @NoArgsConstructor
public class FineTuningRun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String tipo;

    @Column(name = "disparado_em", updatable = false)
    private LocalDateTime disparadoEm = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status = Status.PENDENTE;

    @Column(name = "imagens_usadas")
    private Integer imagensUsadas;

    @Column(name = "versao_modelo", length = 50)
    private String versaoModelo;

    @Column(name = "mensagem_erro", columnDefinition = "TEXT")
    private String mensagemErro;

    @Column(name = "concluido_em")
    private LocalDateTime concluidoEm;

    public enum Status {
        PENDENTE, EM_EXECUCAO, CONCLUIDO, ERRO
    }
}
