package com.stockmaster.service;

import com.stockmaster.dto.SupplierRequestDTO;
import com.stockmaster.dto.SupplierResponseDTO;
import com.stockmaster.entity.Supplier;
import com.stockmaster.entity.SupplierProduct;
import com.stockmaster.repository.SupplierProductRepository;
import com.stockmaster.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import com.stockmaster.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private SupplierProductRepository supplierProductRepository;

    private SupplierResponseDTO mapToResponseDTO(Supplier supplier) {
        if (supplier == null) {
            return null;
        }

        return SupplierResponseDTO.builder()
                .id(supplier.getId())
                .name(supplier.getName())
                .companyCode(supplier.getCompanyCode())
                .active(supplier.isActive())
                .build();
    }

    private Supplier mapToEntity(SupplierRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        return Supplier.builder()
                .name(dto.getName())
                .companyCode(dto.getCompanyCode())
                .active(true) // Default to active when creating
                .build();
    }

    public SupplierResponseDTO createSupplier(SupplierRequestDTO supplierRequestDTO) {
      //  Supplier supplier = mapToEntity(supplierRequestDTO);
      //  supplier = supplierRepository.save(new Supplier(supplier));
        return mapToResponseDTO(supplierRepository.save(new Supplier(null,supplierRequestDTO.getName(),supplierRequestDTO.getCompanyCode(),true,null)));
    }

    public SupplierResponseDTO updateSupplier(Long id, SupplierRequestDTO supplierRequestDTO) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        supplier.setName(supplierRequestDTO.getName());
        supplier.setCompanyCode(supplierRequestDTO.getCompanyCode());
        supplier = supplierRepository.save(supplier);
        return mapToResponseDTO(supplier);
    }

    public SupplierResponseDTO getSupplierById(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        return mapToResponseDTO(supplier);
    }

    public List<SupplierResponseDTO> getAllSuppliers() {
        return supplierRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public SupplierResponseDTO deactivateSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        supplier.setActive(false);
        supplier = supplierRepository.save(supplier);
        return mapToResponseDTO(supplier);
    }

    public List<SupplierResponseDTO> findSuppliersByName(String name) {
        return supplierRepository.findByName(name).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public SupplierResponseDTO addProductsToSupplier(Long supplierId, List<Long> productIds) {
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        List<SupplierProduct> products = supplierProductRepository.findAllById(productIds);
        supplier.setProducts(products);
        supplier = supplierRepository.save(supplier);

        return mapToResponseDTO(supplier);
    }
}