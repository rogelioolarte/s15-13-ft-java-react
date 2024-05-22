package com.stockmaster.service;

import com.stockmaster.dto.SaleDTO;
import com.stockmaster.dto.SalesProductDTO;
import com.stockmaster.entity.Sale;
import com.stockmaster.entity.SalesProduct;
import com.stockmaster.repository.SaleRepository;
import com.stockmaster.repository.SalesProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SalesProductRepository salesProductRepository;

    @Transactional
    public Sale createSale(SaleDTO saleDTO) {
        Sale sale = new Sale();
        sale.setIdCustomer(saleDTO.getIdCustomer());
        sale.setIdTaxes(saleDTO.getIdTaxes());
        sale.setDate(saleDTO.getDate());
        sale.setDiscount(saleDTO.getDiscount());
        sale.setTotal(saleDTO.getTotal());

        List<SalesProduct> products = new ArrayList<>();
        for (SalesProductDTO productDTO : saleDTO.getProducts()) {
            SalesProduct product = new SalesProduct();
            product.setSale(sale); // Establece la relación con la venta
            product.setIdProduct(productDTO.getIdProduct());
            product.setQuantity(productDTO.getQuantity());
            products.add(product);
        }
        sale.setProducts(products);

        Sale savedSale = saleRepository.save(sale);
        for (SalesProduct product : products) {
            salesProductRepository.save(product);
        }

        return savedSale;
    }
}