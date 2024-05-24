package com.stockmaster.service.customer;

import com.stockmaster.dto.customer.CustomerResponse;
import com.stockmaster.dto.customer.CustomerSavingRequest;
import com.stockmaster.dto.customer.CustomerUpdateRequest;
import com.stockmaster.entity.customer.Customer;
import com.stockmaster.exception.BusinessException;
import com.stockmaster.exception.RequestException;
import com.stockmaster.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    public Customer getCustomerById(Long customerId) {
        if (customerId == null || customerId == 0) {
            throw new RequestException("The Id is invalid or non-existent.");
        }
        Optional<Customer> customerOptional = customerRepository.findById(customerId);
        return customerOptional.orElseThrow(() -> new RequestException("No Customer was found with the ID: " + customerId));
    }
    public CustomerResponse save(CustomerSavingRequest customerSavingRequest){
        if (customerSavingRequest.getName() == null || customerSavingRequest.getName().isEmpty()) {
            throw new RequestException("The name is null or empty");
        } else if (customerSavingRequest.getPersonalCode() == null || customerSavingRequest.getPersonalCode().isEmpty()) {
            throw new RequestException("The personal code is null or empty");
        } else if (customerSavingRequest.getCustomerType() == null ) {
            throw new RequestException("The customer type is null or non-existent");
        }
        Customer customer = customerMapper.customerRequestToPost(customerSavingRequest);
        try {
            return customerMapper.toCustomerResponse(customerRepository.save(customer));
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().contains("Duplicate entry")) {
                throw new RequestException("Duplicate entry, the personal code is already registered");
            }
            throw new RequestException("An error occurred while saving the customer");
        }
    }
    public void delete(Long id) {
        if (id == null || id <= 0) {
            throw new RequestException("The Id is invalid or non-existent.");
        }else if (!customerRepository.existsById(id)) {
            throw new RequestException("No Customer was found with the ID: " + id);
        }
        customerRepository.deleteById(id);
    }
    public List<CustomerResponse>findByAll(){
        return customerRepository.findAll().stream()
                .map(customerMapper::toCustomerResponse).toList();
    }
    public CustomerResponse findByCustomerId(Long id){
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found."));
        return customerMapper.toCustomerResponse(customer);
    }

    public CustomerResponse update(CustomerUpdateRequest customerRequest) throws BadRequestException {
        Customer customer = customerRepository.findById(customerRequest.getId()).orElseThrow(() -> new RuntimeException("Customer id doesn´t exist.!."));
        customer.setName(customerRequest.getName());
        customer.setPersonalCode(customerRequest.getPersonalCode());
        return customerMapper.toCustomerResponse(customerRepository.save(customer));
    }

    public List<Customer> searchCustomerByName(String searchTerm) {
        return customerRepository.searchProjectByName(searchTerm);
    }

    public List<Customer> searchCustomerByPersonalCode(String searchTerm) {
        return customerRepository.searchProjectByPersonalCode(searchTerm);
    }
}

