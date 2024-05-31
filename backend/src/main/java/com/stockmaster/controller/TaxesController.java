package com.stockmaster.controller;

import com.stockmaster.dto.taxes.DtoTaxesRquest;
import com.stockmaster.service.TaxesRepositoryImpl;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/taxes")
@CrossOrigin("*")
public class TaxesController {
    @Lazy
    @Autowired
    private  TaxesRepositoryImpl taxesRepositoryImpl;

    @PostMapping(produces = "application/json")
    public ResponseEntity<?> register(@RequestBody @Valid DtoTaxesRquest dtoTaxesRquest) {
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(taxesRepositoryImpl.taxRegister(dtoTaxesRquest));
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.CONFLICT).body("tax already exists");
        }
    }


    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(taxesRepositoryImpl.findAllTaxes());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error! Something went wrong " );
        }

    }


    @PutMapping(value = "/{id}", produces = "application/json")

    public ResponseEntity<?> updateTax( @RequestBody  DtoTaxesRquest dtoTaxesRquest,@PathVariable Long id) {
        try {

            return ResponseEntity.status(HttpStatus.CREATED).body(taxesRepositoryImpl.updateById(id,dtoTaxesRquest));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error! Something went wrong " );
        }

    }

    @PatchMapping(value = "/disable/{id}",produces = "application/json")
    public ResponseEntity<?> disableTax(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(taxesRepositoryImpl.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error! Something went wrong " );
        }

    }


    @PatchMapping(value = "/enable/{id}")
    public ResponseEntity<?> activeTaxes(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(taxesRepositoryImpl.activeTax(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error! Something went wrong " );
        }

    }
}
