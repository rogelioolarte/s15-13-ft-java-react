package com.stockmaster.service;

import com.stockmaster.dto.taxes.DtoTaxesResponse;
import com.stockmaster.dto.taxes.DtoTaxesRquest;
import com.stockmaster.entity.Taxes;
import com.stockmaster.repository.TaxesRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TaxesRepositoryImpl {


    private final TaxesRepository taxesRepository;

    @Autowired
    public TaxesRepositoryImpl(@Lazy TaxesRepository taxesRepository) {
        this.taxesRepository = taxesRepository;
    }


    public DtoTaxesResponse taxRegister(DtoTaxesRquest dtoTaxesRquest) {
        try {
            Taxes tax = taxesRepository.save(new Taxes(dtoTaxesRquest));
            return new DtoTaxesResponse(tax);
        } catch (EntityNotFoundException en) {
            throw new EntityNotFoundException("Try again, the order has not been saved");
        }
    }

    public List<DtoTaxesResponse> findAll() {
        return taxesRepository.findAll().stream().map(DtoTaxesResponse::new).toList();

    }
}
