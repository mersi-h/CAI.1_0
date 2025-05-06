package com.team.services;

import com.team.models.dtos.ValidationResultDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DocumentValidationService {
    ValidationResultDto validate(MultipartFile file) throws IOException;
}
