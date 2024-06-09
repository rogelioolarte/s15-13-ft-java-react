package com.stockmaster.repository;

import com.stockmaster.entity.Taxes;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TaxesRepository extends JpaRepository<Taxes, Long> {

}
