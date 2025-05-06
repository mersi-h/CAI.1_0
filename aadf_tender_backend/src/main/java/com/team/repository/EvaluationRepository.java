package com.team.repository;

import com.team.models.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findAllByOffer_Id(Long idOffer);
    List<Evaluation> findAllByEvaluator_Id(Long idEvaluator);
}
