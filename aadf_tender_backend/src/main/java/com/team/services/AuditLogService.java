package com.team.services;

import com.team.models.AuditLog;
import com.team.models.User;

import java.util.List;

public interface AuditLogService {
    AuditLog record(AuditLog log);

    List<AuditLog> findByUser(User user);

    AuditLog recordData(String actorUserName, String action, String details);
}
