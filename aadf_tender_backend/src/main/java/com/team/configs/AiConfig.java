package com.team.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AiConfig {
    @Value("${python.cv.base-url:http://localhost:8001}")
    private String cvBaseUrl;

    @Bean
    public RestTemplate cvRestTemplate(RestTemplateBuilder builder) {
        // set the root URI so you can do rest.postForObject("/score-cvs", …)
        return builder
                .rootUri(cvBaseUrl)
                .build();
    }

    @Bean
    public WebClient cvWebClient() {
        // same for WebClient
        return WebClient.builder()
                .baseUrl(cvBaseUrl)
                .build();
    }
}
