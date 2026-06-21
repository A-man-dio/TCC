CREATE TABLE diagnostico_probabilidades (
    id           BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    analise_id   VARCHAR(36)  NOT NULL,
    doenca       VARCHAR(50)  NOT NULL,
    probabilidade INT          NOT NULL,
    severidade   VARCHAR(20)  NOT NULL,
    CONSTRAINT fk_prob_analise FOREIGN KEY (analise_id) REFERENCES analises_diagnostico(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_prob_analise ON diagnostico_probabilidades(analise_id);
