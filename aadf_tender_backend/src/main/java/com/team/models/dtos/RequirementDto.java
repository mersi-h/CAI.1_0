package com.team.models.dtos;

import lombok.Data;

@Data
public class RequirementDto {
    private String name;
    private String pattern;
    private String type; // "numeric" or "boolean"
    private Double threshold;   // for numeric
    private String expected;
}
