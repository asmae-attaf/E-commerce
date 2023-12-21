package com.back.shopback.Controlleur;

import com.back.shopback.Entity.Evaluation;
import com.back.shopback.Service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class EvaluationControlleur {
    @Autowired
    EvaluationService evaluationService;

    @PostMapping("/api/Evaluation/add")

    public void addEvaluation(@RequestBody Evaluation evaluation) {
        evaluationService.addEvaluation(evaluation);
    }

    @PutMapping("/api/Evaluation/update/{id}")

    public void updateEvaluation(@RequestBody Evaluation evaluation) {
        evaluationService.updateEvaluation(evaluation);
    }

    @DeleteMapping("/api/Evaluation/delete/{id}")

    public void deleteEvaluation(@PathVariable Integer id) {
        evaluationService.deleteEvaluation(id);
    }

    @GetMapping("/api/Evaluation/AllEvaluations")

    public List<Evaluation> getAllEvaluation() {
        return evaluationService.getAllEvaluations();
    }

    @GetMapping("/api/Evaluation/{id}")

    public Optional<Evaluation> getEvaluationById(@PathVariable Integer id) {
        return evaluationService.getEvaluationById(id);
    }
}