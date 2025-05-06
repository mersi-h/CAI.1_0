package com.team.services;

import com.team.models.Notification;
import com.team.models.User;

import java.util.List;

public interface NotificationService {
    Notification notify(Notification n);

    List<Notification> findByRecipient(User recipient);

    void markAsRead(Long id);
}
