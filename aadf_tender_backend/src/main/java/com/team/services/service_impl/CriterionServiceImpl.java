package com.team.services.service_impl;

import com.team.models.Criterion;
import com.team.repository.CriterionRepository;
import com.team.services.CriterionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CriterionServiceImpl implements CriterionService {
    private final CriterionRepository repo;

    public CriterionServiceImpl(CriterionRepository repo) {
        this.repo = repo;
    }

    public Criterion create(Criterion c) {
        return repo.save(c);
    }

    public Optional<Criterion> findById(Long id) {
        return repo.findById(id);
    }

    public List<Criterion> findAll() {
        return repo.findAll();
    }

    public Criterion update(Criterion c) {
        return repo.save(c);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
