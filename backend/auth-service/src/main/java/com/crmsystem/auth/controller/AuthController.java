package com.crmsystem.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, maxAge = 3600, allowCredentials = "true")
public class AuthController {

    // Login endpoint with admin role support
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");
        
        // Check for admin credentials
        boolean isAdmin = "admin".equalsIgnoreCase(username) && "admin123".equals(password);
        
        // Mock response for successful login
        Map<String, Object> response = new HashMap<>();
        response.put("token", "mock-jwt-token-for-testing" + (isAdmin ? "-admin" : ""));
        response.put("type", "Bearer");
        response.put("id", 1L);
        response.put("username", username);
        response.put("email", username + "@example.com");
        
        // Set proper roles based on user type
        if (isAdmin) {
            response.put("roles", List.of("ROLE_ADMIN", "ROLE_USER"));
        } else {
            response.put("roles", List.of("ROLE_USER"));
        }
        
        return ResponseEntity.ok(response);
    }
    
    // Simple register endpoint that always returns success
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> registerRequest) {
        // Mock response for successful registration
        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully!");
        
        return ResponseEntity.ok(response);
    }
    
    // Status endpoint to test if the service is running
    @GetMapping("/status")
    public ResponseEntity<?> status() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "Auth service is running");
        response.put("allowedOrigins", List.of("http://localhost:5173", "http://localhost:5174"));
        response.put("adminCredentials", Map.of(
            "username", "admin",
            "password", "admin123"
        ));
        
        return ResponseEntity.ok(response);
    }
} 