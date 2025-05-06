package com.team.services.service_impl;

import com.team.models.Notification;
import com.team.models.Role;
import com.team.models.Tender;
import com.team.models.User;
import com.team.repository.TenderRepository;
import com.team.repository.UserRepository;
import com.team.services.AuditLogService;
import com.team.services.NotificationService;
import com.team.services.TenderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TenderServiceImpl implements TenderService {
    private final TenderRepository repo;
    private final AuditLogService audit;
    private final NotificationService notification;
    private final UserRepository userRepo;

    public TenderServiceImpl(TenderRepository repo,
                             AuditLogService audit,
                             NotificationService notification,
                             UserRepository userRepo) {
        this.repo = repo;
        this.audit = audit;
        this.notification = notification;
        this.userRepo = userRepo;
    }

    @Override
    @PreAuthorize("hasRole('PROCUREMENT_OFFICER')")
    public Tender create(Tender tender) {
        tender.setPublished(false);
        Tender saved = repo.save(tender);
        audit.recordData(LoggedUser.getUsername(), "CREATE_TENDER", "Tender created: " + saved.getId());
        return saved;
    }

    public Optional<Tender> findById(Long id) {
        return repo.findById(id);
    }

    public List<Tender> findActive() {
        return repo.findByPublishedTrueAndDeadlineAfter(LocalDateTime.now());
    }

    @Override
    @PreAuthorize("hasRole('PROCUREMENT_OFFICER')")
    public Tender publish(Long id) {
        Tender t = repo.findById(id).orElseThrow();
        t.setPublished(true);
        t.setDeadline(LocalDateTime.now().plusDays(7)); // example: 7-day window
        Tender updated = repo.save(t);
        audit.recordData(LoggedUser.getUsername(), "PUBLISH_TENDER", "Tender published: " + id);

        // Notify all vendors
        List<User> vendors = userRepo.findAll().stream()
                .filter(u -> u.getRole() == Role.VENDORS)
                .toList();
        for (User v : vendors) {
            Notification note = new Notification();
            note.setRecipient(v);
            note.setMessage("New tender published: " + t.getSubject());
            note.setType("TENDER_PUBLISH");
            notification.notify(note);
        }
        return updated;
    }

    @Override
    public Tender update(Tender tender) {
        Tender updated = repo.save(tender);
        audit.recordData(LoggedUser.getUsername(), "UPDATE_TENDER", "Tender updated: " + updated.getId());
        return updated;
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
        audit.recordData(LoggedUser.getUsername(), "DELETE_TENDER", "Tender deleted: " + id);
    }
}
