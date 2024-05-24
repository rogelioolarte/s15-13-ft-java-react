package com.stockmaster.repository;

import com.stockmaster.entity.Taxes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface TaxesRepository extends JpaRepository<Taxes, Long> {
}
