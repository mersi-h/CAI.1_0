package com.team.models.dtos;

import lombok.Data;

import java.util.List;

@Data
public class AutoValidationResponseDto {
    private List<AutoFieldValidationDto> results;
}
