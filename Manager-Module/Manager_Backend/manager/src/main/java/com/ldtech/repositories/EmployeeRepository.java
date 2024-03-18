package com.ldtech.repositories;

import com.ldtech.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Employee findByEmployeeName(String employeeName);
    // You can add custom query methods here if needed
}
