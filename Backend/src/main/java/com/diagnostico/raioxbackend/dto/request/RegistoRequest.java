package com.diagnostico.raioxbackend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegistoRequest(
        @NotBlank @Email                  String email,
        @NotBlank @Size(min = 6)          String senha,
        @NotBlank                         String nome
) {}
