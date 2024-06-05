package com.stockmaster.dto.Purchase;

import com.stockmaster.entity.Supplier;

public record dtoSupplierPurchase(Long id, String name, String companyCode, boolean active) {

    public dtoSupplierPurchase(Supplier supplier){
        this(supplier.getId(),supplier.getName(),supplier.getCompanyCode(),supplier.isActive());
    }
}
