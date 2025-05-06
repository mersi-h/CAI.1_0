package com.team.models.dtos;

import lombok.Data;

@Data
public class CvScoreDetailDto {
    private String requirement;
    private boolean present;
    private String value;
    private boolean passed;
}
