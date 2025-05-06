package com.team.controllers;

import com.team.models.dtos.ValidationResultDto;
import com.team.services.DocumentValidationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/teamFinder/api/documents")
@CrossOrigin(origins = "http://localhost:4200")
public class DocumentValidationController {
    private final DocumentValidationService validator;

    public DocumentValidationController(DocumentValidationService validator) {
        this.validator = validator;
    }

    /**
     * Validates the uploaded document against the tender specification schema.
     * Returns completeness, correctness, and field-level details.
     */
    @PostMapping("/validate-only")
    public ValidationResultDto validateOnly(@RequestParam("file") MultipartFile file) {
        try {
            return validator.validate(file);
        } catch (Exception ex) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Document validation failed: " + ex.getMessage(),
                    ex
            );
        }
    }
}
