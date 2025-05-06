package com.team.models.dtos;

import lombok.Data;

import java.util.List;

@Data
public class CvScoreDto {
    private String filename;
    private List<CvScoreDetailDto> details;
    private double totalScore;
}
