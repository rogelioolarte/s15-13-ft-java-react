package com.stockmaster.service.sales;


import com.stockmaster.entity.Taxes;
import com.stockmaster.entity.sales.Sales;
import com.stockmaster.service.TaxesRepositoryImpl;
import org.springframework.stereotype.Service;

@Service
public class SalesMapper {

    TaxesRepositoryImpl taxesService;

    /*
    public SalesResponse toSalesResponse(Sales sales){
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
    /*
    public Sales salesRequestToPost(SalesSavingRequest savingSales){
        if(savingSales == null){
            throw new NullPointerException("Sale cant be null");
        }
        return Sales.builder()
                .customer(savingSales.getId_customer())
                .taxes(savingSales.getId_taxes())
                .date(savingSales.getDate())
                .discount(savingSales.getDiscount())
                .total(savingSales.getTotal())
                .build();
    }*/

    public Sales salesRequestToPost2(SalesSavingRequestManyToOne savingSales){
        if(savingSales == null){
            throw new NullPointerException("Sale cant be null");
        }
        Taxes tax = taxesService.findById(savingSales.getId_tax());
        return Sales.builder()
                .customer(savingSales.getId_customer())
                .tax(tax)
                .date(savingSales.getDate())
                .discount(savingSales.getDiscount())
                .total(savingSales.getTotal())
                .build();
    }
}
