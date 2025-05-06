package com.team.controllers;

import com.team.models.Notification;
import com.team.models.User;
import com.team.services.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teamFinder/api/notifications")
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {
    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @PostMapping
    public Notification create(@RequestBody Notification n) {
        return service.notify(n);
    }

    @GetMapping("/recipient/{recipientId}")
    public List<Notification> listByRecipient(@PathVariable Long recipientId) {
        User u = new User();
        return service.findByRecipient(u);
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id) {
        service.markAsRead(id);
    }
}
