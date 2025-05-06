package com.team.repository;

import com.team.models.Tender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TenderRepository extends JpaRepository<Tender, Long> {
    List<Tender> findByPublishedTrueAndDeadlineAfter(LocalDateTime now);
}

