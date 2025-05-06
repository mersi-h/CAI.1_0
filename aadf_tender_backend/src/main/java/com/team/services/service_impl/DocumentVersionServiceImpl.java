package com.team.services.service_impl;

import com.team.models.DocumentVersion;
import com.team.models.Offer;
import com.team.models.Tender;
import com.team.repository.DocumentVersionRepository;
import com.team.services.AuditLogService;
import com.team.services.DocumentVersionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DocumentVersionServiceImpl implements DocumentVersionService {
    private final DocumentVersionRepository repo;
    private final AuditLogService audit;

    public DocumentVersionServiceImpl(DocumentVersionRepository repo,
                                      AuditLogService audit) {
        this.repo = repo;
        this.audit = audit;
    }

    @Override
    public DocumentVersion upload(DocumentVersion dv) {
        int nextVersion = 1;
        if (dv.getTender() != null) {
            nextVersion = repo.findAllByTender_Id(dv.getTender().getId()).size() + 1;
        } else if (dv.getOffer() != null) {
            nextVersion = repo.findAllByOffer_Id(dv.getOffer().getId()).size() + 1;
        }
        dv.setVersion(nextVersion);
        dv.setUploadedAt(LocalDateTime.now());
        DocumentVersion saved = repo.save(dv);
        audit.recordData(LoggedUser.getUsername(), "DOCUMENT_UPLOADED", "DocumentVersion " + saved.getId() + " version " + nextVersion);
        return saved;
    }

    public Optional<DocumentVersion> findById(Long id) {
        return repo.findById(id);
    }

    public List<DocumentVersion> findByTender(Tender tender) {
        return repo.findAllByTender_Id(tender.getId());
    }

    public List<DocumentVersion> findByOffer(Offer offer) {
        return repo.findAllByOffer_Id(offer.getId());
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
        audit.recordData(LoggedUser.getUsername(), "DELETE_DOCUMENT", "DocumentVersion deleted: " + id);
    }
}
