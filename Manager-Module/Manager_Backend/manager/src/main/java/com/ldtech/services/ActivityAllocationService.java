package com.ldtech.services;

import com.ldtech.entities.ActivityAllocation;
import com.ldtech.payloads.ActivityRequest;
import com.ldtech.payloads.EmployeeData;

import java.util.List;

public interface ActivityAllocationService {
    ActivityAllocation saveActivityAllocation(ActivityAllocation activityAllocation);
    ActivityAllocation getActivityAllocationById(String projectId, String employeeId);
    List<ActivityAllocation> getAllActivityAllocations();

    EmployeeData searchEmployeeByEmployeeId(String employeeId);

    EmployeeData searchEmployeeByEmployeeName(String employeeName);

    List<String> getAllProjectNames(String projectManager);

    boolean allocateActivity(ActivityRequest activityRequest);
}

