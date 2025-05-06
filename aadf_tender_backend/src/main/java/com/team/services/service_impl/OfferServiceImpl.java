package com.team.services.service_impl;

import com.team.models.Notification;
import com.team.models.Offer;
import com.team.models.Tender;
import com.team.models.User;
import com.team.models.dtos.AiExtractResult;
import com.team.repository.OfferRepository;
import com.team.services.AiService;
import com.team.services.AuditLogService;
import com.team.services.NotificationService;
import com.team.services.OfferService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OfferServiceImpl implements OfferService {
    private final OfferRepository repo;
    private final AuditLogService audit;
    private final AiService ai;
    private final NotificationService notification;

    public OfferServiceImpl(OfferRepository repo,
                            AuditLogService audit,
                            AiService ai,
                            NotificationService notification) {
        this.repo = repo;
        this.audit = audit;
        this.ai = ai;
        this.notification = notification;
    }

    @Override
    public Offer submit(Offer offer) {
        offer.setSubmittedAt(LocalDateTime.now());
        offer.setVisible(false);
        Offer saved = repo.save(offer);
        // AI extraction & validation
        AiExtractResult result = ai.extractFields(offer.getDocumentUrl());
        audit.recordData(LoggedUser.getUsername(), "OFFER_SUBMITTED", "Offer " + saved.getId() + " fields: " + result.getFields());
        if (!result.getMissing().isEmpty()) {
            audit.recordData(LoggedUser.getUsername(), "OFFER_MISSING_FIELDS", String.join(",", result.getMissing()));
        }
        // Notify procurement officer
        Notification note = new Notification();
        note.setRecipient(offer.getTender().getCreatedBy());
        note.setMessage("Offer submitted for Tender " + offer.getTender().getSubject());
        note.setType("OFFER_SUBMIT");
        notification.notify(note);
        return saved;
    }


    public Optional<Offer> findById(Long id) {
        return repo.findById(id);
    }

    @Override
    public List<Offer> findByTender(Tender tender) {
        return repo.findAllByTender_Id(tender.getId()).stream()
                .peek(o -> {
                    if (LocalDateTime.now().isAfter(o.getTender().getDeadline())) {
                        o.setVisible(true);
                        repo.save(o);
                    }
                }).toList();
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
        audit.recordData(LoggedUser.getUsername(), "DELETE_OFFER", "Offer deleted: " + id);
    }

    public Offer submit(MultipartFile file, Long tenderId, User vendor) throws Exception {
        AiExtractResult res = ai.extract(file);
        if (!res.getMissing().isEmpty()) {
            throw new Exception("Missing fields: " + String.join(", ", res.getMissing()));
        }
        return null;
    }
}
