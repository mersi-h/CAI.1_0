package com.team.services.service_impl;

import com.team.models.Tender;
import com.team.models.TenderCriterion;
import com.team.repository.TenderCriterionRepository;
import com.team.services.TenderCriterionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TenderCriterionServiceImpl implements TenderCriterionService {
    private final TenderCriterionRepository repo;

    public TenderCriterionServiceImpl(TenderCriterionRepository repo) {
        this.repo = repo;
    }

    public TenderCriterion assign(TenderCriterion tc) {
        return repo.save(tc);
    }

    public List<TenderCriterion> findByTender(Tender tender) {
        return repo.findAllByTender_Id(tender.getId());
    }

    public void remove(Long id) {
        repo.deleteById(id);
    }
}
