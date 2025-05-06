package com.team.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "criteria")
@Getter
@Setter
public class Criterion extends BaseEntity {
    private String name;
    private String description;
    private double weight;
}
