package com.stockmaster.controller;

import com.stockmaster.dto.sales.SalesDateResponse;
import com.stockmaster.dto.sales.SalesSavingRequest;
import com.stockmaster.repository.SalesRepository;
import com.stockmaster.service.sales.SalesService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sale")
@RequiredArgsConstructor
@CrossOrigin("*")

public class SaleController {
    @Autowired
    private final SalesService salesService;
    private final SalesRepository salesRepository;

    //Get Method

    @GetMapping("/getbydate/")//byDate
    public ResponseEntity<?>getSalesByDate(@RequestParam("date") Date date) {
        List<SalesDateResponse> sales = salesService.findByDate(date);
        return ResponseEntity.ok(sales);
    }

    //Post Method
    @PostMapping()
    public ResponseEntity<?> saveSale(@Valid @RequestBody SalesSavingRequest sale, BindingResult result){
        if(result.hasErrors()){
            List<String>errorMessages = result.getAllErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errorMessages);
        }

        salesService.save(sale);
        return ResponseEntity.ok(Map.of("message","Sale saved successfully"));
    }


}