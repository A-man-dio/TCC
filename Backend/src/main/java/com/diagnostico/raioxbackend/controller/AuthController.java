package com.diagnostico.raioxbackend.controller;

import com.diagnostico.raioxbackend.dto.request.LoginRequest;
import com.diagnostico.raioxbackend.dto.request.RegistoRequest;
import com.diagnostico.raioxbackend.dto.response.AuthResponse;
import com.diagnostico.raioxbackend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
/*http://localhost:8080

Os endpoints são todos prefixados com /api/v1

POST http://localhost:8080/api/v1/auth/login
POST http://localhost:8080/api/v1/analise/triagem
POST http://localhost:8080/api/v1/analise/diagnostico*/
    private final AuthService authService;

    @PostMapping("/registar")
    public ResponseEntity<AuthResponse> registar(@Valid @RequestBody RegistoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registar(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestParam String refreshToken) {
        return ResponseEntity.ok(authService.refresh(refreshToken));
    }
}
