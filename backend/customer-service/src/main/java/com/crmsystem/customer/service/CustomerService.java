package com.crmsystem.customer.service;

import com.crmsystem.customer.dto.CustomerDTO;
import com.crmsystem.customer.model.Customer.CustomerStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface CustomerService {
    
    CustomerDTO createCustomer(CustomerDTO customerDTO);
    
    CustomerDTO getCustomerById(Long id);
    
    CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO);
    
    void deleteCustomer(Long id);
    
    Page<CustomerDTO> getAllCustomers(Pageable pageable);
    
    List<CustomerDTO> getCustomersByStatus(CustomerStatus status);
    
    Page<CustomerDTO> getCustomersByAssignedUser(Long userId, Pageable pageable);
    
    Page<CustomerDTO> searchCustomers(String searchTerm, Pageable pageable);
    
    boolean existsByEmail(String email);
    
    Map<CustomerStatus, Long> getCustomerStatusCounts();
} 