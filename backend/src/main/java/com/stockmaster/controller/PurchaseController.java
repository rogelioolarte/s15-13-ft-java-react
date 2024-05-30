package com.stockmaster.controller;

import com.stockmaster.dto.Purchase.PurchaseDatesDTO;
import com.stockmaster.dto.Purchase.PurchaseRequestDTO;
import com.stockmaster.dto.Purchase.PurchaseResponseDTO;
import com.stockmaster.dto.Purchase.PurchaseSearchDTO;
import com.stockmaster.service.PurchaseService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping
    @Operation(summary = "Create a new purchase")
    public PurchaseResponseDTO createPurchase(@RequestBody PurchaseRequestDTO requestDTO) {
        return purchaseService.createPurchase(requestDTO);
    }

    @GetMapping("/search")
    @Operation(summary = "Search purchases by date")
    public List<PurchaseDatesDTO> searchPurchasesByDate(@RequestBody PurchaseSearchDTO searchDTO) {
        return purchaseService.searchPurchasesByDate(searchDTO);
    }

    @GetMapping("/date")
    @Operation(summary = "Get purchases by specific date")
    public List<PurchaseResponseDTO> getPurchasesByDate(@Parameter(description = "Date to filter purchases") @RequestParam Date date) {
        return purchaseService.getPurchasesByDate(date);
    }
}