package com.ldtech.repositories;

import com.ldtech.entities.EmployeeAllocation;
import com.ldtech.entities.EmployeeAllocationId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeAllocationRepository extends JpaRepository<EmployeeAllocation, EmployeeAllocationId> {
    // You can add custom query methods here if needed
}
