package com.crm.backend.repository;

import com.crm.backend.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository
        extends JpaRepository<Sale, Long> {
}
