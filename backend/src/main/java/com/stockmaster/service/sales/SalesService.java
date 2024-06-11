package com.stockmaster.service.sales;

import com.stockmaster.dto.product.ProductSavingRequest;
import com.stockmaster.dto.product.ProductResponse;
import com.stockmaster.dto.sales.SalesDateResponse;
import com.stockmaster.dto.sales.SalesResponse;
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

    public List<SalesResponse> findAllSales() throws ParseException {
        List<Object[]> results = salesRepository.findAllSales();

        if (results.isEmpty()) {
            return Collections.emptyList();
        }

        Map<Long, SalesResponse> salesMap = new HashMap<>();

        for (Object[] result : results) {
            Long saleId = ((Number) result[0]).longValue();
            String customerName = (String) result[1];
            String personalCode = (String) result[2];
            String productName = (String) result[3];
            Integer quantity = (Integer) result[4];
            BigDecimal discount = (BigDecimal) result[5];
            BigDecimal price = (BigDecimal) result[6];
            String taxName = (String) result[7];
            Double total = ((BigDecimal) result[8]).doubleValue();
            String formattedSaleDate = (String) result[9];
            String description = (String) result[10];  // Nueva columna para la descripción del producto
            String barcode = (String) result[11];      // Nueva columna para el código de barras del producto
            int stock = (Integer) result[12];          // Nueva columna para el stock del producto

            SalesResponse saleResponse = salesMap.get(saleId);
            if (saleResponse == null) {
                saleResponse = SalesResponse.builder()
                        .id_customer(saleId)
                        .tax(taxName)
                        .date(new SimpleDateFormat("MM/dd/yyyy").parse(formattedSaleDate))
                        .productSize(new ArrayList<>())
                        .totalPrice(BigDecimal.valueOf(total))
                        .build();
                salesMap.put(saleId, saleResponse);
            }

            ProductResponse productResponse = ProductResponse.builder()
                    .productName(productName)
                    .description(description)
                    .barcode(barcode)
                    .salePrice(price)
                    .stock(stock)
                    .build();
            saleResponse.getProductSize().add(productResponse);
        }

        return new ArrayList<>(salesMap.values());
    }
    public List<SalesDateResponse> findByDateRange(Date startDate, Date endDate) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String formattedStartDate = dateFormat.format(startDate);
        String formattedEndDate = dateFormat.format(endDate);

        List<Object[]> results = salesRepository.findByDateRange(formattedStartDate, formattedEndDate);

        if (results.isEmpty()) {
            return Collections.emptyList();
        }

        List<SalesDateResponse> salesResponses = new ArrayList<>();
        for (Object[] result : results) {
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

            if (productRequest.getQuantity() > product.getStock()) {
                int currentStock = product.getStock();
                throw new RequestException("Not enough stock for product '" + product.getName() + "'. Current stock: " + currentStock);

            }

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
                    BigDecimal discountAmount = product.getProductPrice()
                            .multiply(product.getDiscount())
                            .divide(BigDecimal.valueOf(100));
                    BigDecimal discountedPrice = product.getProductPrice().subtract(discountAmount);
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