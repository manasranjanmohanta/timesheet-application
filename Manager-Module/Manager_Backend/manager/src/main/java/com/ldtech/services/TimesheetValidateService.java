package com.ldtech.services;

import com.ldtech.payloads.TimesheetRequest;
import com.ldtech.payloads.TimesheetResponse;

import java.time.LocalDate;

public interface TimesheetValidateService {
    TimesheetResponse getTimesheetEntryByEmployeeIdAndLogDate(String employeeId, LocalDate logDate);

    void validateTimesheet(TimesheetRequest timesheetRequest);
}
