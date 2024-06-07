package com.stockmaster.service.customer;

import com.stockmaster.dto.customer.CustomerResponse;
import com.stockmaster.dto.customer.CustomerSavingRequest;
import com.stockmaster.entity.customer.Customer;
import org.springframework.stereotype.Service;

@Service
public class CustomerMapper {

    public CustomerResponse toCustomerResponse(Customer customer){
        if(customer == null){
            throw new NullPointerException("Customer cant be null");
        }
        return CustomerResponse.builder()
                .id(customer.getId())
                .name(customer.getName())
                .personalCode(customer.getPersonalCode())
                .customerType(customer.getCustomerType())
                .active(customer.isActive())
                .build();
    }

    public Customer customerRequestToPost(CustomerSavingRequest customer){
        if(customer == null){
            throw new NullPointerException("Customer cant be null");
        }
        return Customer.builder()
                .name(customer.getName())
                .personalCode(customer.getPersonalCode())
                .customerType(customer.getCustomerType())
                .build();
    }
}
