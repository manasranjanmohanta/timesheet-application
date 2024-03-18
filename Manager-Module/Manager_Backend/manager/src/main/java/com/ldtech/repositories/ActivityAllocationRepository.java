package com.ldtech.repositories;

import com.ldtech.entities.ActivityAllocation;
import com.ldtech.entities.ActivityAllocationId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;

public interface ActivityAllocationRepository extends JpaRepository<ActivityAllocation, ActivityAllocationId> {

    ActivityAllocation findByIdEmployeeIdAndIdProjectIdAndIdActivityTypeAndIdActivityStartDate(String employeeId, String projectId1, String activityType1, LocalDate logDate1);
    // You can add custom query methods here if needed
}