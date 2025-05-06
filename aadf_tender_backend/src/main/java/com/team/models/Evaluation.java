package com.team.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "evaluations")
@Setter
@Getter
public class Evaluation extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "offer_id", nullable = false)
    private Offer offer;

    @ManyToOne
    @JoinColumn(name = "evaluator_id", nullable = false)
    private User evaluator;

    @ElementCollection
    @CollectionTable(name = "evaluation_scores", joinColumns = @JoinColumn(name = "evaluation_id"))
    @MapKeyColumn(name = "criterion_name")
    @Column(name = "score")
    private Map<String, Integer> criterionScores;

    private String comments;
    private LocalDateTime scoredAt;

    public int getTotalScore() {
        return criterionScores.values()
                .stream()
                .mapToInt(Integer::intValue)
                .sum();
    }
}
