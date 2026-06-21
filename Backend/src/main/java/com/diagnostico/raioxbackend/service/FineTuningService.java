package com.diagnostico.raioxbackend.service;

import com.diagnostico.raioxbackend.dal.AnalyseDal;
import com.diagnostico.raioxbackend.model.Feedback;
import com.diagnostico.raioxbackend.model.FineTuningRun;
import com.diagnostico.raioxbackend.repository.FeedbackRepository;
import com.diagnostico.raioxbackend.repository.FineTuningRunRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FineTuningService {

    private final AnalyseDal analyseDal;
    private final FineTuningRunRepository fineTuningRunRepository;
    private final FeedbackRepository feedbackRepository;
    private final FineTuningAsyncRunner asyncRunner;

    @Value("${storage.feedback.fine-tune-threshold:1000}")
    private int threshold;

    @Value("${storage.feedback.root:./feedback-data}")
    private String feedbackRoot;

    @Transactional
    public void verificarETrigger(Feedback.TipoFeedback tipo) {
        long total = analyseDal.countUnusedFeedbacks(tipo);
        if (total >= threshold) {
            FineTuningRun run = new FineTuningRun();
            run.setTipo(tipo.name());
            run.setStatus(FineTuningRun.Status.PENDENTE);
            run.setImagensUsadas((int) total);
            FineTuningRun runSalvo = fineTuningRunRepository.save(run);

            feedbackRepository.marcarTodosComoUsados(tipo);

            String datasetPath = feedbackRoot + "/" + tipo.name().toLowerCase() + "/";
            asyncRunner.executar(runSalvo.getId(), tipo.name(), total, datasetPath);
        }
    }
}
