package com.demo.employee.rest;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.employee.entity.Employee;
import com.demo.employee.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class EmployeeController {

@Autowired
private EmployeeService employeeService;

@GetMapping
public List<Employee> getEmployees(@RequestParam(required = false) String sortBy) {
List<Employee> employees = employeeService.getEmployees(sortBy);
return employees;
}

@GetMapping("/{id}")
public Employee getEmployees(@PathVariable Long id) {
Employee employee = employeeService.getEmployee(id);
if(employee!=null)
return employee;
else
	throw new IllegalArgumentException("Id does not exists");
}
}
