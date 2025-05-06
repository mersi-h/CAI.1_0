package com.team.services;

import com.team.models.Tender;

import java.util.List;
import java.util.Optional;

public interface TenderService {
    Tender create(Tender tender);

    Optional<Tender> findById(Long id);

    List<Tender> findActive();

    Tender publish(Long id);

    Tender update(Tender tender);

    void delete(Long id);
}
