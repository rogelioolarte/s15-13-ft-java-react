package com.stockmaster.service.sales;


import com.stockmaster.dto.sales.SalesDateResponse;
import com.stockmaster.dto.sales.SalesResponse;
import com.stockmaster.entity.Taxes;
import com.stockmaster.entity.sales.Sales;
import com.stockmaster.service.TaxesRepositoryImpl;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class SalesMapper {

    TaxesRepositoryImpl taxesService;

    /*
    public SalesDateResponse toSalesDateResponse(Sales sales){
        if(sales == null){
            throw new NullPointerException("Sales can't be null");
        }

        Set<Long> taxIds = sales.getTaxes().stream()
                .map(Taxes::getId)
                .collect(Collectors.toSet());

        return SalesResponse.builder()
                .id(sales.getId())
                .id_customer(sales.getCustomer().getId())
                .id_taxes(taxIds)
                .date(sales.getDate())
                .total(sales.getTotal())
                .build();
    }*/

}
