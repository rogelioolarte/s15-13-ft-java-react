package com.stockmaster.service;

import com.stockmaster.dto.taxes.DtoTaxesResponse;
import com.stockmaster.dto.taxes.DtoTaxesRquest;
import com.stockmaster.entity.Taxes;
import com.stockmaster.repository.TaxesRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class TaxesRepositoryImpl {

    @Autowired
   private TaxesRepository taxesRepositoryImpl;

    public DtoTaxesResponse  taxRegister(DtoTaxesRquest dtoTaxesRquest) {
        Taxes tax =  taxesRepositoryImpl.save(new Taxes(dtoTaxesRquest));
        return new DtoTaxesResponse(tax);
    }
}
