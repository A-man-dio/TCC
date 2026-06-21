CREATE TABLE analises_triagem (
    id               VARCHAR(36)  NOT NULL PRIMARY KEY,
    usuario_id       VARCHAR(36)  NOT NULL,
    imagem_hash      VARCHAR(64)  NOT NULL,
    imagem_path      VARCHAR(500),
    imagem_formato   VARCHAR(10)  NOT NULL,
    status           VARCHAR(20)  NOT NULL,
    confianca        INT          NOT NULL,
    ai_model_version VARCHAR(50),
    duracao_ms       INT,
    criado_em        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_triagem_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_triagem_usuario  ON analises_triagem(usuario_id);
CREATE INDEX idx_triagem_criado   ON analises_triagem(criado_em DESC);
CREATE INDEX idx_triagem_hash     ON analises_triagem(imagem_hash);
