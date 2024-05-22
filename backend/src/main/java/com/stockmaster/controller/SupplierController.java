package com.stockmaster.controller;

import com.stockmaster.dto.SupplierRequestDTO;
import com.stockmaster.dto.SupplierResponseDTO;
import com.stockmaster.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/supplier")
public class SupplierController {
    private final SupplierService supplierService;

    @Autowired
    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping
    public SupplierResponseDTO createSupplier(@RequestBody SupplierRequestDTO supplierRequestDTO) {
        return supplierService.createSupplier(supplierRequestDTO);
    }

    @PutMapping("/{id}")
    public SupplierResponseDTO updateSupplier(@PathVariable Long id, @RequestBody SupplierRequestDTO supplierRequestDTO) {
        return supplierService.updateSupplier(id, supplierRequestDTO);
    }

    @GetMapping("/{id}")
    public SupplierResponseDTO getSupplierById(@PathVariable Long id) {
        return supplierService.getSupplierById(id);
    }

    @GetMapping
    public List<SupplierResponseDTO> getSuppliersByName(@RequestParam String name) {
        return supplierService.getSuppliersByName(name);
    }

    @GetMapping("/all")
    public List<SupplierResponseDTO> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }

    @PatchMapping("/{id}")
    public SupplierResponseDTO deactivateSupplier(@PathVariable Long id) {
        return supplierService.deactivateSupplier(id);
    }
}