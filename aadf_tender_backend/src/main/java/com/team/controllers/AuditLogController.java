package com.team.controllers;

import com.team.models.AuditLog;
import com.team.models.User;
import com.team.services.AuditLogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teamFinder/api/audit-logs")
@CrossOrigin(origins = "http://localhost:4200")
public class AuditLogController {
    private final AuditLogService service;

    public AuditLogController(AuditLogService service) {
        this.service = service;
    }

    @PostMapping
    public AuditLog record(@RequestBody AuditLog log) {
        return service.record(log);
    }

    @GetMapping("/user/{userId}")
    public List<AuditLog> listByUser(@PathVariable Long userId) {
        User u = new User();
        return service.findByUser(u);
    }
}
