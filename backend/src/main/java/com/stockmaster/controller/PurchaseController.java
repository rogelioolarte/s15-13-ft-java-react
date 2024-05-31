package com.stockmaster.controller;

<<<<<<< HEAD
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
=======
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
>>>>>>> 3b0587dcdd6b13f3faaefc256c3d2c11d092d101
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

<<<<<<< HEAD
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
=======

    @PostMapping
    public ResponseEntity<?> createPurchase(@RequestBody @Valid DtoPurchaseResponse dtoPurchaseResponse) {
        try {

            return ResponseEntity.status(HttpStatus.CREATED).body(purchaseService.MakeAPurchase(dtoPurchaseResponse));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error! purchase not created"+e.getMessage());
        }
    }
}
>>>>>>> 3b0587dcdd6b13f3faaefc256c3d2c11d092d101
