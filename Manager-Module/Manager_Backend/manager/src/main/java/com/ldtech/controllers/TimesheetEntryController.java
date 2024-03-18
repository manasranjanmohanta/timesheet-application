package com.ldtech.controllers;

import com.ldtech.entities.TimesheetEntry;
import com.ldtech.services.TimesheetEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

import java.util.List;

@RestController
@RequestMapping("/api/v1/timesheetEntries")
public class TimesheetEntryController {

    @Autowired
    private TimesheetEntryService timesheetEntryService;

    @PostMapping
    public ResponseEntity<TimesheetEntry> createTimesheetEntry(@RequestBody TimesheetEntry timesheetEntry) {
        TimesheetEntry savedEntry = timesheetEntryService.saveTimesheetEntry(timesheetEntry);
        return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);
    }

    @GetMapping("/{employeeId}/{logDate}")
    public ResponseEntity<TimesheetEntry> getTimesheetEntryById(@PathVariable String employeeId, @PathVariable LocalDate logDate) {
        TimesheetEntry entry = timesheetEntryService.getTimesheetEntryByEmployeeIdAndLogDate(employeeId, logDate);
        if (entry != null) {
            return new ResponseEntity<>(entry, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<TimesheetEntry>> getTimesheetEntryById(@PathVariable String employeeId) {
        List<TimesheetEntry> entryList = timesheetEntryService.getTimesheetEntryByEmployeeId(employeeId);
        if (entryList != null) {
            return new ResponseEntity<>(entryList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<TimesheetEntry>> getAllTimesheetEntries() {
        List<TimesheetEntry> entries = timesheetEntryService.getAllTimesheetEntries();
        return new ResponseEntity<>(entries, HttpStatus.OK);
    }

    @DeleteMapping("/{employeeId}/{logDate}")
    public ResponseEntity<Void> deleteTimesheetEntry(@PathVariable String employeeId, @PathVariable LocalDate logDate) {
        timesheetEntryService.deleteTimesheetEntry(employeeId, logDate);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
