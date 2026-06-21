CREATE TABLE fine_tuning_runs (
    id              BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo            VARCHAR(20)  NOT NULL,
    disparado_em    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status          VARCHAR(20)  NOT NULL DEFAULT 'PENDENTE',
    imagens_usadas  INT,
    versao_modelo   VARCHAR(50),
    mensagem_erro   TEXT,
    concluido_em    DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_finetuning_tipo   ON fine_tuning_runs(tipo);
CREATE INDEX idx_finetuning_status ON fine_tuning_runs(status);
