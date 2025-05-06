package com.team.models.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class AiExtractResult {
    private Map<String, String> fields;
    private List<String> missing;
}
