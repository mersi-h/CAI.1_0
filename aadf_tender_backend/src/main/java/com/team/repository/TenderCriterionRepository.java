package com.team.repository;

import com.team.models.TenderCriterion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TenderCriterionRepository extends JpaRepository<TenderCriterion, Long> {
    List<TenderCriterion> findAllByTender_Id(Long idTender);
}
