package com.team.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.team.models.dtos.AutoValidationResponseDto;
import com.team.models.dtos.CvScoresResponseDto;
import com.team.models.dtos.RequirementDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CvScoringService {
    CvScoresResponseDto scoreCvs(List<RequirementDto> requirements, List<MultipartFile> cvs) throws IOException;
    AutoValidationResponseDto autoValidate(MultipartFile file);
}
