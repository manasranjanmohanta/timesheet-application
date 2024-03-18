package com.ldtech.repositories;

import com.ldtech.entities.Employee;
import com.ldtech.entities.TimesheetEntry;
import com.ldtech.entities.TimesheetEntryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TimesheetEntryRepository extends JpaRepository<TimesheetEntry, TimesheetEntryId> {
//    @Query("SELECT DISTINCT te.employee FROM TimesheetEntry te WHERE te.id.logDate = :logDate")
//    List<Employee> findEmployeesByLogDate(LocalDate logDate);
    @Query("SELECT te FROM TimesheetEntry te WHERE te.id.logDate = :logDate")
    List<TimesheetEntry> findByLogDate(@Param("logDate") LocalDate logDate);

    List<TimesheetEntry> findByEmployeeEmployeeNameAndIdLogDate(String employeeName, LocalDate logDate);

    List<TimesheetEntry> findByProjectClientAndIdLogDate(String client, LocalDate date);

    List<TimesheetEntry> findByEmployeeDepartmentAndIdLogDate(String department, LocalDate date);

    List<TimesheetEntry> findByEmployeeEmployeeIdAndIdLogDate(String employeeId, LocalDate date);

    List<TimesheetEntry> findByIdEmployeeId(String employeeId);

    List<TimesheetEntry> findByIdEmployeeIdAndIdLogDate(String employeeId, LocalDate logDate);

    List<TimesheetEntry> findByApprovalStatusAndIdLogDate(String approvalStatus, LocalDate date);


    // You can add custom query methods here if needed
}