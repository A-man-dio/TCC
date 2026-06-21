package com.diagnostico.raioxbackend.service;

import com.diagnostico.raioxbackend.dto.request.LoginRequest;
import com.diagnostico.raioxbackend.dto.request.RegistoRequest;
import com.diagnostico.raioxbackend.dto.response.AuthResponse;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.diagnostico.raioxbackend.exception.ResourceNotFoundException;
import com.diagnostico.raioxbackend.model.RefreshToken;
import com.diagnostico.raioxbackend.model.Usuario;
import com.diagnostico.raioxbackend.repository.RefreshTokenRepository;
import com.diagnostico.raioxbackend.repository.UsuarioRepository;
import com.diagnostico.raioxbackend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    @Value("${jwt.refresh-expiration-ms}")
    private long refreshExpirationMs;

    @Transactional
    public AuthResponse registar(RegistoRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já registado.");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(request.email());
        usuario.setNome(request.nome());
        usuario.setSenhaHash(passwordEncoder.encode(request.senha()));
        usuario.setRole(Usuario.Role.MEDICO);
        usuarioRepository.save(usuario);

        return gerarAuthResponse(usuario);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadCredentialsException("Credenciais inválidas"));

        if (!usuario.isAtivo()) {
            throw new BadCredentialsException("Conta desativada");
        }

        if (!passwordEncoder.matches(request.senha(), usuario.getSenhaHash())) {
            throw new BadCredentialsException("Credenciais inválidas");
        }

        return gerarAuthResponse(usuario);
    }

    private AuthResponse gerarAuthResponse(Usuario usuario) {
        String accessToken = tokenProvider.gerarToken(
                usuario.getId(), usuario.getEmail(), usuario.getRole().name());

        String rawRefresh = UUID.randomUUID().toString();
        RefreshToken refresh = new RefreshToken();
        refresh.setUsuario(usuario);
        refresh.setToken(rawRefresh);
        refresh.setExpiraEm(LocalDateTime.now().plusSeconds(refreshExpirationMs / 1000));
        refreshTokenRepository.save(refresh);

        return new AuthResponse(
                accessToken,
                rawRefresh,
                expirationMs / 1000,
                new AuthResponse.UsuarioInfo(
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getEmail(),
                        usuario.getRole().name()
                )
        );
    }

    @Transactional
    public AuthResponse refresh(String refreshToken) {
        RefreshToken token = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new ResourceNotFoundException("RefreshToken", refreshToken));

        if (token.isExpirado()) {
            refreshTokenRepository.delete(token);
            throw new BadCredentialsException("Refresh token expirado. Faça login novamente.");
        }

        Usuario usuario = token.getUsuario();
        String newAccess = tokenProvider.gerarToken(
                usuario.getId(), usuario.getEmail(), usuario.getRole().name());

        return new AuthResponse(
                newAccess,
                refreshToken,
                expirationMs / 1000,
                new AuthResponse.UsuarioInfo(
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getEmail(),
                        usuario.getRole().name()
                )
        );
    }
}
