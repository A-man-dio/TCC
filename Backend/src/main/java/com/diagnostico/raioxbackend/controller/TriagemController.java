package com.diagnostico.raioxbackend.controller;

import com.diagnostico.raioxbackend.config.RateLimitConfig;
import com.diagnostico.raioxbackend.dal.AnalyseDal;
import com.diagnostico.raioxbackend.dto.response.HistoricoItemDto;
import com.diagnostico.raioxbackend.dto.response.TriagemResponse;
import com.diagnostico.raioxbackend.exception.RateLimitException;
import com.diagnostico.raioxbackend.model.AnaliseTriagem;
import com.diagnostico.raioxbackend.service.TriagemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/v1/analise")
@RequiredArgsConstructor
public class TriagemController {

    private final TriagemService triagemService;
    private final AnalyseDal analyseDal;
    private final RateLimitConfig rateLimitConfig;

    @PostMapping("/triagem")
    public ResponseEntity<TriagemResponse> analisar(
            @RequestParam("imagem") MultipartFile imagem,
            Principal principal) throws Exception {

        if (!rateLimitConfig.tryConsume(principal.getName())) {
            throw new RateLimitException();
        }

        TriagemResponse resultado = triagemService.analisar(imagem, principal.getName())
                .get(35, TimeUnit.SECONDS);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/triagem/{id}")
    public ResponseEntity<AnaliseTriagem> buscar(@PathVariable String id) {
        return ResponseEntity.ok(triagemService.buscarPorId(id));
    }

    @GetMapping("/historico")
    public ResponseEntity<Page<HistoricoItemDto>> historico(
            Principal principal,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(analyseDal.findHistoricoByUsuario(principal.getName(), pageable));
    }
}
