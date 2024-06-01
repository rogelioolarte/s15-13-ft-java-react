package com.stockmaster.service.sales;

import com.stockmaster.dto.product.ProductSavingRequest;
import com.stockmaster.dto.sales.SalesDateResponse;
import com.stockmaster.dto.sales.SalesSavingRequest;
import com.stockmaster.entity.Product;
import com.stockmaster.entity.Taxes;
import com.stockmaster.entity.customer.Customer;
import com.stockmaster.entity.sales.Sales;
import com.stockmaster.entity.sales.SalesProduct;
import com.stockmaster.exception.RequestException;
import com.stockmaster.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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

    @Lazy
    @Autowired
    private final SalesRepository salesRepository;
    @Lazy
    @Autowired
    private final CustomerRepository customerRepository;
    @Lazy
    @Autowired
    private final TaxesRepository taxesRepository;
    @Lazy
    @Autowired
    private final ProductRepository productRepository;
    @Lazy
    @Autowired
    private final SalesProductRepository salesProductRepository;
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

    @Transactional
    public Sales save(SalesSavingRequest request) {
        Customer customer = customerRepository.findById(request.getId_customer())
                .orElseThrow(() -> new RequestException("Customer not found"));
        Taxes tax = taxesRepository.findById(request.getId_taxes())
                .orElseThrow(()-> new RequestException("Tax not found"));

        BigDecimal totalGeneral = BigDecimal.ZERO;

        for (ProductSavingRequest productRequest : request.getProducts()){
            totalGeneral = totalGeneral.add(productRequest.getTotalProduct());
        }

        Sales sales = Sales.builder()
                .customer(customer)
                .tax(tax)
                .date(request.getDate())
                .total(request.getTotalGeneral())
                .build();

        sales = salesRepository.save(sales);

        for(ProductSavingRequest productRequest : request.getProducts()){
            Product product = productRepository.findById(productRequest.getIdProduct())
                    .orElseThrow(()-> new RequestException("Product not found"));

            SalesProduct salesProduct = SalesProduct.builder()
                    .sales(sales)
                    .quantity(productRequest.getQuantity())
                    .discount(productRequest.getDiscount())
                    .build();
            salesProductRepository.save(salesProduct);
        }
        return sales;
    }
}