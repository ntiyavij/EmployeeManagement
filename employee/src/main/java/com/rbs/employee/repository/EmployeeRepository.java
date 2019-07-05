package com.rbs.employee.repository;


import com.rbs.employee.entity.Employee;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee,Long> {

    Iterable<Employee> findAll(Sort sort);
}
