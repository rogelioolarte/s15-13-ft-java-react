package com.stockmaster.controller;

import com.stockmaster.dto.Purchase.DtoPurchaseResponse;
import com.stockmaster.service.PurchaseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

            return ResponseEntity.status(HttpStatus.CREATED).body(purchaseService.MakeAPurchase(dtoPurchaseResponse));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error! purchase not created"+e.getMessage());
        }
    }
}
