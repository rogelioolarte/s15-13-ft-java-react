package com.stockmaster.service;

import com.stockmaster.entity.Product;
import com.stockmaster.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) throws ProductException {
        // Verificar si el producto ya existe por código de barras
        Product existingProduct = productRepository.findByBarcode(product.getBarcode());
        if (existingProduct != null) {
            if (!existingProduct.isActive()) {
                // Si el producto existe y está desactivado, lo activamos y actualizamos
                existingProduct.setActive(true);
                productRepository.save(existingProduct);
                throw new ProductException("Producto activado con éxito");
            }
            // Si el producto ya está activo, lanzamos una excepción indicando que ya existe
            throw new ProductException("El producto ya existe y está activo");
        }
        // Si el producto no existe, lo creamos
      return  productRepository.save(product);
       // throw new ProductException("Producto creado con éxito");
    }
    public class ProductException extends Exception {
        public ProductException(String message) {
            super(message);
        }
    }

    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        if (product != null) {
            product.setActive(false);
            productRepository.save(product);
        }
    }
}