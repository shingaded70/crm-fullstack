package com.crm.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Key;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private static final String SECRET =
        "mysecretkeymysecretkeymysecretkey12";

    private final Key key =
        Keys.hmacShaKeyFor(SECRET.getBytes());

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader =
            request.getHeader("Authorization");

        if (authHeader != null &&
            authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            try {
                Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(token);

            } catch (JwtException e) {
                response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
