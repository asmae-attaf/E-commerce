package com.back.shopback.Service;

import com.back.shopback.Entity.Evaluation;
import com.back.shopback.Repository.EvaluationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EvaluationService {
    private final EvaluationRepository evaluationRepository;

    public EvaluationService(EvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }
    public void addEvaluation(Evaluation evaluation){
        evaluationRepository.save(evaluation);
    }
    public void updateEvaluation(Evaluation evaluation){
        evaluationRepository.save(evaluation);
    }
    public void deleteEvaluation(Integer id){
        evaluationRepository.deleteById(id);
    }
    public List<Evaluation> getAllEvaluations(){
       return evaluationRepository.findAll();
    }
    public Optional<Evaluation> getEvaluationById(Integer id){
        return evaluationRepository.findById(id);
    }
}
