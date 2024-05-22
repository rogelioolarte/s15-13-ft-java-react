package com.stockmaster.service;

import com.stockmaster.dto.SupplierRequestDTO;
import com.stockmaster.dto.SupplierResponseDTO;
import com.stockmaster.entity.Supplier;
import com.stockmaster.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class SupplierService {
    private final SupplierRepository supplierRepository;

    @Autowired
    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public SupplierResponseDTO createSupplier(SupplierRequestDTO supplierRequestDTO) {
        Supplier supplier = mapToEntity(supplierRequestDTO);
        supplier.setActive(true);

        return mapToResponseDTO(supplierRepository.save(supplier));
    }

    public SupplierResponseDTO updateSupplier(Long id, SupplierRequestDTO supplierRequestDTO) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        updateEntity(supplier, supplierRequestDTO);

        return mapToResponseDTO(supplierRepository.save(supplier));
    }

    public SupplierResponseDTO getSupplierById(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        return mapToResponseDTO(supplier);
    }

    public List<SupplierResponseDTO> getSuppliersByName(String name) {
        List<Supplier> suppliers = supplierRepository.findByName(name);

        return suppliers.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
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

        return mapToResponseDTO(supplierRepository.save(supplier));
    }

    private Supplier mapToEntity(SupplierRequestDTO dto) {
        Supplier supplier = new Supplier();
        supplier.setName(dto.getName());
        supplier.setCompanyCode(dto.getCompanyCode());
        return supplier;
    }

    private void updateEntity(Supplier supplier, SupplierRequestDTO dto) {
        supplier.setName(dto.getName());
        supplier.setCompanyCode(dto.getCompanyCode());
    }

    private SupplierResponseDTO mapToResponseDTO(Supplier supplier) {
        SupplierResponseDTO dto = new SupplierResponseDTO();
        dto.setId(supplier.getId());
        dto.setName(supplier.getName());
        dto.setCompanyCode(supplier.getCompanyCode());
        dto.setActive(supplier.getActive());
        return dto;
    }
}