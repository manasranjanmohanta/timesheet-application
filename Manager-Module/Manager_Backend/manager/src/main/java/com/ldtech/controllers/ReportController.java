package com.ldtech.controllers;

import com.ldtech.dtos.DateRangeDTO;
import com.ldtech.entities.TimesheetEntry;
import com.ldtech.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/download")
    public ResponseEntity<Resource> downloadEmployeesXLS(@RequestBody DateRangeDTO dateRangeDTO) {

        List<TimesheetEntry> timesheetList = reportService.getEmployeeData(dateRangeDTO);
//        return ResponseEntity.ok(timesheetList);
        // Generate XLS file using Apache POI
        byte[] xlsData = reportService.generateXLS(timesheetList);

        ByteArrayResource resource = new ByteArrayResource(xlsData);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=employee.xls")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(xlsData.length)
                .body(resource);
    }

    @PostMapping("/download/id/{employeeId}")
    public ResponseEntity<Resource> downloadEmployeesXLSByEmployeeId(@PathVariable String employeeId, @RequestBody DateRangeDTO dateRangeDTO) {

        List<TimesheetEntry> timesheetList = reportService.getEmployeeDataByEmployeeId(employeeId, dateRangeDTO);
        TimesheetEntry timesheetEntry = timesheetList.get(0);
        // Generate XLS file using Apache POI
        byte[] xlsData = reportService.generateXLS(timesheetList);

        ByteArrayResource resource = new ByteArrayResource(xlsData);
//
//        String fileName = timesheetEntry.getEmployee().getEmployeeName().toString() + ".xls";
//// Encode the filename using UTF-8
//        String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8)
//                .replaceAll("\\+", "_"); // Replace '+' with '%20' to properly encode spaces

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=employee.xls")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(xlsData.length)
                .body(resource);
    }

    @PostMapping("/download/name/{employeeName}")
    public ResponseEntity<Resource> downloadEmployeesXLSByEmployeeName(@PathVariable String employeeName, @RequestBody DateRangeDTO dateRangeDTO) {

        List<TimesheetEntry> timesheetList = reportService.getEmployeeDataByEmployeeName(employeeName, dateRangeDTO);
        TimesheetEntry timesheetEntry = timesheetList.get(0);
        // Generate XLS file using Apache POI
        byte[] xlsData = reportService.generateXLS(timesheetList);

        ByteArrayResource resource = new ByteArrayResource(xlsData);
//
//        String fileName = timesheetEntry.getEmployee().getEmployeeName().toString() + ".xls";
//// Encode the filename using UTF-8
//        String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8)
//                .replaceAll("\\+", "_"); // Replace '+' with '%20' to properly encode spaces

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=employee.xls")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(xlsData.length)
                .body(resource);
    }


}
