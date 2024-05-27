package com.stockmaster.service;

import com.stockmaster.entity.Products;
import com.stockmaster.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Products saveProduct(Products products) {
        return productRepository.save(products);
    }

    public Products updateProduct(Products products) {
        return productRepository.save(products);
    }

    public Products getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Products> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Long id) {
        Products products = getProductById(id);
        if (products != null) {
            products.setActive(false);
            productRepository.save(products);
        }
    }
}