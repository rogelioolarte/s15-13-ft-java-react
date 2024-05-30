package com.stockmaster.controller;

import com.stockmaster.dto.sales.SalesDateResponse;
import com.stockmaster.repository.SalesRepository;
import com.stockmaster.service.sales.SalesService;
<<<<<<< HEAD
import io.swagger.annotations.Api;
import jakarta.validation.Valid;
=======
>>>>>>> f566aab1c5e7d01d0c72e3ae7f2878ede6a19507
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
@Api(value = "Purchase Management System", description = "Operations pertaining to purchases in Purchase Management System")
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