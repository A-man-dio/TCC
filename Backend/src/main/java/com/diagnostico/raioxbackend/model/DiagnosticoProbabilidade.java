package com.diagnostico.raioxbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "diagnostico_probabilidades")
@Getter @Setter @NoArgsConstructor
public class DiagnosticoProbabilidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analise_id", nullable = false)
    private AnaliseDiagnostico analise;

    @Column(nullable = false, length = 50)
    private String doenca;

    @Column(nullable = false)
    private Integer probabilidade;

    @Column(nullable = false, length = 20)
    private String severidade;
}
