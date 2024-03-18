package com.ldtech.repositories;

import com.ldtech.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, String> {
    List<Project> findProjectsByProjectManager(String projectManager);

    Optional<Project> findByProjectName(String projectName);
    // You can add custom query methods here if needed
}
