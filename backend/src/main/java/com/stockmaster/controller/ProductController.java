package com.stockmaster.controller;

import com.stockmaster.dto.product.ProductDTO;
import com.stockmaster.entity.Product;
import com.stockmaster.service.ProductService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/product")
<<<<<<< HEAD
@Api(value = "Purchase Management System", description = "Operations pertaining to purchases in Purchase Management System")
=======
@CrossOrigin("*")
>>>>>>> f566aab1c5e7d01d0c72e3ae7f2878ede6a19507
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO productDTO) {
        try {
            Product product = new Product();
            product.setName(productDTO.getName());
            product.setBarcode(productDTO.getBarcode());
            product.setDescription(productDTO.getDescription());
            product.setSalePrice(productDTO.getSalePrice());
            product.setMinimal(productDTO.getMinimal());
            Product savedProduct = productService.saveProduct(product);
            return new ResponseEntity<>(mapToDTO(savedProduct), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        try {
            Product existingProduct = productService.getProductById(id);
            if (existingProduct != null) {
                existingProduct.setName(productDTO.getName());
                existingProduct.setBarcode(productDTO.getBarcode());
                existingProduct.setDescription(productDTO.getDescription());
                existingProduct.setSalePrice(productDTO.getSalePrice());
                existingProduct.setMinimal(productDTO.getMinimal());
                Product updatedProduct = productService.updateProduct(existingProduct);
                return ResponseEntity.ok(mapToDTO(updatedProduct));
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
            List<Product> products = productService.getAllProducts();
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
            Product product = productService.getProductById(id);
            if (product != null) {
                return ResponseEntity.ok(mapToDTO(product));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private ProductDTO mapToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setBarcode(product.getBarcode());
        dto.setDescription(product.getDescription());
        dto.setSalePrice(product.getSalePrice());
        dto.setMinimal(product.getMinimal());
        dto.setStock(product.getStock());
        dto.setActive(product.isActive());
        return dto;
    }

    private List<ProductDTO> mapToDTOList(List<Product> products) {
        return products.stream().map(this::mapToDTO).toList();
    }
}