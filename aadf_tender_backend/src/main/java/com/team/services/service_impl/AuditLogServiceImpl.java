package com.team.services.service_impl;

import com.team.models.AuditLog;
import com.team.models.User;
import com.team.repository.AuditLogRepository;
import com.team.services.AuditLogService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class AuditLogServiceImpl implements AuditLogService {
    private final AuditLogRepository repo;

    public AuditLogServiceImpl(AuditLogRepository repo) {
        this.repo = repo;
    }

    public AuditLog record(AuditLog log) {
        log.setEventTime(LocalDateTime.now());
        return repo.save(log);
    }

    public List<AuditLog> findByUser(User user) {
        return repo.findByUser_Id(user.getId());
    }

    @Override
    public AuditLog recordData(String actorUsername, String action, String details) {
        AuditLog log = new AuditLog();
        log.setUser(null);
        log.setAction(action);
        log.setDetails(details);
        log.setEventTime(LocalDateTime.now());
        return repo.save(log);
    }
}
