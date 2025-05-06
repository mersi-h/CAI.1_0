package com.team.services.service_impl;

import com.team.models.Evaluation;
import com.team.models.Notification;
import com.team.models.Offer;
import com.team.models.User;
import com.team.repository.EvaluationRepository;
import com.team.services.AiService;
import com.team.services.AuditLogService;
import com.team.services.EvaluationService;
import com.team.services.NotificationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class EvaluationServiceImpl implements EvaluationService {
    private final EvaluationRepository repo;
    private final AuditLogService audit;
    private final AiService ai;
    private final NotificationService notification;

    public EvaluationServiceImpl(EvaluationRepository repo,
                                 AuditLogService audit,
                                 AiService ai,
                                 NotificationService notification) {
        this.repo = repo;
        this.audit = audit;
        this.ai = ai;
        this.notification = notification;
    }

    @Override
    public Evaluation score(Evaluation eval) {
        eval.setScoredAt(LocalDateTime.now());
        Map<String, Integer> suggestions = ai.suggestScores(eval.getCriterionScores());
        eval.getCriterionScores().putAll(suggestions);
        Evaluation saved = repo.save(eval);
        audit.recordData(LoggedUser.getUsername(), "OFFER_SCORED", "Evaluation " + saved.getId() + " suggested scores: " + suggestions);
        // Notify vendor of scoring
        Notification note = new Notification();
        note.setRecipient(eval.getOffer().getVendor());
        note.setMessage("Your offer was scored for Tender " + eval.getOffer().getTender().getSubject());
        note.setType("OFFER_SCORED");
        notification.notify(note);
        return saved;
    }

    public Optional<Evaluation> findById(Long id) {
        return repo.findById(id);
    }

    public List<Evaluation> findByOffer(Offer offer) {
        return repo.findAllByOffer_Id(offer.getId());
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
        audit.recordData(LoggedUser.getUsername(), "DELETE_EVALUATION", "Evaluation deleted: " + id);
    }

    @Override
    public List<Evaluation> findByEvaluator(Long idEvaluator) {
        return repo.findAllByEvaluator_Id(idEvaluator);
    }
}
