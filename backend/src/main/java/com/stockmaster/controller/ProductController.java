package com.stockmaster.controller;

import com.stockmaster.dto.ProductDTO;
import com.stockmaster.entity.Products;
import com.stockmaster.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO productDTO) {
        try {
            Products products = new Products();
            products.setName(productDTO.getName());
            products.setBarcode(productDTO.getBarcode());
            products.setDescription(productDTO.getDescription());
            products.setSalePrice(productDTO.getSalePrice());
            products.setMinimal(productDTO.getMinimal());
            Products savedProducts = productService.saveProduct(products);
            return new ResponseEntity<>(mapToDTO(savedProducts), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        try {
            Products existingProducts = productService.getProductById(id);
            if (existingProducts != null) {
                existingProducts.setName(productDTO.getName());
                existingProducts.setBarcode(productDTO.getBarcode());
                existingProducts.setDescription(productDTO.getDescription());
                existingProducts.setSalePrice(productDTO.getSalePrice());
                existingProducts.setMinimal(productDTO.getMinimal());
                Products updatedProducts = productService.updateProduct(existingProducts);
                return ResponseEntity.ok(mapToDTO(updatedProducts));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        try {
            List<Products> products = productService.getAllProducts();
            if (!products.isEmpty()) {
                return ResponseEntity.ok(mapToDTOList(products));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        try {
            Products products = productService.getProductById(id);
            if (products != null) {
                return ResponseEntity.ok(mapToDTO(products));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private ProductDTO mapToDTO(Products products) {
        ProductDTO dto = new ProductDTO();
        dto.setId(products.getId());
        dto.setName(products.getName());
        dto.setBarcode(products.getBarcode());
        dto.setDescription(products.getDescription());
        dto.setSalePrice(products.getSalePrice());
        dto.setMinimal(products.getMinimal());
        dto.setStock(products.getStock());
        dto.setActive(products.isActive());
        return dto;
    }

    private List<ProductDTO> mapToDTOList(List<Products> products) {
        return products.stream().map(this::mapToDTO).toList();
    }
}