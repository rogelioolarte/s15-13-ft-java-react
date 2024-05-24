package com.stockmaster.service.customer;

import com.stockmaster.dto.customer.CustomerResponse;
import com.stockmaster.dto.customer.CustomerSavingRequest;
import com.stockmaster.dto.customer.CustomerUpdateRequest;
import com.stockmaster.entity.customer.Customer;
import com.stockmaster.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
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
            throw new IllegalArgumentException("El Id es invalido o inexistente.");
        }

        Optional<Customer> customerOptional = customerRepository.findById(customerId);

        return customerOptional.orElseThrow(() -> new RuntimeException("No se encontró ningún Customer con el ID: " + customerId));
    }

    public CustomerResponse save(CustomerSavingRequest customerSavingRequest){
        Customer customer = customerMapper.customerRequestToPost(customerSavingRequest);
        return customerMapper.toCustomerResponse(customerRepository.save(customer));
    }
    public void delete(Long id){customerRepository.deleteById(id);}//el delete es logico, tiene que ser un patch
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
        return customerMapper.toCustomerResponse(customerRepository.save(customer));
    }

    public List<Customer> searchCustomerByName(String searchTerm) {
        return customerRepository.searchProjectByName(searchTerm);
    }

    public List<Customer> searchCustomerByPersonalCode(String searchTerm) {
        return customerRepository.searchProjectByPersonalCode(searchTerm);
    }
}

