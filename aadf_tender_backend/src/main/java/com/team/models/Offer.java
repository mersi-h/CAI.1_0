package com.team.models;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "offers")
@Getter
@Setter
public class Offer extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "tender_id", nullable = false)
    private Tender tender;

    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = false)
    private User vendor;

    private String documentUrl;
    private LocalDateTime submittedAt;
    private boolean visible;
}
