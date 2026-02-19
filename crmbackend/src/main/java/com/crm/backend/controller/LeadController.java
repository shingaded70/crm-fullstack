package com.crm.backend.controller;

import com.crm.backend.model.Lead;
import com.crm.backend.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "*")
public class LeadController {

    @Autowired
    private LeadRepository repository;

    @GetMapping
    public List<Lead> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Lead create(@RequestBody Lead lead) {
        return repository.save(lead);
    }

    @PutMapping("/{id}")
    public Lead update(@PathVariable Long id,
                       @RequestBody Lead lead) {
        lead.setId(id);
        return repository.save(lead);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
