package com.ldtech.services.impl;

import com.ldtech.entities.Employee;
import com.ldtech.entities.Role;
import com.ldtech.exceptions.ResourceCreationException;
import com.ldtech.exceptions.ResourceNotFoundException;
import com.ldtech.exceptions.ResourceRetrivalException;
import com.ldtech.repositories.EmployeeRepository;
import com.ldtech.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee saveEmployee(Employee employee) {
        try {
            return employeeRepository.save(employee);
        } catch (Exception e) {
            throw new ResourceCreationException("Failed to save employee", e);
        }
    }

    @Override
    public Employee getEmployeeById(String employeeId) {
        return employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee", "ID", employeeId));
    }

    @Override
    public List<Employee> getAllEmployees() {
        try {
            return employeeRepository.findAll();
        } catch (Exception e) {
            throw new ResourceRetrivalException("Failed to retrieve all employees", e);
        }
    }

    @Override
    public void deleteEmployee(String employeeId) {
        // Check if the employee exists
        boolean exists = employeeRepository.existsById(employeeId);
        if (!exists) {
            // Throw custom exception if employee does not exist
            throw new ResourceNotFoundException("Employee", "ID", employeeId);
        }

        // Proceed to delete the employee if they exist
        employeeRepository.deleteById(employeeId);
    }

}
