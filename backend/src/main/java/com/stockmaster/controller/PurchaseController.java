package com.stockmaster.controller;


import com.stockmaster.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import com.stockmaster.dto.Purchase.DtoPurchaseResponse;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/purchase")
@CrossOrigin("*")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;


    @PostMapping
    public ResponseEntity<?> createPurchase(@RequestBody @Valid DtoPurchaseResponse dtoPurchaseResponse) {
        try {
            var response = purchaseService.MakeAPurchase(dtoPurchaseResponse);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error! purchase not created" + e.getMessage());
        }
    }
}

