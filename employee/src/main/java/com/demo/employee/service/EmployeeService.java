package com.demo.employee.service;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.demo.employee.entity.Employee;
import com.demo.employee.repository.EmployeeRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getEmployees(String sortBy) {
        if (!StringUtils.isEmpty(sortBy)) {
            Sort sort = new Sort(Sort.Direction.ASC, sortBy);
            return StreamSupport.stream(
                    employeeRepository
                            .findAll(sort)
                            .spliterator(), false)
                    .collect(Collectors.toList());
        }

        return StreamSupport.stream(
                employeeRepository
                        .findAll()
                        .spliterator(), false)
                .collect(Collectors.toList());


    }

    public Employee getEmployee(Long id) {

        return employeeRepository.findById(id).orElse(null);
    }
}
