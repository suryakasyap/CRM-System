package com.crmsystem.customer.mapper;

import com.crmsystem.customer.dto.CustomerDTO;
import com.crmsystem.customer.model.Customer;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomerMapper {

    public CustomerDTO toDTO(Customer customer) {
        if (customer == null) {
            return null;
        }
        
        return CustomerDTO.builder()
                .id(customer.getId())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .company(customer.getCompany())
                .status(customer.getStatus())
                .notes(customer.getNotes())
                .createdAt(customer.getCreatedAt())
                .updatedAt(customer.getUpdatedAt())
                .assignedUserId(customer.getAssignedUserId())
                .build();
    }

    public Customer toEntity(CustomerDTO customerDTO) {
        if (customerDTO == null) {
            return null;
        }
        
        return Customer.builder()
                .id(customerDTO.getId())
                .firstName(customerDTO.getFirstName())
                .lastName(customerDTO.getLastName())
                .email(customerDTO.getEmail())
                .phone(customerDTO.getPhone())
                .company(customerDTO.getCompany())
                .status(customerDTO.getStatus())
                .notes(customerDTO.getNotes())
                .assignedUserId(customerDTO.getAssignedUserId())
                .build();
    }

    public List<CustomerDTO> toDTOList(List<Customer> customers) {
        return customers.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public void updateEntityFromDTO(CustomerDTO dto, Customer entity) {
        if (dto.getFirstName() != null) entity.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) entity.setLastName(dto.getLastName());
        if (dto.getEmail() != null) entity.setEmail(dto.getEmail());
        if (dto.getPhone() != null) entity.setPhone(dto.getPhone());
        if (dto.getCompany() != null) entity.setCompany(dto.getCompany());
        if (dto.getStatus() != null) entity.setStatus(dto.getStatus());
        if (dto.getNotes() != null) entity.setNotes(dto.getNotes());
        if (dto.getAssignedUserId() != null) entity.setAssignedUserId(dto.getAssignedUserId());
    }
}