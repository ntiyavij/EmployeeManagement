package com.rbs.employee.service;

import com.rbs.employee.entity.Employee;
import com.rbs.employee.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@AllArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

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
