package com.rbs.employee.rest;

import com.rbs.employee.entity.Employee;
import com.rbs.employee.service.EmployeeService;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class EmployeeController {

    private  EmployeeService employeeService;

    @GetMapping
    public List<Employee> getEmployees(@RequestParam(required = false) String sortBy) {
        return employeeService.getEmployees(sortBy);
    }

    @GetMapping("/{id}")
    public Employee getEmployees(@PathVariable Long id) {
        return employeeService.getEmployee(id);
    }
}
