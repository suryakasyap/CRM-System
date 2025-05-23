# CRM System Backend

## Overview
This is a microservices-based CRM system backend built with Spring Boot.

## Services

### API Gateway
Centralized entry point for all API requests. Routes requests to appropriate microservices.

### Auth Service
Handles user authentication and authorization using JWT tokens.

### Customer Service
Manages customer data and operations.

## Setup Instructions

1. Clone the repository
2. Configure application.properties files in each service
   - Copy application.properties.example files and rename to application.properties
   - Update database credentials and other settings as needed
3. Build the project:
   `ash
   ./mvnw clean install
   ``n4. Run the services:
   `ash
   ./startbackend.bat
   ``n
## Technologies
- Spring Boot
- Spring Cloud Gateway
- Spring Security
- Spring Data JPA
- JWT Authentication
- Eureka Service Discovery

## Requirements
- Java 17+
- Maven
- MySQL
