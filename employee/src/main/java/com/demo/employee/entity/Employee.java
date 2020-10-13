package com.demo.employee.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.demo.employee.common.enums.Gender;

import java.util.Date;

@Entity
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String name;
    Date hireDate;
    Date dateOfBirth;
    int age;
    String phoneNumber;
    Double salary;
    @Enumerated(EnumType.STRING)
    Gender gender;
}
