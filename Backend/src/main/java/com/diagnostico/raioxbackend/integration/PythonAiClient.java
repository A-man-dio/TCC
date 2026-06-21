package com.diagnostico.raioxbackend.integration;

import com.diagnostico.raioxbackend.exception.AiServiceException;
import com.diagnostico.raioxbackend.integration.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class PythonAiClient {

    private final RestTemplate restTemplate;

    @Value("${python-ai.base-url}")
    private String baseUrl;

    public PyTriagemResponse preverTriagem(PyTriagemRequest request) {
        try {
            return restTemplate.postForObject(
                    baseUrl + "/predict/triagem",
                    request,
                    PyTriagemResponse.class
            );
        } catch (ResourceAccessException e) {
            throw new AiServiceException("Serviço Python de triagem inacessível", e);
        }
    }

    public PyDiagnosticoResponse preverDiagnostico(PyDiagnosticoRequest request) {
        try {
            return restTemplate.postForObject(
                    baseUrl + "/predict/diagnostico",
                    request,
                    PyDiagnosticoResponse.class
            );
        } catch (ResourceAccessException e) {
            throw new AiServiceException("Serviço Python de diagnóstico inacessível", e);
        }
    }

    public void dispararFineTuning(PyFineTuneRequest request) {
        try {
            restTemplate.postForObject(
                    baseUrl + "/finetune/trigger",
                    request,
                    Void.class
            );
        } catch (ResourceAccessException e) {
            throw new AiServiceException("Serviço Python de fine-tuning inacessível", e);
        }
    }
}
