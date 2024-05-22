package com.stockmaster.controller;

import com.stockmaster.dto.SaleDTO;
import com.stockmaster.entity.Sale;
import com.stockmaster.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @PostMapping
    public ResponseEntity<Sale> createSale(@RequestBody SaleDTO saleDTO) {
        Sale createdSale = saleService.createSale(saleDTO);
        return ResponseEntity.ok(createdSale);
    }
}