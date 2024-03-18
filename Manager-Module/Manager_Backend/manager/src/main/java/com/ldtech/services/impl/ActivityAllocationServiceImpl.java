package com.ldtech.services.impl;

import com.ldtech.entities.ActivityAllocation;
import com.ldtech.entities.ActivityAllocationId;
import com.ldtech.entities.Employee;
import com.ldtech.entities.Project;
import com.ldtech.exceptions.ResourceCreationException;
import com.ldtech.exceptions.ResourceNotFoundException;
import com.ldtech.exceptions.ResourceRetrivalException;
import com.ldtech.payloads.ActivityRequest;
import com.ldtech.payloads.AllocateData;
import com.ldtech.payloads.EmployeeData;
import com.ldtech.repositories.ActivityAllocationRepository;
import com.ldtech.repositories.EmployeeRepository;
import com.ldtech.repositories.ProjectRepository;
import com.ldtech.services.ActivityAllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class    ActivityAllocationServiceImpl implements ActivityAllocationService {

    @Autowired
    private ActivityAllocationRepository activityAllocationRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public ActivityAllocation saveActivityAllocation(ActivityAllocation activityAllocation) {
        try {
            return activityAllocationRepository.save(activityAllocation);
        } catch (Exception e) {
            throw new ResourceCreationException("Failed to allocate activity to employee!", e);
        }
    }

    @Override
    public ActivityAllocation getActivityAllocationById(String projectId, String employeeId) {
        ActivityAllocationId id = new ActivityAllocationId();
        id.setProjectId(projectId);
        id.setEmployeeId(employeeId);
        return activityAllocationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Failed to find allocate activity for the employeeId" + employeeId));
    }
    @Override
    public List<ActivityAllocation> getAllActivityAllocations() {
        try {
            return activityAllocationRepository.findAll();
        } catch (Exception e) {
            throw new ResourceRetrivalException("Failed to retrieve allocated activities for the employees!!", e);
        }
    }


    @Override
    public EmployeeData searchEmployeeByEmployeeId(String employeeId) {
        // Check employee exist by employeeId or not
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee", "ID", employeeId));

        EmployeeData employeeData = new EmployeeData();
        employeeData.setEmployeeId(employee.getEmployeeId());
        employeeData.setEmployeeName(employee.getEmployeeName());

        return employeeData;
    }

    @Override
    public EmployeeData searchEmployeeByEmployeeName(String employeeName) {
        Employee employee = null;
        try {
            employee = employeeRepository.findByEmployeeName(employeeName);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Failed to find employee with employee name" + employeeName);
        }

        EmployeeData employeeData = new EmployeeData();
        employeeData.setEmployeeId(employee.getEmployeeId());
        employeeData.setEmployeeName(employee.getEmployeeName());

        return employeeData;
    }

    @Override
    public List<String> getAllProjectNames(String projectManager) {
        List<Project> projects = null;
        try {
            projects = projectRepository.findProjectsByProjectManager(projectManager);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Failed to find projects by Project Manager!");
        }
        return projects.stream()
                .map(Project::getProjectName)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public boolean allocateActivity(ActivityRequest activityRequest) {
//        System.out.println(activityRequest.getAllocateData());
        try {
            for (AllocateData allocateData : activityRequest.getAllocateData()) {
                ActivityAllocation activityAllocation = new ActivityAllocation();
//                ActivityAllocationId activityAllocationId = getActivityAllocationId(activityRequest, allocateData);
                ActivityAllocationId activityAllocationId = new ActivityAllocationId();
                activityAllocationId.setEmployeeId(activityRequest.getEmployeeId());

                // Find projectId from projectName
                Optional<Project> optionalProject = projectRepository.findByProjectName(allocateData.getProjectName());
                if (optionalProject.isPresent()) {
                    Project project = optionalProject.get();
                    activityAllocationId.setProjectId(project.getProjectId());
                } else {
                    // Handle case where project is not found for the given projectName
                    // You can throw an exception or handle it according to your application's logic
                    // For example:
                    throw new IllegalArgumentException("Project not found for projectName: " + allocateData.getProjectName());
                }

//                activityAllocationId.setProjectType(allocateData.getProjectType());
                activityAllocationId.setActivityType(allocateData.getActivityType());
                activityAllocationId.setActivityStartDate(allocateData.getActivityStartDate());

                activityAllocation.setId(activityAllocationId);
//                activityAllocation.setActivityAllocationDate(activityRequest.getActivityAllocationDate());
                activityAllocation.setActivityEndDate(allocateData.getActivityEndDate());

                activityAllocationRepository.save(activityAllocation);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace(); // Handle the exception appropriately

            return false;
        }
    }

//    private static ActivityAllocationId getActivityAllocationId(ActivityRequest activityRequest, AllocateData allocateData) {
//        ActivityAllocationId activityAllocationId = new ActivityAllocationId();
//        activityAllocationId.setEmployeeId(activityRequest.getEmployeeId());
// Find projectId from projectName
//        Optional<Project> optionalProject = projectRepository.findByProjectName(allocateData.getProjectName());
//                        if (optionalProject.isPresent()) {
//                Project project = optionalProject.get();
//                activityAllocationId.setProjectId(project.getProjectId());
//            } else {
//                // Handle case where project is not found for the given projectName
//                // You can throw an exception or handle it according to your application's logic
//                // For example:
//                throw new IllegalArgumentException("Project not found for projectName: " + allocateData.getProjectName());
//            }
//        activityAllocationId.setProjectType(allocateData.getProjectType());
//        activityAllocationId.setActivityType(allocateData.getActivityType());
//        activityAllocationId.setActivityStartTime(allocateData.getActivityStartTime());
//        return activityAllocationId;
//    }

}
