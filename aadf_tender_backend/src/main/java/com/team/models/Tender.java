package com.team.models;

import com.team.models.enums.ChallengeArea;
import com.team.models.enums.JointVentures;
import com.team.models.enums.Subcontracting;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tenders")
@Getter
@Setter
public class Tender extends BaseEntity {

    private String subject;

    private String scope;

    @Enumerated(EnumType.STRING)
    private Subcontracting subcontracting;

    @Enumerated(EnumType.STRING)
    private JointVentures jointVentures;

    private String progressPayments;

    private String siteVisit;

    private Integer numBidsAllowed;

    private LocalDateTime bidOpen;

    private LocalDateTime deadline;

    private BigDecimal ceilingFund;

    private String description;

    @Enumerated(EnumType.STRING)
    private ChallengeArea area;

    @OneToMany(mappedBy = "tender", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Qualifications> qualifications;

    private String companyExperience;

    private boolean published;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;
}
