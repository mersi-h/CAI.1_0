package com.team.services;

import com.team.models.Evaluation;
import com.team.models.Offer;
import com.team.models.User;

import java.util.List;
import java.util.Optional;

public interface EvaluationService {
    Evaluation score(Evaluation eval);

    Optional<Evaluation> findById(Long id);

    List<Evaluation> findByOffer(Offer offer);

    void delete(Long id);

    List<Evaluation> findByEvaluator(Long idEvaluator);
}
