package com.team.models.enums;

public enum Subcontracting {
    ALLOWED("Allowed"),
    NOT_ALLOWED("Not Allowed");

    private final String label;

    Subcontracting(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
