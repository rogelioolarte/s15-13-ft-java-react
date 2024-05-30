package com.stockmaster.controller;

import com.stockmaster.dto.sales.SalesDateResponse;
import com.stockmaster.repository.SalesRepository;
import com.stockmaster.service.sales.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/sale")
@RequiredArgsConstructor
@CrossOrigin
public class SaleController {
    private final SalesService salesService;
    private final SalesRepository salesRepository;

    //Get Method
    /*
    @GetMapping("/getAll")
    public ResponseEntity<?>getAllSales(){
        return ResponseEntity.ok(salesService.findByAll());
    }*/
    @GetMapping("/getbydate/")//byDate
    public ResponseEntity<?>getSalesByDate(@RequestParam("date") Date date) {
        List<SalesDateResponse> sales = salesService.findByDate(date);
        return ResponseEntity.ok(sales);
    }
    /*
    //Post Method
    @PostMapping()
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
    }*/

}