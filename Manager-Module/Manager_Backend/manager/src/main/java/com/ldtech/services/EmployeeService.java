package com.ldtech.services;

import com.ldtech.entities.Employee;

import java.util.List;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);
    Employee getEmployeeById(String employeeId);
    List<Employee> getAllEmployees();
    void deleteEmployee(String employeeId);
}
