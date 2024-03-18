package com.ldtech.controllers;

import com.ldtech.payloads.TimesheetRequest;
import com.ldtech.payloads.TimesheetResponse;
import com.ldtech.services.TimesheetValidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/validate")
public class TimesheetValidateController {

    @Autowired
    private TimesheetValidateService timesheetValidateService;

    @GetMapping("/{employeeId}/{logDate}")
    public ResponseEntity<TimesheetResponse> getTimesheetEntryById(@PathVariable String employeeId, @PathVariable LocalDate logDate) {
        TimesheetResponse response = timesheetValidateService.getTimesheetEntryByEmployeeIdAndLogDate(employeeId, logDate);
        if (response != null) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/timesheet")
    public ResponseEntity<?> validateTimesheet(@RequestBody TimesheetRequest timesheetRequest){
        timesheetValidateService.validateTimesheet(timesheetRequest);
        return ResponseEntity.ok("Timesheet Updated successfully!!");
    }
}
