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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

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
    /*
    public List<SalesDateResponse> findByDate(Date date) {

        DateFormat dateFormat = new SimpleDateFormat("MM-dd-yyyy");
        String formattedDate = dateFormat.format(date);
        List<Object[]>results = salesRepository.findByDate(formattedDate);

        List<SalesDateResponse> salesResponses = new ArrayList<>();
        for (Object[] result : results){
            SalesDateResponse response = SalesDateResponse.builder()
                    .sale_id(((BigInteger)result[0]))
                    .customerName((String) result[1])
                    .personalCode((String) result[2])
                    .product_name((String) result[3])
                    .quantity((Integer) result[4])
                    .discount((BigDecimal) result[5])
                    .price((BigDecimal) result[6])
                    .tax_name((String) result[7])
                    .total((BigDecimal) result[8])
                    .build();
            salesResponses.add(response);
        }
        return salesResponses;
    }*/
    private static final Logger logger = LoggerFactory.getLogger(SalesService.class);
    public List<SalesDateResponse> findByDate(Date date) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String formattedDate = dateFormat.format(date);

        logger.info("Formatted date: {}", formattedDate); // Logging

        List<Object[]> results = salesRepository.findByDate(formattedDate);

        if (results.isEmpty()) {
            logger.info("No results found for date: {}", formattedDate); // Logging
            return Collections.emptyList();
        }

        List<SalesDateResponse> salesResponses = new ArrayList<>();
        for (Object[] result : results) {
            logger.info("Result: {}", Arrays.toString(result)); // Logging each result

            Long saleId = result[0] instanceof Long ? (Long) result[0] : Long.parseLong(result[0].toString());

            SalesDateResponse response = SalesDateResponse.builder()
                    .sale_id(saleId)
                    .customerName((String) result[1])
                    .personalCode((String) result[2])
                    .product_name((String) result[3])
                    .quantity((Integer) result[4])
                    .discount((BigDecimal) result[5])
                    .price((BigDecimal) result[6])
                    .tax_name((String) result[7])
                    .total((BigDecimal) result[8])
                    .build();
            salesResponses.add(response);
        }
        return salesResponses;
    }
    public List<SalesDateResponse> findByDateRange(Date startDate, Date endDate) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String formattedStartDate = dateFormat.format(startDate);
        String formattedEndDate = dateFormat.format(endDate);

        logger.info("Formatted start date: {}", formattedStartDate);
        logger.info("Formatted end date: {}", formattedEndDate);

        List<Object[]> results = salesRepository.findByDateRange(formattedStartDate, formattedEndDate);

        if (results.isEmpty()) {
            logger.info("No results found for date range: {} - {}", formattedStartDate, formattedEndDate);
            return Collections.emptyList();
        }

        List<SalesDateResponse> salesResponses = new ArrayList<>();
        for (Object[] result : results) {
            logger.info("Result: {}", Arrays.toString(result));

            Long saleId = result[0] instanceof Long ? (Long) result[0] : Long.parseLong(result[0].toString());

            SalesDateResponse response = SalesDateResponse.builder()
                    .sale_id(saleId)
                    .customerName((String) result[1])
                    .personalCode((String) result[2])
                    .product_name((String) result[3])
                    .quantity((Integer) result[4])
                    .discount((BigDecimal) result[5])
                    .price((BigDecimal) result[6])
                    .tax_name((String) result[7])
                    .total((BigDecimal) result[8])
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

        BigDecimal totalGeneral = calculateTotalGeneral(request.getProducts());
        totalGeneral = addTaxToTotal(totalGeneral, tax);

        Sales sales = Sales.builder()
                .customer(customer)
                .tax(tax)
                .date(request.getDate())
                .total(totalGeneral)
                .build();

        List<SalesProduct> salesProducts = new ArrayList<>();
        for(ProductSavingRequest productRequest : request.getProducts()){
            Product product = productRepository.findById(productRequest.getIdProduct())
                    .orElseThrow(()-> new RequestException("Product not found"));

            SalesProduct salesProduct = SalesProduct.builder()
                    .sales(sales)
                    .product(product)
                    .quantity(productRequest.getQuantity())
                    .discount(productRequest.getDiscount())
                    .build();
            salesProducts.add(salesProduct);
        }
        sales.setSalesProducts(salesProducts);
        sales = salesRepository.save(sales);
        return sales;
    }
    private BigDecimal calculateTotalGeneral(List<ProductSavingRequest> products) {
        return products.stream()
                .map(product -> {
                    BigDecimal discountAmount = product.getTotalProduct()
                            .multiply(product.getDiscount())
                            .divide(BigDecimal.valueOf(100));
                    BigDecimal discountedPrice = product.getTotalProduct().subtract(discountAmount);
                    return discountedPrice.multiply(BigDecimal.valueOf(product.getQuantity()));
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal addTaxToTotal(BigDecimal total, Taxes tax) {
        BigDecimal taxAmount = total.multiply
        (tax.getPercentage()).divide(BigDecimal.valueOf(100));
        return total.add(taxAmount);
    }
}