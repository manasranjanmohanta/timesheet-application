package com.ldtech.services.impl;

import com.ldtech.entities.Employee;
import com.ldtech.entities.TimesheetEntry;
import com.ldtech.repositories.TimesheetEntryRepository;
import com.ldtech.services.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HomeServiceImpl implements HomeService {

    @Autowired
    private TimesheetEntryRepository timesheetEntryRepository;

    @Override
    public int searchByStatus(String approvalStatus) {
        LocalDate endDate = LocalDate.now();

        LocalDate startDate = endDate.with(TemporalAdjusters.previous(DayOfWeek.MONDAY));

        List<TimesheetEntry> entries = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<TimesheetEntry> timesheetEntries = timesheetEntryRepository.findByLogDate(date);

            List<TimesheetEntry> entryList = timesheetEntries.stream().filter(timesheetEntry -> timesheetEntry.getApprovalStatus().equals(approvalStatus)).collect(Collectors.toList());
            entries.addAll(entryList);
        }
        long count = entries.stream().count();
        System.out.println(count);
        return (int)count;
    }
}
