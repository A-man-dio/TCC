package com.diagnostico.raioxbackend.service;

import com.diagnostico.raioxbackend.integration.PythonAiClient;
import com.diagnostico.raioxbackend.integration.dto.PyFineTuneRequest;
import com.diagnostico.raioxbackend.model.FineTuningRun;
import com.diagnostico.raioxbackend.repository.FineTuningRunRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class FineTuningAsyncRunner {

    private final FineTuningRunRepository fineTuningRunRepository;
    private final PythonAiClient pythonAiClient;

    @Async("aiExecutor")
    public void executar(Long runId, String tipo, long totalImagens, String datasetPath) {
        FineTuningRun run = fineTuningRunRepository.findById(runId).orElseThrow();
        try {
            run.setStatus(FineTuningRun.Status.EM_EXECUCAO);
            fineTuningRunRepository.save(run);

            pythonAiClient.dispararFineTuning(
                    new PyFineTuneRequest(tipo, runId, datasetPath, totalImagens));

            run.setStatus(FineTuningRun.Status.CONCLUIDO);
            run.setConcluidoEm(LocalDateTime.now());
            fineTuningRunRepository.save(run);

            log.info("Fine-tuning {} iniciado — run #{}, {} imagens", tipo, runId, totalImagens);
        } catch (Exception e) {
            run.setStatus(FineTuningRun.Status.ERRO);
            run.setMensagemErro(e.getMessage());
            run.setConcluidoEm(LocalDateTime.now());
            fineTuningRunRepository.save(run);
            log.error("Erro no fine-tuning run #{}: {}", runId, e.getMessage());
        }
    }
}
