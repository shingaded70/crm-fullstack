package com.crm.backend.security;

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/test").permitAll()
            .requestMatchers("/api/customers/**").permitAll()
            .requestMatchers("/api/leads/**").permitAll()
            .requestMatchers("/api/tasks/**").permitAll()
            .requestMatchers("/api/sales/**").permitAll()
            .anyRequest().authenticated();

        return http.build();
    }
}
