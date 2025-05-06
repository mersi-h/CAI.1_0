package com.team.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tender_criteria")
@Getter
@Setter
public class TenderCriterion extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "tender_id", nullable = false)
    private Tender tender;

    @ManyToOne
    @JoinColumn(name = "criterion_id", nullable = false)
    private Criterion criterion;
}
