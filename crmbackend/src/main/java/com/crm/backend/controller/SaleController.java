package com.crm.backend.controller;

import com.crm.backend.model.Sale;
import com.crm.backend.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*")
public class SaleController {

    @Autowired
    private SaleRepository repository;

    @GetMapping
    public List<Sale> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Sale create(@RequestBody Sale sale) {
        return repository.save(sale);
    }

    @PutMapping("/{id}")
    public Sale update(@PathVariable Long id,
                       @RequestBody Sale sale) {
        sale.setId(id);
        return repository.save(sale);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
