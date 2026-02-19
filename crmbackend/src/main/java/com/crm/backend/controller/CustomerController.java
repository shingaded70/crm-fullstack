package com.crm.backend.controller;

import com.crm.backend.model.Customer;
import com.crm.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerRepository repository;

    @GetMapping
    public List<Customer> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Customer create(@RequestBody Customer c) {
        return repository.save(c);
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable Long id,
                           @RequestBody Customer c) {
        c.setId(id);
        return repository.save(c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
