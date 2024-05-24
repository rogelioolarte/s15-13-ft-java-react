package com.stockmaster.controller;

import com.stockmaster.dto.taxes.DtoTaxesRquest;
import com.stockmaster.service.TaxesRepositoryImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/taxes")
@CrossOrigin("*")
public class TaxesController {


    private final TaxesRepositoryImpl taxesRepositoryImpl;

    @Autowired
    public TaxesController(@Lazy TaxesRepositoryImpl taxesRepositoryImpl) {
        this.taxesRepositoryImpl = taxesRepositoryImpl;
    }


    @PostMapping(produces = "application/json")
    public ResponseEntity<?> register(@RequestBody @Valid DtoTaxesRquest dtoTaxesRquest) {
        try{
        return ResponseEntity.status(HttpStatus.CREATED).body(taxesRepositoryImpl.taxRegister(dtoTaxesRquest));
    } catch (Exception e) {
        return  ResponseEntity.status(HttpStatus.CONFLICT).body("tax already exists");
    }
    }

    @GetMapping(produces = "application/json")
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(taxesRepositoryImpl.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error! Something went wrong " );
        }

    }
}
