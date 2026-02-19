package com.crm.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "*")
public class TestController {

    @GetMapping("/api/test")
    public String test() {
        return "Backend Connected Successfully";
    }
}
