package com.team.repository;

import com.team.models.DocumentVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentVersionRepository extends JpaRepository<DocumentVersion, Long> {
    List<DocumentVersion> findAllByTender_Id(Long idTender);

    List<DocumentVersion> findAllByOffer_Id(Long idOffer);
}
