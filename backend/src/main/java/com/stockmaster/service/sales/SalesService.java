package com.stockmaster.service.sales;

import com.stockmaster.dto.sales.SalesDateResponse;
import com.stockmaster.dto.sales.SalesResponse;
import com.stockmaster.dto.sales.SalesSavingRequest;
import com.stockmaster.entity.sales.Sales;
import com.stockmaster.exception.RequestException;
import com.stockmaster.repository.SalesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
@Service
@RequiredArgsConstructor
public class SalesService {

    private final SalesRepository salesRepository;
    private final SalesMapper salesMapper;
    /*
    public List<SalesResponse>findByAll(){
        List<Sales> customers = salesRepository.findAll();
        return salesRepository.findAll().stream()
                .map(salesMapper::toSalesResponse).toList();
    }*/

    public List<SalesDateResponse>findByDate(String date){
        SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
        try {
            formatter.parse(date);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Fecha no válida, debe estar en formato MM/dd/yyyy");
        }

        return salesRepository.findByDate(date);
    }


    /*
    public SalesResponse save(SalesSavingRequest salesSavingRequest){
        if (salesSavingRequest.getTotal() == null || salesSavingRequest.getTotal().compareTo(BigDecimal.ZERO) == 0){
            throw new RequestException("Total cant be null or empty");
        }
        Sales sales = salesMapper.salesRequestToPost(salesSavingRequest);

        return salesMapper.toSalesResponse(salesRepository.save(sales));
    }*/


}