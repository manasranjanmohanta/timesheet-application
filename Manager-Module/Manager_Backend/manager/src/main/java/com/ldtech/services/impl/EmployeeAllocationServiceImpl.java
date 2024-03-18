package com.ldtech.services.impl;

import com.ldtech.entities.EmployeeAllocation;
import com.ldtech.entities.EmployeeAllocationId;
import com.ldtech.repositories.EmployeeAllocationRepository;
import com.ldtech.repositories.EmployeeRepository;
import com.ldtech.repositories.ProjectRepository;
import com.ldtech.services.EmployeeAllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeAllocationServiceImpl implements EmployeeAllocationService {

    @Autowired
    private EmployeeAllocationRepository employeeAllocationRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public EmployeeAllocation saveEmployeeAllocation(EmployeeAllocation employeeAllocation) {
        // verifying employee exists in the employee_master table or not
        if (!employeeRepository.existsById(employeeAllocation.getEmployee().getEmployeeId())) {
            // Handle the case where the referenced employee does not exist
            throw new ResponseStatusException( HttpStatus.NOT_FOUND,"Employee with ID " + employeeAllocation.getEmployee().getEmployeeId() + " not found.");
        }

        //        verifying project exists in the project_master table or not
        if (!projectRepository.existsById(employeeAllocation.getProject().getProjectId())) {
            // Handle the case where the referenced employee does not exist
            throw new ResponseStatusException( HttpStatus.NOT_FOUND,"Project with ID " + employeeAllocation.getProject().getProjectId() + " not found.");
        }
        return employeeAllocationRepository.save(employeeAllocation);
    }

    @Override
    public EmployeeAllocation getEmployeeAllocationById(String employeeId,String projectId) {
        EmployeeAllocationId id = new EmployeeAllocationId();

        id.setEmployeeId(employeeId);
        id.setProjectId(projectId);
        return employeeAllocationRepository.findById(id).orElse(null);
    }

    @Override
    public List<EmployeeAllocation> getAllEmployeeAllocations() {
        return employeeAllocationRepository.findAll();
    }

    @Override
    public void deleteEmployeeAllocation(String projectId, String employeeId) {
        EmployeeAllocationId id = new EmployeeAllocationId();
        id.setProjectId(projectId);
        id.setEmployeeId(employeeId);
        employeeAllocationRepository.deleteById(id);
    }
}

