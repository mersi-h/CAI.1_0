package com.team.services.service_impl;

import com.team.models.Notification;
import com.team.models.User;
import com.team.repository.NotificationRepository;
import com.team.services.NotificationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository repo;

    public NotificationServiceImpl(NotificationRepository repo) {
        this.repo = repo;
    }

    public Notification notify(Notification n) {
        return repo.save(n);
    }

    public List<Notification> findByRecipient(User recipient) {
        return repo.findByRecipient_Id(recipient.getId());
    }

    public void markAsRead(Long id) {
        repo.findById(id).ifPresent(n -> {
            n.setRead(true);
            repo.save(n);
        });
    }
}
