package com.crmsystem.customer.service.impl;

import com.crmsystem.customer.dto.CustomerDTO;
import com.crmsystem.customer.exception.ResourceNotFoundException;
import com.crmsystem.customer.mapper.CustomerMapper;
import com.crmsystem.customer.model.Customer;
import com.crmsystem.customer.model.Customer.CustomerStatus;
import com.crmsystem.customer.repository.CustomerRepository;
import com.crmsystem.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    @Override
    @Transactional
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        log.info("Creating new customer: {}", customerDTO.getEmail());
        Customer customer = customerMapper.toEntity(customerDTO);
        
        // Set default status if not provided
        if (customer.getStatus() == null) {
            customer.setStatus(CustomerStatus.LEAD);
        }
        
        Customer savedCustomer = customerRepository.save(customer);
        return customerMapper.toDTO(savedCustomer);
    }

    @Override
    @Cacheable(value = "customerCache", key = "#id")
    public CustomerDTO getCustomerById(Long id) {
        log.info("Fetching customer with ID: {}", id);
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
        return customerMapper.toDTO(customer);
    }

    @Override
    @Transactional
    @CacheEvict(value = "customerCache", key = "#id")
    public CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO) {
        log.info("Updating customer with ID: {}", id);
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
        
        customerMapper.updateEntityFromDTO(customerDTO, existingCustomer);
        Customer updatedCustomer = customerRepository.save(existingCustomer);
        return customerMapper.toDTO(updatedCustomer);
    }

    @Override
    @Transactional
    @CacheEvict(value = "customerCache", key = "#id")
    public void deleteCustomer(Long id) {
        log.info("Deleting customer with ID: {}", id);
        if (!customerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Customer not found with id: " + id);
        }
        customerRepository.deleteById(id);
    }

    @Override
    public Page<CustomerDTO> getAllCustomers(Pageable pageable) {
        log.info("Fetching all customers with pagination");
        Page<Customer> customersPage = customerRepository.findAll(pageable);
        return customersPage.map(customerMapper::toDTO);
    }

    @Override
    public List<CustomerDTO> getCustomersByStatus(CustomerStatus status) {
        log.info("Fetching customers by status: {}", status);
        List<Customer> customers = customerRepository.findByStatus(status);
        return customerMapper.toDTOList(customers);
    }

    @Override
    public Page<CustomerDTO> getCustomersByAssignedUser(Long userId, Pageable pageable) {
        log.info("Fetching customers assigned to user ID: {}", userId);
        Page<Customer> customersPage = customerRepository.findByAssignedUserId(userId, pageable);
        return customersPage.map(customerMapper::toDTO);
    }

    @Override
    public Page<CustomerDTO> searchCustomers(String searchTerm, Pageable pageable) {
        log.info("Searching customers with term: {}", searchTerm);
        Page<Customer> customersPage = customerRepository.searchCustomers(searchTerm, pageable);
        return customersPage.map(customerMapper::toDTO);
    }

    @Override
    public boolean existsByEmail(String email) {
        return customerRepository.findByEmail(email).isPresent();
    }

    @Override
    @Cacheable(value = "customerStatusCache")
    public Map<CustomerStatus, Long> getCustomerStatusCounts() {
        log.info("Getting customer status counts");
        Map<CustomerStatus, Long> statusCounts = new HashMap<>();
        
        Arrays.stream(CustomerStatus.values()).forEach(status -> {
            Long count = customerRepository.countByStatus(status);
            statusCounts.put(status, count);
        });
        
        return statusCounts;
    }
} 