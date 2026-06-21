package com.diagnostico.raioxbackend.dto.response;

public record FeedbackResponse(
        String id,
        String mensagem,
        String imagemSalvaPath,
        long   totalFeedbacks
) {}
