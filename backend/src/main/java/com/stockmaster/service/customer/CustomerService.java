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
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {
    @Lazy
    private final CustomerRepository customerRepository;
    @Lazy
    private final CustomerMapper customerMapper;

    //Metodos Get
    public List<CustomerResponse>findByAll(){
        List<Customer> customers = customerRepository.findAll();
        return customerRepository.findAll().stream()
                .map(customerMapper::toCustomerResponse).toList();
    }
    public CustomerResponse findByCustomerId(Long id){
        if (id == null || id == 0) {
            throw new RequestException("The Id is invalid.");
        }
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found."));
        return customerMapper.toCustomerResponse(customer);
    }
    //Save
    public CustomerResponse save(CustomerSavingRequest customerSavingRequest){
        if (customerSavingRequest.getName() == null || customerSavingRequest.getName().isEmpty()) {
            throw new RequestException("The name is null or empty");
        } else if (customerSavingRequest.getPersonalCode() == null || customerSavingRequest.getPersonalCode().isEmpty()) {
            throw new RequestException("The personal code is null or empty");
        } else if (customerSavingRequest.getCustomerType() == null ) {
            throw new RequestException("The customer type is null or non-existent");
        }
        Customer customer = customerMapper.customerRequestToPost(customerSavingRequest);
        customer.setActive(customerSavingRequest.isActive());
        try {
            return customerMapper.toCustomerResponse(customerRepository.save(customer));
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().contains("Duplicate entry")) {
                throw new RequestException("Duplicate entry, the personal code is already registered");
            }
            throw new RequestException("An error occurred while saving the customer");
        }
    }

    //Update
    public CustomerResponse update(CustomerUpdateRequest customerRequest) throws BadRequestException {
        Long id = customerRequest.getId();
        if (id == null || id <= 0) {
            throw new BadRequestException("Invalid customer ID.");
        }

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer id does not exist."));

        String name = customerRequest.getName();
        if (name == null || name.isEmpty()) {
            throw new BadRequestException("Name cannot be empty.");
        } else if (name.matches(".*[!@#$%^&*()_+=\\[\\]{};':\"\\\\|,.<>\\/?].*")) {
            throw new RequestException("Special characters are not allowed");
        }

        String personalCode = customerRequest.getPersonalCode();
        if (personalCode == null || personalCode.isEmpty()) {
            throw new BadRequestException("Personal code cannot be empty.");
        }
        Customer existingCustomerWithCode = customerRepository.findByPersonalCode(personalCode);
        if (existingCustomerWithCode != null && !existingCustomerWithCode.getId().equals(id)) {
            throw new BadRequestException("Personal code is already in use by another customer.");
        }

        customer.setName(name);
        customer.setPersonalCode(personalCode);
        customer.setActive(customerRequest.isActive());

        return customerMapper.toCustomerResponse(customerRepository.save(customer));
    }

    //Delete
    public void delete(Long id) {
        if (id == null || id <= 0) {
            throw new RequestException("The Id is invalid or non-existent.");        }

        Optional<Customer> customerOptional = customerRepository.findActiveById(id);
        if (!customerOptional.isPresent()) {
            throw new RequestException("No Customer was found with the ID: " + id);
        }
        Customer customer = customerOptional.get();
        customer.setActive(false);
        customerRepository.save(customer);
    }
    //SearchBy
    public List<Customer> searchCustomerByName(String searchTerm) {
        return customerRepository.searchProjectByName(searchTerm);
    }
    public List<Customer> searchCustomerByPersonalCode(String searchTerm) {
        return customerRepository.searchProjectByPersonalCode(searchTerm);
    }
}

