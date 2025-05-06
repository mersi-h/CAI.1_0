package com.team.services.service_impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.models.dtos.AutoValidationResponseDto;
import com.team.models.dtos.CvScoresResponseDto;
import com.team.models.dtos.RequirementDto;
import com.team.services.CvScoringService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.List;

@Service
public class CvScoringServiceImpl implements CvScoringService {
    private final RestTemplate rest;
    private final WebClient client;

    public CvScoringServiceImpl(
            @Qualifier("cvRestTemplate") RestTemplate rest,
            @Qualifier("cvWebClient") WebClient client
    ) {
        this.rest = rest;
        this.client = client;
    }

    @Override
    public CvScoresResponseDto scoreCvs(List<RequirementDto> requirements,
                                        List<MultipartFile> cvs) {
        // Example with RestTemplate:
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("requirements", toJson(requirements));
        cvs.forEach(file ->
                {
                    try {
                        body.add("files", toResource(file));
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }
        );
        // This will POST to http://localhost:8001/score-cvs
        return rest.postForObject(
                "/score-evaluation",
                new HttpEntity<>(body, createMultipartHeaders()),
                CvScoresResponseDto.class
        );
    }

    private HttpHeaders createMultipartHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        return headers;
    }

    private ByteArrayResource toResource(MultipartFile mf) throws IOException {
        return new ByteArrayResource(mf.getBytes()) {
            @Override
            public String getFilename() {
                return mf.getOriginalFilename();
            }

            @Override
            public long contentLength() {
                return mf.getSize();
            }
        };
    }

    private String toJson(Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    @Override
    public AutoValidationResponseDto autoValidate(MultipartFile file) {
        ByteArrayResource resource = new ByteArrayResource(getBytes(file)) {
            @Override public String getFilename() { return file.getOriginalFilename(); }
            @Override public long contentLength() { return file.getSize(); }
        };

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", resource);

        Mono<AutoValidationResponseDto> resp = client.post()
                .uri("/auto-validate")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(body))
                .retrieve()
                .bodyToMono(AutoValidationResponseDto.class);

        return resp.block();
    }

    private byte[] getBytes(MultipartFile file) {
        try { return file.getBytes(); }
        catch (Exception e) { throw new IllegalStateException(e); }
    }
}
