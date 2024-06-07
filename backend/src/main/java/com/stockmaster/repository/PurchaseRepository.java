package com.stockmaster.repository;

import com.stockmaster.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByDateBetween(Date from, Date to);

    List<Purchase> findByDate(Date date);
}