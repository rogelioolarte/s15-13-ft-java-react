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

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaxesRepositoryImpl {


    @Lazy
    @Autowired
    private  TaxesRepository taxesRepository;


    public DtoTaxesResponse taxRegister(DtoTaxesRquest dtoTaxesRquest) {
        try {
            Taxes tax = taxesRepository.save(new Taxes(dtoTaxesRquest));
            return new DtoTaxesResponse(tax);
        } catch (EntityNotFoundException en) {
            throw new EntityNotFoundException("Try again, the order has not been saved");
        }
    }

    public List<DtoTaxesResponse> findAllTaxes() {
        List<Taxes> list = taxesRepository.findAll();
        return list.stream().map(DtoTaxesResponse::new).toList();
    }

    public Taxes findById(Long id) {
        return taxesRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tax with ID " + id + " not found"));
    }
}
