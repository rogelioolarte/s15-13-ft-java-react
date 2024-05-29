package com.stockmaster.service.sales;

import com.stockmaster.dto.sales.SalesResponse;
import com.stockmaster.dto.sales.SalesSavingRequest;
import com.stockmaster.entity.sales.Sales;
import com.stockmaster.exception.RequestException;
import com.stockmaster.repository.SalesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
@Service
@RequiredArgsConstructor
public class SalesService {

    private final SalesRepository salesRepository;
    private final SalesMapper salesMapper;

    public List<SalesResponse>findByAll(){
        List<Sales> customers = salesRepository.findAll();
        return salesRepository.findAll().stream()
                .map(salesMapper::toSalesResponse).toList();
    }

    public SalesResponse save(SalesSavingRequest salesSavingRequest){
        if (salesSavingRequest.getTotal() == null || salesSavingRequest.getTotal().compareTo(BigDecimal.ZERO) == 0){
            throw new RequestException("Total cant be null or empty");
        }
        Sales sales = salesMapper.salesRequestToPost(salesSavingRequest);

        return salesMapper.toSalesResponse(salesRepository.save(sales));
    }


}