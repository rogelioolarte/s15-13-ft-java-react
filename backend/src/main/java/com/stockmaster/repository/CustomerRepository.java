package com.stockmaster.repository;

import com.stockmaster.entity.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query(value = "SELECT * FROM customer WHERE name LIKE %?1%", nativeQuery = true)
    List<Customer> searchProjectByName(String searchTerm);
    @Query(value = "SELECT * FROM customer WHERE personalcode LIKE %?1%", nativeQuery = true)
    List<Customer> searchProjectByPersonalCode(String searchTerm);
}
