package com.ldtech.services.impl;

import com.ldtech.dtos.DateRangeDTO;
import com.ldtech.entities.Employee;
import com.ldtech.entities.TimesheetEntry;
import com.ldtech.payloads.EmployeeDashboardResponse;
import com.ldtech.repositories.TimesheetEntryRepository;
import com.ldtech.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private TimesheetEntryRepository timesheetEntryRepository;
    @Override
    public List<EmployeeDashboardResponse> getDashboard() {
        LocalDate currentDate = LocalDate.now();
        // Find the start and end dates of the current week
        LocalDate startDate = currentDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endDate = startDate.plusDays(4);

        List<TimesheetEntry> employeeList = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> timesheetEntries = timesheetEntryRepository.findByLogDate(date);
//            List<TimesheetEntry> pending = timesheetEntries.stream().filter(timesheetEntry -> timesheetEntry.getApprovalStatus().equals("Pending")).collect(Collectors.toList());
//            employeeList.addAll(pending);
            employeeList.addAll(timesheetEntries);

        }

        List<EmployeeDashboardResponse> responses = employeeList.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return responses;
    }

    @Override
    public List<EmployeeDashboardResponse> searchByEmployeeId(String employeeId, DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();

        List<TimesheetEntry> employeeList = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> timesheetEntries = timesheetEntryRepository.findByLogDate(date);
            List<TimesheetEntry> entryList = timesheetEntries.stream().filter(timesheetEntry -> timesheetEntry.getId().getEmployeeId().equals(employeeId)).collect(Collectors.toList());
            employeeList.addAll(entryList);

        }
        List<EmployeeDashboardResponse> responses = employeeList.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return responses;
    }

    @Override
    public List<EmployeeDashboardResponse> searchByEmployeeName(String employeeName, DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();

        List<TimesheetEntry> employeeList = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> entryList = timesheetEntryRepository.findByEmployeeEmployeeNameAndIdLogDate(employeeName, date);
            employeeList.addAll(entryList);

        }
        List<EmployeeDashboardResponse> responses = employeeList.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return responses;
    }

    @Override
    public List<EmployeeDashboardResponse> searchByStatus(String approvalStatus, DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();

        List<TimesheetEntry> employeeList = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> timesheetEntries = timesheetEntryRepository.findByLogDate(date);
            List<TimesheetEntry> entryList = timesheetEntries.stream().filter(timesheetEntry -> timesheetEntry.getApprovalStatus().equals(approvalStatus)).collect(Collectors.toList());
            employeeList.addAll(entryList);

        }
        List<EmployeeDashboardResponse> responses = employeeList.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return responses;
    }

    @Override
    public List<EmployeeDashboardResponse> searchByClient(String client, DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();

        List<TimesheetEntry> employeeList = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> entryList = timesheetEntryRepository.findByProjectClientAndIdLogDate(client, date);
            employeeList.addAll(entryList);

        }
        List<EmployeeDashboardResponse> responses = employeeList.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return responses;
    }

    @Override
    public List<EmployeeDashboardResponse> searchByDepartment(String department, DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();

        List<TimesheetEntry> employeeList = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> entryList = timesheetEntryRepository.findByEmployeeDepartmentAndIdLogDate(department, date);
            employeeList.addAll(entryList);

        }
        List<EmployeeDashboardResponse> responses = employeeList.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        return responses;
    }

    private EmployeeDashboardResponse mapToDTO(TimesheetEntry entry){
        EmployeeDashboardResponse response =  new EmployeeDashboardResponse();
        response.setLogDate(entry.getId().getLogDate());
        response.setEmployeeId(entry.getId().getEmployeeId());
        response.setEmployeeName(entry.getEmployee().getEmployeeName());
        response.setProjectName(entry.getProject().getProjectName());
        response.setDepartment(entry.getEmployee().getDepartment());
        response.setClient(entry.getProject().getClient());
        response.setApprovalStatus(entry.getApprovalStatus());
        return response;
    }
}
