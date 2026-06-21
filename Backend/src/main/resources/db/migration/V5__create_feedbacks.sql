CREATE TABLE feedbacks (
    id                   VARCHAR(36)  NOT NULL PRIMARY KEY,
    usuario_id           VARCHAR(36)  NOT NULL,
    tipo                 VARCHAR(20)  NOT NULL,
    analise_triagem_id   VARCHAR(36),
    analise_diag_id      VARCHAR(36),
    predicao_original    VARCHAR(255) NOT NULL,
    correcao             VARCHAR(255) NOT NULL,
    imagem_salva_path    VARCHAR(500),
    usado_em_treino      TINYINT(1)   NOT NULL DEFAULT 0,
    criado_em            DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_feedback_usuario  FOREIGN KEY (usuario_id)         REFERENCES usuarios(id),
    CONSTRAINT fk_feedback_triagem  FOREIGN KEY (analise_triagem_id) REFERENCES analises_triagem(id),
    CONSTRAINT fk_feedback_diag     FOREIGN KEY (analise_diag_id)    REFERENCES analises_diagnostico(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_feedback_tipo    ON feedbacks(tipo);
CREATE INDEX idx_feedback_treino  ON feedbacks(tipo, usado_em_treino);
CREATE INDEX idx_feedback_usuario ON feedbacks(usuario_id);
