package com.stockmaster.service.sales;

import com.stockmaster.dto.Purchase.ProductDtoResponsePUrchase;
import com.stockmaster.dto.customer.CustomerResponse;
import com.stockmaster.dto.customer.CustomerSalesSavedResponse;
import com.stockmaster.dto.product.ProductSalesSavedResponse;
import com.stockmaster.dto.product.ProductSavingRequest;
import com.stockmaster.dto.product.ProductResponse;
import com.stockmaster.dto.sales.*;
import com.stockmaster.dto.taxes.TaxesResponse;
import com.stockmaster.entity.Product;
import com.stockmaster.entity.Taxes;
import com.stockmaster.entity.customer.Customer;
import com.stockmaster.entity.sales.Sales;
import com.stockmaster.entity.sales.SalesProduct;
import com.stockmaster.entity.sales.dtoSalesResponse;
import com.stockmaster.exception.RequestException;
import com.stockmaster.repository.*;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

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
            BigDecimal taxPercentage = (BigDecimal) result[8]; // Se modifica el índice para el porcentaje de impuesto
            Double total = ((BigDecimal) result[9]).doubleValue();
            String formattedSaleDate = (String) result[10];
            String description = (String) result[11];
            String barcode = (String) result[12];
            int stock = (Integer) result[13];

            SalesResponse saleResponse = salesMap.get(saleId);
            if (saleResponse == null) {
                saleResponse = SalesResponse.builder()
                        .id_sale(saleId)
                        .date(new SimpleDateFormat("dd/MM/yyyy").parse(formattedSaleDate))
                        .product(new ArrayList<>())
                        .totalPrice(BigDecimal.valueOf(total))
                        .build();
                salesMap.put(saleId, saleResponse);
            }

            if (saleResponse.getTax() == null) {
                TaxesResponse taxesResponse = TaxesResponse.builder()
                        .name(taxName)
                        .percentage(taxPercentage)
                        .build();
                saleResponse.setTax(taxesResponse);
            }

            ProductSalesSavedResponse productResponse = ProductSalesSavedResponse.builder()
                    .productName(productName)
                    .barcode(barcode)
                    .salePrice(price)
                    .quantity(quantity)
                    .discount(discount)
                    .build();
            saleResponse.getProduct().add(productResponse);
        }

        return new ArrayList<>(salesMap.values());
    }

    public List<SalesResponse> findByDateRange(String startDate, String endDate) throws ParseException {
        List<Object[]> results = salesRepository.findByDateRange(startDate, endDate);

        return mapToSalesResponseList(results);
    }

    private List<SalesResponse> mapToSalesResponseList(List<Object[]> results) throws ParseException {
        //List<Object[]> results = salesRepository.findAllSales();

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
            BigDecimal taxPercentage = (BigDecimal) result[8]; // Se modifica el índice para el porcentaje de impuesto
            Double total = ((BigDecimal) result[9]).doubleValue();
            String formattedSaleDate = (String) result[10];
            String description = (String) result[11];
            String barcode = (String) result[12];
            int stock = (Integer) result[13];

            SalesResponse saleResponse = salesMap.get(saleId);
            if (saleResponse == null) {
                saleResponse = SalesResponse.builder()
                        .id_sale(saleId)
                        .date(new SimpleDateFormat("dd/MM/yyyy").parse(formattedSaleDate))
                        .product(new ArrayList<>())
                        .totalPrice(BigDecimal.valueOf(total))
                        .build();
                salesMap.put(saleId, saleResponse);
            }

            if (saleResponse.getTax() == null) {
                TaxesResponse taxesResponse = TaxesResponse.builder()
                        .name(taxName)
                        .percentage(taxPercentage)
                        .build();
                saleResponse.setTax(taxesResponse);
            }

            ProductSalesSavedResponse productResponse = ProductSalesSavedResponse.builder()
                    .productName(productName)
                    .barcode(barcode)
                    .salePrice(price)
                    .quantity(quantity)
                    .discount(discount)
                    .build();
            saleResponse.getProduct().add(productResponse);
        }

        return new ArrayList<>(salesMap.values());
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

            int updatedStock = product.getStock() - productRequest.getQuantity();
            product.setStock(updatedStock);
            productRepository.save(product);

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
    public SalesResponseDTO convertToDto(Sales sales) {
        SalesResponseDTO dto = new SalesResponseDTO();
        dto.setId(sales.getId());
        dto.setDate(sales.getDate());

        TaxesResponse taxesResponse = new TaxesResponse();
        taxesResponse.setName(sales.getTax().getName());
        taxesResponse.setPercentage(sales.getTax().getPercentage());
        dto.setTax(taxesResponse);

        CustomerSalesSavedResponse customerResponse = new CustomerSalesSavedResponse();
        customerResponse.setId(sales.getCustomer().getId());
        customerResponse.setName(sales.getCustomer().getName());
        dto.setCustomer(customerResponse);

        List<ProductSalesSavedResponse> productDTOs = sales.getSalesProducts().stream()
                .map(sp -> {
                    ProductSalesSavedResponse productDTO = new ProductSalesSavedResponse();
                    productDTO.setProductName(sp.getProduct().getName());
                    productDTO.setBarcode(sp.getProduct().getBarcode());
                    productDTO.setSalePrice(sp.getProduct().getSalePrice());
                    productDTO.setQuantity(sp.getQuantity());
                    productDTO.setDiscount(sp.getDiscount());

                    return productDTO;
                })
                .collect(Collectors.toList());

        dto.setProduct(productDTOs);
        dto.setTotalPrice(sales.getTotal());

        return dto;
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
    public List<AnaliticsSalesResponse> getAnalitics() {
        List<Object[]> results = salesRepository.getTotalSalesByMonth();
        List<AnaliticsSalesResponse> analyticsList = new ArrayList<>();

        for (Object[] result : results) {
            String month = (String) result[0];
            BigDecimal amount = (BigDecimal) result[1];
            AnaliticsSalesResponse analytics = AnaliticsSalesResponse.builder()
                    .month(month)
                    .amount(amount)
                    .build();
            analyticsList.add(analytics);
        }

        return analyticsList;
    }

    public Set<dtoSalesResponse> findAllSale() {
        List<Sales> listSales = salesRepository.findAll();
        Set<dtoSalesResponse> listSalesResponse = new HashSet<>();
        for(Sales sale : listSales){
            List<ProductDtoResponsePUrchase> productResponse = sale.getSalesProducts().stream().map(ProductDtoResponsePUrchase::new).toList();
            var s = new dtoSalesResponse(sale.getId(),sale.getCustomer(),sale.getTax(),sale.getDate(),
                    sale.getTotal(),productResponse);


            listSalesResponse.add(s);
        }
        return listSalesResponse;
    }
}