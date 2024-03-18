package com.ldtech.controllers;

import com.ldtech.entities.EmployeeAllocation;
import com.ldtech.services.EmployeeAllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/v1/employeeAllocations")
public class EmployeeAllocationController {

    @Autowired
    private EmployeeAllocationService employeeAllocationService;

    @PostMapping
    public ResponseEntity<EmployeeAllocation> createEmployeeAllocation(@RequestBody EmployeeAllocation employeeAllocation) {
        EmployeeAllocation savedAllocation = employeeAllocationService.saveEmployeeAllocation(employeeAllocation);
        return new ResponseEntity<>(savedAllocation, HttpStatus.CREATED);
    }

    @GetMapping("/{employeeId}/{projectId}")
    public ResponseEntity<EmployeeAllocation> getEmployeeAllocationById(@PathVariable String employeeId,@PathVariable String projectId) {

        EmployeeAllocation allocation = employeeAllocationService.getEmployeeAllocationById(employeeId,projectId);
        if (allocation != null) {
            return new ResponseEntity<>(allocation, HttpStatus.OK);
        } else {
            System.out.println("nahini data be");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<EmployeeAllocation>> getAllEmployeeAllocations() {
        List<EmployeeAllocation> allocations = employeeAllocationService.getAllEmployeeAllocations();
        return new ResponseEntity<>(allocations, HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}/{employeeId}")
    public ResponseEntity<Void> deleteEmployeeAllocation(@PathVariable String projectId, @PathVariable String employeeId) {
        employeeAllocationService.deleteEmployeeAllocation(projectId, employeeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
