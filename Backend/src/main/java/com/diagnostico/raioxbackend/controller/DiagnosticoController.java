package com.diagnostico.raioxbackend.controller;

import com.diagnostico.raioxbackend.config.RateLimitConfig;
import com.diagnostico.raioxbackend.dto.response.DiagnosticoResponse;
import com.diagnostico.raioxbackend.exception.RateLimitException;
import com.diagnostico.raioxbackend.model.AnaliseDiagnostico;
import com.diagnostico.raioxbackend.service.DiagnosticoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/v1/analise")
@RequiredArgsConstructor
public class DiagnosticoController {

    private final DiagnosticoService diagnosticoService;
    private final RateLimitConfig rateLimitConfig;

    @PostMapping("/diagnostico")
    public ResponseEntity<DiagnosticoResponse> analisar(
            @RequestParam("imagem") MultipartFile imagem,
            Principal principal) throws Exception {

        if (!rateLimitConfig.tryConsume(principal.getName())) {
            throw new RateLimitException();
        }

        DiagnosticoResponse resultado = diagnosticoService.analisar(imagem, principal.getName())
                .get(35, TimeUnit.SECONDS);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/diagnostico/{id}")
    public ResponseEntity<AnaliseDiagnostico> buscar(@PathVariable String id) {
        return ResponseEntity.ok(diagnosticoService.buscarPorId(id));
    }
}
