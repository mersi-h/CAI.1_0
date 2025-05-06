package com.team.services;

import com.team.models.dtos.AiExtractResult;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface AiService {
    AiExtractResult extractFields(String documentUrl);

    Map<String, Integer> suggestScores(Map<String, Integer> criteria);

    AiExtractResult extract(MultipartFile file) throws IOException;
}
