package com.team.services;

import com.team.models.Criterion;

import java.util.List;
import java.util.Optional;

public interface CriterionService {
    Criterion create(Criterion criterion);

    Optional<Criterion> findById(Long id);

    List<Criterion> findAll();

    Criterion update(Criterion criterion);

    void delete(Long id);
}
