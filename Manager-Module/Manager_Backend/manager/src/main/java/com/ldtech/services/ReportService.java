package com.ldtech.services;

import com.ldtech.dtos.DateRangeDTO;
import com.ldtech.entities.TimesheetEntry;

import java.util.List;

public interface ReportService {
    List<TimesheetEntry> getEmployeeData(DateRangeDTO dateRangeDTO);

    byte[] generateXLS(List<TimesheetEntry> timesheetList);

    List<TimesheetEntry> getEmployeeDataByEmployeeId(String employeeId, DateRangeDTO dateRangeDTO);

    List<TimesheetEntry> getEmployeeDataByEmployeeName(String employeeName, DateRangeDTO dateRangeDTO);
}
