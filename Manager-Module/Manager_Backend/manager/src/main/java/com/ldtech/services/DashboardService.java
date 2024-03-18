package com.ldtech.services;

import com.ldtech.dtos.DateRangeDTO;
import com.ldtech.entities.TimesheetEntry;
import com.ldtech.payloads.EmployeeDashboardResponse;

import java.util.List;

public interface DashboardService {
    List<EmployeeDashboardResponse> getDashboard();

    List<EmployeeDashboardResponse> searchByEmployeeId(String employeeId, DateRangeDTO dateRangeDTO);

    List<EmployeeDashboardResponse> searchByEmployeeName(String employeeName, DateRangeDTO dateRangeDTO);

    List<EmployeeDashboardResponse> searchByStatus(String approvalStatus, DateRangeDTO dateRangeDTO);

    List<EmployeeDashboardResponse> searchByClient(String client, DateRangeDTO dateRangeDTO);

    List<EmployeeDashboardResponse> searchByDepartment(String department, DateRangeDTO dateRangeDTO);
}
