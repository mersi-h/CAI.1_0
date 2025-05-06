package com.team.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.models.dtos.AutoValidationResponseDto;
import com.team.models.dtos.CvScoresResponseDto;
import com.team.models.dtos.RequirementDto;
import com.team.services.CvScoringService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.core.type.TypeReference;


import java.util.List;

@RestController
@RequestMapping("/teamFinder/api/cv")
@CrossOrigin(origins = "http://localhost:4200")
public class CvScoringController {

    private final CvScoringService scoringService;
    private final ObjectMapper objectMapper;

    public CvScoringController(
            CvScoringService scoringService,
            ObjectMapper objectMapper
    ) {
        this.scoringService = scoringService;
        this.objectMapper = objectMapper;
    }

    @PostMapping(
            value    = "/score",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public CvScoresResponseDto scoreCvs(
            @RequestParam("requirements") String requirementsJson,
            @RequestParam("files") List<MultipartFile> cvs
    ) throws Exception {
        // parse the JSON array of RequirementDto
        List<RequirementDto> requirements = objectMapper.readValue(
                requirementsJson,
                new TypeReference<List<RequirementDto>>() {}
        );
        return scoringService.scoreCvs(requirements, cvs);
    }

    @PostMapping(
            value = "/auto",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public AutoValidationResponseDto validateDocument(
            @RequestPart("file") MultipartFile file
    ) {
        return this.scoringService.autoValidate(file);
    }
}
