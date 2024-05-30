package com.stockmaster.service;

import com.stockmaster.dto.Purchase.*;
import com.stockmaster.dto.SupplierResponseDTO;
import com.stockmaster.entity.Product;
import com.stockmaster.entity.Purchase;
import com.stockmaster.entity.ProductPurchase;
import com.stockmaster.repository.PurchaseRepository;
import com.stockmaster.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository purchaseRepository;


    @Transactional
    public void MakeAPurchase(Purchase purchase, List<ProductPurchase> ProductPurchase){



        List<Product> productos = new ArrayList<>();

        for (ProductPurchase productoCompra : ProductPurchase) {
            // Aquí podrías recuperar el Producto desde el ProductoCompra o realizar alguna lógica específica
            Product producto = productoCompra.getProduct();
            int cantidad = productoCompra.getQuantity();

            // Realizar lógica relacionada con la cantidad y el producto si es necesario

            // Agregar el producto a la lista tantas veces como indique la cantidad
            for (int i = 0; i < cantidad; i++) {
                productos.add(producto);
            }
        }

        purchase.setProduct(productos); // Agregar los productos a la compra

        purchaseRepository.save(purchase); // Guardar la compra en la base de datos
    }


    }


