package com.team.models.enums;

public enum ChallengeArea {
    EDUCATION_ACCESSIBILITY("Education Accessibility"),
    TOURISM_DEVELOPMENT("Tourism Development"),
    DIGITAL_PUBLIC_SERVICES("Digital Public Services"),
    CULTURAL_HERITAGE_PRESERVATION("Cultural Heritage Preservation");

    private final String label;

    ChallengeArea(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
