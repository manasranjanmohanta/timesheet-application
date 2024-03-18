package com.ldtech.services;

import com.ldtech.entities.EmployeeAllocation;

import java.util.Date;
import java.util.List;

public interface EmployeeAllocationService {
    EmployeeAllocation saveEmployeeAllocation(EmployeeAllocation employeeAllocation);
    EmployeeAllocation getEmployeeAllocationById(String employeeId,String projectId);
    List<EmployeeAllocation> getAllEmployeeAllocations();
    void deleteEmployeeAllocation(String projectId, String employeeId);
}
