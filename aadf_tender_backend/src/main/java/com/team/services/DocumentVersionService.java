package com.team.services;

import com.team.models.DocumentVersion;
import com.team.models.Offer;
import com.team.models.Tender;

import java.util.List;
import java.util.Optional;

public interface DocumentVersionService {
    DocumentVersion upload(DocumentVersion dv);

    Optional<DocumentVersion> findById(Long id);

    List<DocumentVersion> findByTender(Tender tender);

    List<DocumentVersion> findByOffer(Offer offer);

    void delete(Long id);
}
