package com.team.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class ValidationResultDto {
    private double completeness;
    private double correctness;
    private Map<String, Map<String, Boolean>> details;
}
