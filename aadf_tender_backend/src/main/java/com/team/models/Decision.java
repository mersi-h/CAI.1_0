package com.team.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "decisions")
@Getter
@Setter
public class Decision extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "tender_id", nullable = false)
    private Tender tender;

    @ManyToOne
    @JoinColumn(name = "offer_id", nullable = false)
    private Offer winningOffer;

    @ManyToOne
    @JoinColumn(name = "decided_by", nullable = false)
    private User decidedBy;

    private LocalDateTime decidedAt;
    private String comment;
}
