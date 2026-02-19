package com.crm.backend.repository;

import com.crm.backend.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRepository
        extends JpaRepository<Lead, Long> {
}
