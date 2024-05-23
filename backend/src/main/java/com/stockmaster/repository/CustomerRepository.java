package com.stockmaster.repository;

import com.stockmaster.entity.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query(value = "SELECT * FROM customer WHERE name LIKE %?1%", nativeQuery = true)
    List<Customer> searchProjectByName(@Param("searchTerm") String searchTerm);
    @Query(value = "SELECT * FROM customer WHERE personalcode LIKE %?1%", nativeQuery = true)
    List<Customer> searchProjectByPersonalCode(@Param("searchTerm") String searchTerm);
}
