package com.team.models.enums;

public enum JointVentures {
    ALLOWED("Allowed"),
    NOT_ALLOWED("Not Allowed");

    private final String label;

    JointVentures(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
