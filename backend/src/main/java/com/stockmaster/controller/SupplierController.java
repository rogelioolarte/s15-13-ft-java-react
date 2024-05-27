package com.stockmaster.controller;

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

    @Autowired
    private SupplierService supplierService;

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
    public List<SupplierResponseDTO> findSuppliersByName(@RequestParam String name) {
        return supplierService.findSuppliersByName(name);
    }

    @GetMapping("/all")
    public List<SupplierResponseDTO> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }

    @PatchMapping("/{id}")
    public SupplierResponseDTO deactivateSupplier(@PathVariable Long id) {
        return supplierService.deactivateSupplier(id);
    }

    @PostMapping("/product")
    public SupplierResponseDTO addProductsToSupplier(@RequestParam Long supplierId, @RequestBody List<Long> productIds) {
        return supplierService.addProductsToSupplier(supplierId, productIds);
    }
}