package com.team.services.service_impl;

import com.team.models.dtos.AiExtractResult;
import com.team.models.dtos.ValidationResultDto;
import com.team.services.AiService;
import com.team.services.DocumentValidationService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DocumentValidationServiceImpl implements DocumentValidationService {
    private final AiService aiService;

    public DocumentValidationServiceImpl(AiService aiService) {
        this.aiService = aiService;
    }

    @Override
    public ValidationResultDto validate(MultipartFile file) throws IOException {
        // Call AI service to extract fields and missing list
        AiExtractResult extract = aiService.extract(file);
        Map<String, String> fields = extract.getFields();
        List<String> missing = extract.getMissing();

        int totalFields = fields.size() + missing.size();
        int presentCount = fields.size();

        // Build details map
        Map<String, Map<String, Boolean>> details = new HashMap<>();
        // Present fields
        for (String key : fields.keySet()) {
            Map<String, Boolean> flags = new HashMap<>();
            flags.put("present", true);
            flags.put("format_ok", true);
            flags.put("semantic_ok", true);
            details.put(key, flags);
        }
        // Missing fields
        for (String key : missing) {
            Map<String, Boolean> flags = new HashMap<>();
            flags.put("present", false);
            flags.put("format_ok", false);
            flags.put("semantic_ok", false);
            details.put(key, flags);
        }

        double completeness = totalFields == 0 ? 1.0 : (double) presentCount / totalFields;
        double correctness = totalFields == 0 ? 1.0 : (double) presentCount / totalFields;

        return new ValidationResultDto(completeness, correctness, details);
    }
}
