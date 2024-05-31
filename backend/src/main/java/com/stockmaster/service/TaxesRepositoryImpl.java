package com.stockmaster.service;


import com.stockmaster.dto.taxes.DtoTaxesResponse;
import com.stockmaster.dto.taxes.DtoTaxesRquest;
import com.stockmaster.entity.Taxes;
import com.stockmaster.repository.TaxesRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
<<<<<<< HEAD
import org.hibernate.validator.internal.util.stereotypes.Lazy;
=======
import org.springframework.context.annotation.Lazy;
>>>>>>> 3b0587dcdd6b13f3faaefc256c3d2c11d092d101
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class TaxesRepositoryImpl {


<<<<<<< HEAD
    @Lazy
    private TaxesRepository taxesRepository;
=======
    private final TaxesRepository taxesRepository;

    public TaxesRepositoryImpl(  @Lazy TaxesRepository taxesRepository) {
        this.taxesRepository = taxesRepository;
    }

>>>>>>> 3b0587dcdd6b13f3faaefc256c3d2c11d092d101


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

    public DtoTaxesResponse updateById(Long id, DtoTaxesRquest dtoTaxesRquest) {


        Taxes tax = taxesRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Try again, the order has not been saved"));
        if (!dtoTaxesRquest.name().isBlank()) tax.setName(dtoTaxesRquest.name());
        if (dtoTaxesRquest.percentage().compareTo(BigDecimal.ZERO) > 0) tax.setPercentage(dtoTaxesRquest.percentage());
        return new DtoTaxesResponse(taxesRepository.save(tax));

    }

    public DtoTaxesResponse delete(Long id) {
        Taxes tax = taxesRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Try again, the order has not been saved"));
        tax.setActive(false);
        return new DtoTaxesResponse(taxesRepository.save(tax));
    }

    public DtoTaxesResponse activeTax(Long id) {
        Taxes tax = taxesRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Try again, the order has not been saved"));
        tax.setActive(true);
        return new DtoTaxesResponse(taxesRepository.save(tax));
    }

}
