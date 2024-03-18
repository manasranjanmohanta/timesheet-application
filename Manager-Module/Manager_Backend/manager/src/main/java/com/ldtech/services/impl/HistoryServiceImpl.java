package com.ldtech.services.impl;

import com.ldtech.dtos.DateRangeDTO;
import com.ldtech.entities.TimesheetEntry;
import com.ldtech.payloads.HistoryResponse;
import com.ldtech.repositories.TimesheetEntryRepository;
import com.ldtech.services.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoryServiceImpl implements HistoryService {

    @Autowired
    private TimesheetEntryRepository timesheetEntryRepository;

    @Override
    public List<HistoryResponse> getAllHistory() {
        LocalDate currentDate = LocalDate.now();
        // Find the start and end dates of the current week
//        LocalDate startDate = currentDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
//        LocalDate endDate = startDate.plusDays(4);
        LocalDate startDate = currentDate;
        LocalDate endDate = currentDate;
        List<TimesheetEntry> histories = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> historyList = timesheetEntryRepository.findByLogDate(date);
            histories.addAll(historyList);

        }

// Filter the histories list based on the status "Pending"
        histories = histories.stream()
                .filter(timesheetEntry -> !timesheetEntry.getApprovalStatus().equals("Pending"))
                .collect(Collectors.toList());


        List<HistoryResponse> historyResponses = histories.stream().map(this::mapToHistoryResponse).collect(Collectors.toList());

        return historyResponses;
    }

    @Override
    public List<HistoryResponse> getAllHistoryWithRangedDate(DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();

        List<TimesheetEntry> histories = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> historyList = timesheetEntryRepository.findByLogDate(date);
            histories.addAll(historyList);

        }
        List<HistoryResponse> historyResponses = histories.stream().map(this::mapToHistoryResponse).collect(Collectors.toList());

        return historyResponses;
    }

    @Override
    public List<HistoryResponse> getAllHistoryByEmployeeId(String employeeId, DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();

        List<TimesheetEntry> histories = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> historyList = timesheetEntryRepository.findByIdEmployeeIdAndIdLogDate(employeeId, date);

            histories.addAll(historyList);

        }

        histories = histories.stream()
                .filter(timesheetEntry -> !timesheetEntry.getApprovalStatus().equals("Pending"))
                .collect(Collectors.toList());
        List<HistoryResponse> historyResponses = histories.stream().map(this::mapToHistoryResponse).collect(Collectors.toList());

        return historyResponses;
    }

    @Override
    public List<HistoryResponse> getAllHistoryByEmployeeName(String employeeName, DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();

        List<TimesheetEntry> histories = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> historyList = timesheetEntryRepository.findByEmployeeEmployeeNameAndIdLogDate(employeeName, date);

            histories.addAll(historyList);

        }

        histories = histories.stream()
                .filter(timesheetEntry -> !timesheetEntry.getApprovalStatus().equals("Pending"))
                .collect(Collectors.toList());
        List<HistoryResponse> historyResponses = histories.stream().map(this::mapToHistoryResponse).collect(Collectors.toList());


        return historyResponses;
    }

    @Override
    public List<HistoryResponse> getAllHistoryByApprovalStatus(String approvalStatus, DateRangeDTO dateRangeDTO) {
        LocalDate startDate = dateRangeDTO.getStartDate();
        LocalDate endDate = dateRangeDTO.getEndDate();

        List<TimesheetEntry> histories = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> historyList = timesheetEntryRepository.findByApprovalStatusAndIdLogDate(approvalStatus, date);

            histories.addAll(historyList);

        }
        histories = histories.stream()
                .filter(timesheetEntry -> !timesheetEntry.getApprovalStatus().equals("Pending"))
                .collect(Collectors.toList());
        List<HistoryResponse> historyResponses = histories.stream().map(this::mapToHistoryResponse).collect(Collectors.toList());

        return historyResponses;
    }

    private HistoryResponse mapToHistoryResponse(TimesheetEntry history) {
        HistoryResponse response = new HistoryResponse();
        response.setEmployeeId(history.getId().getEmployeeId());
        response.setEmployeeName(history.getEmployee().getEmployeeName());
        response.setLogDate(history.getId().getLogDate());
        response.setApprovalStatus(history.getApprovalStatus());
        response.setProjectName(history.getProject().getProjectName());

        if(history.getModifiedDate() == null){
            response.setModifiedDate(history.getId().getLogDate());
        }

        return response;
    }
}
