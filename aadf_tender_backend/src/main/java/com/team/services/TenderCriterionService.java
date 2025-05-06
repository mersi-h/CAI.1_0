package com.team.services;

import com.team.models.Tender;
import com.team.models.TenderCriterion;

import java.util.List;

public interface TenderCriterionService {
    TenderCriterion assign(TenderCriterion tc);

    List<TenderCriterion> findByTender(Tender tender);

    void remove(Long id);
}
