package com.team.models.dtos;

import lombok.Data;

@Data
public class AutoFieldValidationDto {
    private String fieldType;
    private String rawValue;
    private boolean valid;
    private String error;
}
