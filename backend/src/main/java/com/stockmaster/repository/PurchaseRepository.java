package com.stockmaster.repository;

import com.stockmaster.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByDateBetween(Date from, Date to);

    List<Purchase> findByDate(Date date);
}