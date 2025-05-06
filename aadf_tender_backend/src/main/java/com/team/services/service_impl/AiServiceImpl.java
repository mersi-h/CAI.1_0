package com.team.services.service_impl;

import com.team.models.dtos.AiExtractResult;
import com.team.resources.MultipartInputStreamFileResource;
import com.team.services.AiService;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.Map;

@Service
public class AiServiceImpl implements AiService {
    private final RestTemplate rest;
    private final WebClient client;
    private static final String AI_BASE_URL = "http://localhost:8000";

    public AiServiceImpl(RestTemplateBuilder builder,
                         WebClient client) {
        this.rest = builder.build();
        this.client = client;
    }

    @Override
    public AiExtractResult extractFields(String documentUrl) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> req = new HttpEntity<>(Map.of("docUrl", documentUrl), headers);
        return rest.postForObject(AI_BASE_URL + "/extract", req, AiExtractResult.class);
    }

    @Override
    public AiExtractResult extract(MultipartFile file) throws IOException {
        return client.post().uri("/extract")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData("file",
                        new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename())))
                .retrieve()
                .bodyToMono(AiExtractResult.class)
                .block();
    }

    @Override
    public Map<String, Integer> suggestScores(Map<String, Integer> criteria) {
        return client.post().uri("/suggest-scores")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("criteria", criteria))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Integer>>() {
                })
                .block();
    }
}
