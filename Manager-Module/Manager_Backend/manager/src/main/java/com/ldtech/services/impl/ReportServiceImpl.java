package com.ldtech.services.impl;

import com.ldtech.dtos.DateRangeDTO;
import com.ldtech.entities.TimesheetEntry;
import com.ldtech.repositories.TimesheetEntryRepository;
import com.ldtech.services.ReportService;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private TimesheetEntryRepository timesheetEntryRepository;

    @Override
    public List<TimesheetEntry> getEmployeeData(DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();


        List<TimesheetEntry> timesheetEntries = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> entryList = timesheetEntryRepository.findByLogDate(date);

            timesheetEntries.addAll(entryList);

        }
        timesheetEntries = timesheetEntries.stream()
                .filter(timesheetEntry -> !timesheetEntry.getApprovalStatus().equals("Pending"))
                .collect(Collectors.toList());
        return timesheetEntries;
    }

    @Override
    public byte[] generateXLS(List<TimesheetEntry> timesheetList) {
        try (Workbook workbook = new HSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Employees");

            // Create header row
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Log Date");
            headerRow.createCell(1).setCellValue("Employee ID");
            headerRow.createCell(2).setCellValue("Employee Name");
            headerRow.createCell(3).setCellValue("Project Name");
            headerRow.createCell(4).setCellValue("Activity Type");
            headerRow.createCell(5).setCellValue("Activity Start Time");
            headerRow.createCell(6).setCellValue("Activity End Time");
            headerRow.createCell(7).setCellValue("Approval Status");
            headerRow.createCell(8).setCellValue("Remarks");


            // Create data rows
            int rowNum = 1;
            for (TimesheetEntry employee : timesheetList) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(employee.getId().getLogDate().toString());
                row.createCell(1).setCellValue(employee.getId().getEmployeeId());
                row.createCell(2).setCellValue(employee.getEmployee().getEmployeeName());
                row.createCell(3).setCellValue(employee.getProject().getProjectName());
                row.createCell(4).setCellValue(employee.getId().getActivityType());
                row.createCell(5).setCellValue(employee.getId().getStartTime().toString());
                row.createCell(6).setCellValue(employee.getEndTime().toString());
                row.createCell(7).setCellValue(employee.getApprovalStatus());
                row.createCell(8).setCellValue(employee.getRemark());

            }

            // Write the workbook to a ByteArrayOutputStream
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
            // Handle exception
            return new byte[0];
        }
    }

    @Override
    public List<TimesheetEntry> getEmployeeDataByEmployeeId(String employeeId, DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();

        List<TimesheetEntry> timesheetEntries = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> entryList = timesheetEntryRepository.findByEmployeeEmployeeIdAndIdLogDate(employeeId, date);

            timesheetEntries.addAll(entryList);

        }
        timesheetEntries = timesheetEntries.stream()
                .filter(timesheetEntry -> !timesheetEntry.getApprovalStatus().equals("Pending"))
                .collect(Collectors.toList());
        return timesheetEntries;
    }

    @Override
    public List<TimesheetEntry> getEmployeeDataByEmployeeName(String employeeName, DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();

        List<TimesheetEntry> timesheetEntries = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> entryList = timesheetEntryRepository.findByEmployeeEmployeeNameAndIdLogDate(employeeName, date);

            timesheetEntries.addAll(entryList);

        }
        timesheetEntries = timesheetEntries.stream()
                .filter(timesheetEntry -> !timesheetEntry.getApprovalStatus().equals("Pending"))
                .collect(Collectors.toList());
        return timesheetEntries;
    }
}
