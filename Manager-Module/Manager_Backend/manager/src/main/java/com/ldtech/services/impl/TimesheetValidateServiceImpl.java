package com.ldtech.services.impl;

import com.ldtech.entities.ActivityAllocation;
import com.ldtech.entities.DoorLoginInfo;
import com.ldtech.entities.DoorLoginInfoId;
import com.ldtech.entities.TimesheetEntry;
import com.ldtech.payloads.ProjectInfos;
import com.ldtech.payloads.TimesheetInfo;
import com.ldtech.payloads.TimesheetRequest;
import com.ldtech.payloads.TimesheetResponse;
import com.ldtech.repositories.ActivityAllocationRepository;
import com.ldtech.repositories.DoorLoginInfoRepository;
import com.ldtech.repositories.TimesheetEntryRepository;
import com.ldtech.services.TimesheetValidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TimesheetValidateServiceImpl implements TimesheetValidateService {

    @Autowired
    private TimesheetEntryRepository timesheetEntryRepository;

    @Autowired
    private DoorLoginInfoRepository doorLoginInfoRepository;

    @Autowired
    private ActivityAllocationRepository activityAllocationRepository;

    @Override
    public TimesheetResponse getTimesheetEntryByEmployeeIdAndLogDate(String employeeId, LocalDate logDate) {
        List<TimesheetEntry> timesheetEntry = timesheetEntryRepository.findByIdEmployeeIdAndIdLogDate(employeeId, logDate);

        TimesheetResponse timesheetResponse = new TimesheetResponse();
        timesheetResponse.setEmployeeId(timesheetEntry.get(0).getEmployee().getEmployeeId());
        timesheetResponse.setEmployeeName(timesheetEntry.get(0).getEmployee().getEmployeeName());
        timesheetResponse.setReportingManager(timesheetEntry.get(0).getProject().getProjectManager());

        // getting the data by logdate
        DoorLoginInfoId id = new DoorLoginInfoId();
        id.setEmployeeId(employeeId);
        id.setLogDate(logDate);
        DoorLoginInfo doorLoginInfo = doorLoginInfoRepository.findById(id).orElse(null);

        timesheetResponse.setLogDate(doorLoginInfo.getId().getLogDate());
        timesheetResponse.setLoginTime(doorLoginInfo.getLoginTime());
        timesheetResponse.setLogoutTime(doorLoginInfo.getLogoutTime());

        List<ProjectInfos> projectInfos = new ArrayList<>();
        for (TimesheetEntry entry : timesheetEntry){
            ProjectInfos project = new ProjectInfos();
            project.setProjectName(entry.getProject().getProjectName());

            LocalDate logDate1 = entry.getId().getLogDate();
            String projectId1 = entry.getProject().getProjectId();
            String activityType1 = entry.getId().getActivityType();
            ActivityAllocation activityAllocation = activityAllocationRepository.findByIdEmployeeIdAndIdProjectIdAndIdActivityTypeAndIdActivityStartDate(employeeId, projectId1, activityType1, logDate1);
//            project.setProjectType(activityAllocation.getId().getProjectType());

            project.setActivityType(entry.getId().getActivityType());
            project.setStartTime(entry.getId().getStartTime());
            project.setEndTime(entry.getEndTime());
            project.setDescription(entry.getDescription());
            project.setRemark(entry.getRemark());

            projectInfos.add(project);

        }
        timesheetResponse.setProject(projectInfos);
        timesheetResponse.setApprovalStatus(timesheetEntry.get(0).getApprovalStatus());

        return timesheetResponse;
    }

    @Override
    public void validateTimesheet(TimesheetRequest timesheetRequest) {
        List<TimesheetEntry> timesheetEntryList = timesheetEntryRepository.findByIdEmployeeIdAndIdLogDate(timesheetRequest.getEmployeeId(), timesheetRequest.getLogDate());

        for (TimesheetEntry timesheetEntry : timesheetEntryList) {
            for (TimesheetInfo info : timesheetRequest.getTimesheetInfoList()) {
                if (timesheetEntry.getId().getLogDate().equals(timesheetRequest.getLogDate()) &&
                        timesheetEntry.getId().getStartTime().equals(info.getStartTime())) {

                    timesheetEntry.setRemark(info.getRemark());
                    timesheetEntry.setApprovalStatus(timesheetRequest.getApprovalStatus());
                }
            }

            // get the current date
            LocalDate currentDate = LocalDate.now();
            timesheetEntry.setModifiedDate(currentDate);
            // Save the timesheetEntry after all updates are done
            timesheetEntryRepository.save(timesheetEntry);
        }
    }

}
