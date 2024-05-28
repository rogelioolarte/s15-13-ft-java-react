package com.stockmaster.controller;

import com.stockmaster.dto.sales.SalesSavingRequest;
import com.stockmaster.entity.sales.Sales;
import com.stockmaster.repository.SalesRepository;
import com.stockmaster.service.sales.SalesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sale")
@RequiredArgsConstructor
@CrossOrigin
public class SaleController {
    private final SalesService salesService;
    private final SalesRepository salesRepository;

    //Get Method
    @GetMapping("/getAll")
    public ResponseEntity<?>getAllSales(){
        return ResponseEntity.ok(salesService.findByAll());
    }

    //Post Method
    @PostMapping("/save")
    public ResponseEntity<?>saveSale(@Valid @RequestBody SalesSavingRequest savingRequest, BindingResult result){
        if (result.hasErrors()){
            List<String> errorMessages = result.getAllErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errorMessages);
        }
        salesService.save(savingRequest);
        return ResponseEntity.ok(Map.of("message","Sale saved successfully"));
    }
}