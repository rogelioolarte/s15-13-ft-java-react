package com.stockmaster.controller;

import com.stockmaster.dto.taxes.DtoTaxesRquest;
import com.stockmaster.repository.TaxesRepository;
import com.stockmaster.service.TaxesRepositoryImpl;
import io.swagger.annotations.Api;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/taxes")
@CrossOrigin("*")
@Api(value = "Purchase Management System", description = "Operations pertaining to purchases in Purchase Management System")

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

    //put
    //delete agregar un campo active
}
