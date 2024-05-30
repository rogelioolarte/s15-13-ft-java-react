package com.stockmaster.service.sales;

import com.stockmaster.dto.sales.SalesDateResponse;
import com.stockmaster.dto.sales.SalesResponse;
import com.stockmaster.dto.sales.SalesSavingRequest;
import com.stockmaster.entity.sales.Sales;
import com.stockmaster.exception.RequestException;
import com.stockmaster.repository.SalesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Service
@RequiredArgsConstructor
public class SalesService {

    @Autowired
    private final SalesRepository salesRepository;
    private final SalesMapper salesMapper;
    /*
    public List<SalesResponse>findByAll(){
        List<Sales> customers = salesRepository.findAll();
        return salesRepository.findAll().stream()
                .map(salesMapper::toSalesResponse).toList();
    }*/

    public List<SalesDateResponse> findByDate(Date date) {

        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        String formattedDate = dateFormat.format(date);
        List<Object[]>results = salesRepository.findByDate(formattedDate);

        List<SalesDateResponse> salesResponses = new ArrayList<>();
        for (Object[] result : results){
            SalesDateResponse response = SalesDateResponse.builder()
                    .sale_id(((BigInteger)result[0]).longValue())
                    .customerName((String) result[1])
                    .personalCode((String) result[2])
                    .product_name((String) result[3])
                    .quantity((Integer) result[4])
                    .discount((Integer) result[5])
                    .price((Integer) result[6])
                    .tax_name((String) result[7])
                    .total((Integer) result[8])
                    .build();
            salesResponses.add(response);
        }

        return salesResponses;
    }
    /*
    public List<SalesDateResponse>findByDate(String date){
        SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
        try {
            formatter.parse(date);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid Format please use the MM/dd/yyyy format");
        }

        return salesRepository.findByDate(date);
    }*/


    /*
    public SalesResponse save(SalesSavingRequest salesSavingRequest){
        if (salesSavingRequest.getTotal() == null || salesSavingRequest.getTotal().compareTo(BigDecimal.ZERO) == 0){
            throw new RequestException("Total cant be null or empty");
        }
        Sales sales = salesMapper.salesRequestToPost(salesSavingRequest);

        return salesMapper.toSalesResponse(salesRepository.save(sales));
    }*/


}