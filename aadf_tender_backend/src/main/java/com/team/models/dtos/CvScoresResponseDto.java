package com.team.models.dtos;

import lombok.Data;

import java.util.List;

@Data
public class CvScoresResponseDto {
    private List<RequirementDto> requirements;
    private List<CvScoreDto> results;
}
