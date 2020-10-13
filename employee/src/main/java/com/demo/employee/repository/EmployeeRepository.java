package com.demo.employee.repository;


import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import com.demo.employee.entity.Employee;

public interface EmployeeRepository extends CrudRepository<Employee,Long> {

    Iterable<Employee> findAll(Sort sort);
}
