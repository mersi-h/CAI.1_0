package com.team.repository;

import com.team.models.Decision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DecisionRepository extends JpaRepository<Decision, Long> {
    Optional<Decision> findByTender_Id(Long idTender);
}
