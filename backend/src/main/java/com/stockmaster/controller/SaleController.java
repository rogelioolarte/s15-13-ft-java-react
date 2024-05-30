package com.stockmaster.controller;

import com.stockmaster.dto.sales.SalesDateResponse;
import com.stockmaster.repository.SalesRepository;
import com.stockmaster.service.sales.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/sale")
@RequiredArgsConstructor
@CrossOrigin
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


}