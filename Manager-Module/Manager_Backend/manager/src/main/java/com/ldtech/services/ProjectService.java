package com.ldtech.services;
import com.ldtech.entities.Project;

import java.util.List;

public interface ProjectService {
    Project saveProject(Project project);
    Project getProjectById(String projectId);
    List<Project> getAllProjects();
    void deleteProject(String projectId);
}

