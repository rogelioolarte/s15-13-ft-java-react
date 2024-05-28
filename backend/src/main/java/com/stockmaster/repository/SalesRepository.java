package com.stockmaster.repository;

import com.stockmaster.entity.sales.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesRepository extends JpaRepository<Sales, Long> {



}
