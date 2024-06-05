package com.stockmaster.repository;

import com.stockmaster.entity.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("SELECT c FROM Customer c WHERE c.active = true")
    List<Customer> findAllActive();
    @Query("SELECT c FROM Customer c WHERE c.id = :id AND c.active = true")
    Optional<Customer> findActiveById(@Param("id") Long id);

    @Query(value = "SELECT * FROM customer WHERE name LIKE %?1%", nativeQuery = true)
    List<Customer> searchProjectByName(@Param("searchTerm") String searchTerm);
    @Query(value = "SELECT * FROM customer WHERE personalcode LIKE %?1%", nativeQuery = true)
    List<Customer> searchProjectByPersonalCode(@Param("searchTerm") String searchTerm);

    Customer findByPersonalCode(String personalCode);

    @Query("SELECT c FROM Customer c WHERE c.name = :name AND c.active = false")
    Optional<Customer> findByName(String name);
}
