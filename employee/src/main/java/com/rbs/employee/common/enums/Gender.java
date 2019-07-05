package com.rbs.employee.common.enums;


import com.fasterxml.jackson.annotation.JsonValue;

public enum Gender {
    MALE("Male"), FEMALE("Female");

    private String gender;

    Gender(String gender) {
        this.gender = gender;
    }

    @JsonValue
    public String getGender() {
        return this.gender;
    }

}
