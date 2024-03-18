package com.ldtech.services;

import com.ldtech.entities.TimesheetEntry;

import java.time.LocalDate;

import java.util.List;

public interface TimesheetEntryService {
    TimesheetEntry saveTimesheetEntry(TimesheetEntry timesheetEntry);
    TimesheetEntry getTimesheetEntryByEmployeeIdAndLogDate(String employeeId, LocalDate logDate);
    List<TimesheetEntry> getAllTimesheetEntries();
    void deleteTimesheetEntry(String employeeId, LocalDate logDate);

    List<TimesheetEntry> getTimesheetEntryByEmployeeId(String employeeId);
}
