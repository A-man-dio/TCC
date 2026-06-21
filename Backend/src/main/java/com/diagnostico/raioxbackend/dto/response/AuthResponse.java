package com.diagnostico.raioxbackend.dto.response;

public record AuthResponse(
        String accessToken,
        String refreshToken,
        long   expiresIn,
        UsuarioInfo usuario
) {
    public record UsuarioInfo(String id, String nome, String email, String role) {}
}
