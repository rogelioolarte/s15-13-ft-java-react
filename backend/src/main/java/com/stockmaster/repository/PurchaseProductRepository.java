package com.stockmaster.repository;

import com.stockmaster.entity.PurchaseProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface PurchaseProductRepository extends JpaRepository<PurchaseProduct, Long> {
}
