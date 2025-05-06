package com.team.services;

import com.team.models.Decision;
import com.team.models.Tender;

import java.util.Optional;

public interface DecisionService {
    Decision decide(Decision decision);

    Optional<Decision> findByTender(Tender tender);

    void delete(Long id);
}
