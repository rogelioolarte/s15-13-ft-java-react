package com.stockmaster.controller;

import com.stockmaster.dto.sales.*;
import com.stockmaster.entity.sales.Sales;
import com.stockmaster.repository.SalesRepository;
import com.stockmaster.service.sales.SalesService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sale")
@RequiredArgsConstructor
@CrossOrigin()
public class SaleController {
    @Autowired
    private final SalesService salesService;
    private final SalesRepository salesRepository;

    //Get Method
    @GetMapping("/all")
    public ResponseEntity<?> getAllSales() throws ParseException {
        List<SalesResponse> sales = salesService.findAllSales();
        return ResponseEntity.ok(sales);
    }

    @GetMapping("/getbydaterange/")
    public ResponseEntity<?> getSalesByDateRange(
            @RequestParam("startDate") @DateTimeFormat(pattern = "MM-dd-yyyy") String startDateStr,
            @RequestParam("endDate") @DateTimeFormat(pattern = "MM-dd-yyyy") String endDateStr) throws ParseException {
        SimpleDateFormat inputFormat = new SimpleDateFormat("MM-dd-yyyy");
        SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd");

        String startDate = outputFormat.format(inputFormat.parse(startDateStr));
        String endDate = outputFormat.format(inputFormat.parse(endDateStr));

        List<SalesResponse> sales = salesService.findByDateRange(startDate, endDate);
        return ResponseEntity.ok(sales);
    }

    @GetMapping("/analytics")
    public ResponseEntity<List<AnaliticsSalesResponse>> getMonthValue(){
        List<AnaliticsSalesResponse> analytics = salesService.getAnalitics();
        return ResponseEntity.ok(analytics);
    }

    //Post Method
    @PostMapping()
    public ResponseEntity<?> saveSale(@Valid @RequestBody SalesSavingRequest sale, BindingResult result){
        if(result.hasErrors()){
            List<String>errorMessages = result.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errorMessages);
        }

        Sales savedSale = salesService.save(sale);
        SalesResponseDTO responseDTO = salesService.convertToDto(savedSale);

        return ResponseEntity.ok(responseDTO);
    }


}