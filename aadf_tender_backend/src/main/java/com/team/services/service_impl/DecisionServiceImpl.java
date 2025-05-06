package com.team.services.service_impl;

import com.team.models.Decision;
import com.team.models.Notification;
import com.team.models.Tender;
import com.team.repository.DecisionRepository;
import com.team.services.AuditLogService;
import com.team.services.DecisionService;
import com.team.services.NotificationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class DecisionServiceImpl implements DecisionService {
    private final DecisionRepository repo;
    private final AuditLogService audit;
    private final NotificationService notification;


    public DecisionServiceImpl(DecisionRepository repo,
                               AuditLogService audit,
                               NotificationService notification) {
        this.repo = repo;
        this.audit = audit;
        this.notification = notification;
    }

    @Override
    public Decision decide(Decision decision) {
        decision.setDecidedAt(LocalDateTime.now());
        Decision saved = repo.save(decision);
        audit.recordData(LoggedUser.getUsername(), "DECISION_MADE", "Decision " + saved.getId() + " on Tender " + decision.getTender().getId());
        // Notify winning vendor
        Notification note = new Notification();
        note.setRecipient(decision.getWinningOffer().getVendor());
        note.setMessage("Congratulations! Your offer won Tender " + decision.getTender().getSubject());
        note.setType("AWARD");
        notification.notify(note);
        return saved;
    }

    public Optional<Decision> findByTender(Tender tender) {
        return repo.findByTender_Id(tender.getId());
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
        audit.recordData(LoggedUser.getUsername(), "DELETE_DECISION", "Decision deleted: " + id);
    }
}
