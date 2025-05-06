package com.team.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
public class AuditLog extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String action;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(name = "event_time", nullable = false)
    private LocalDateTime eventTime;
}
