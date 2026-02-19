package com.crm.backend.repository;

import com.crm.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository
        extends JpaRepository<Task, Long> {
}
