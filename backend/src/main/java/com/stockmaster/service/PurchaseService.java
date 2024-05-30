package com.stockmaster.service;

import com.stockmaster.dto.Purchase.*;
import com.stockmaster.dto.SupplierResponseDTO;
import com.stockmaster.entity.Purchase;
import com.stockmaster.entity.PurchaseProduct;
import com.stockmaster.repository.PurchaseRepository;
import com.stockmaster.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Transactional
    public PurchaseResponseDTO createPurchase(PurchaseRequestDTO requestDTO) {
        final Purchase purchase = new Purchase();
        purchase.setBill(requestDTO.getBill());
        purchase.setDate(requestDTO.getDate());
        purchase.setIdSupplier(requestDTO.getSupplier_id());
        purchase.setTotal(calculateTotal(requestDTO.getProducts()));

        final List<PurchaseProduct> products = requestDTO.getProducts().stream().map(dto -> {
            final PurchaseProduct product = new PurchaseProduct();
            product.setIdProduct(dto.getIdProduct());
            product.setQuantity(dto.getQuantity());
            product.setPurchase(purchase);
            return product;
        }).collect(Collectors.toList());

        purchase.setProducts(products);
        Purchase savedPurchase = purchaseRepository.save(purchase);

        return mapToResponseDTO(savedPurchase);
    }

    public List<PurchaseDatesDTO> searchPurchasesByDate(PurchaseSearchDTO searchDTO) {
        final List<Purchase> purchases = purchaseRepository.findByDateBetween(searchDTO.getFrom(), searchDTO.getTo());
        return purchases.stream().map(purchase -> {
            final PurchaseDatesDTO dto = new PurchaseDatesDTO();
            dto.setDate(purchase.getDate());
            dto.setTotal(purchase.getTotal());
            return dto;
        }).collect(Collectors.toList());
    }

    public List<PurchaseResponseDTO> getPurchasesByDate(Date date) {
        final List<Purchase> purchases = purchaseRepository.findByDate(date);
        return purchases.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
    }

    private BigDecimal calculateTotal(List<PurchaseProductDTO> products) {
        // Implement the logic to calculate total based on product prices and quantities
        return BigDecimal.ZERO;
    }

    private PurchaseResponseDTO mapToResponseDTO(final Purchase purchase) {
        final PurchaseResponseDTO dto = new PurchaseResponseDTO();
        dto.setId(purchase.getId());
        dto.setBill(purchase.getBill());
        dto.setDate(purchase.getDate());

        final SupplierResponseDTO supplierDTO = supplierRepository.findById(purchase.getIdSupplier())
                .map(supplier -> {
                    final SupplierResponseDTO sDto = new SupplierResponseDTO();
                    sDto.setId(supplier.getId());
                    sDto.setName(supplier.getName());
                    sDto.setCompanyCode(supplier.getCompanyCode());
                   sDto.setActive(supplier.isActive());
                    return sDto;
                }).orElse(null);
        dto.setSupplier(supplierDTO);

        final List<PurchaseProductDTO> products = purchase.getProducts().stream().map(product -> {
            final PurchaseProductDTO productDTO = new PurchaseProductDTO();
            productDTO.setIdProduct(product.getIdProduct());
            productDTO.setQuantity(product.getQuantity());
            return productDTO;
        }).collect(Collectors.toList());

        dto.setProducts(products);
        dto.setTotal(purchase.getTotal());
        return dto;
    }
}