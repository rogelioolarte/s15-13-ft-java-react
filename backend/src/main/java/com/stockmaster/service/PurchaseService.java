package com.stockmaster.service;

import com.stockmaster.dto.Purchase.DtoPurchaseResponse;
import com.stockmaster.entity.Product;
import com.stockmaster.entity.ProductPurchase;
import com.stockmaster.entity.Purchase;
import com.stockmaster.entity.Supplier;
import com.stockmaster.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository purchaseRepository;


    @Transactional
    public Purchase MakeAPurchase(DtoPurchaseResponse dtoPurchaseResponse) {

        List<ProductPurchase> ProductPurchase = dtoPurchaseResponse.productList().stream().map(ProductPurchase::new).toList();


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

        Purchase purchase = Purchase.builder()
                .bill(dtoPurchaseResponse.bill())
                .product(productos)
                .date(dtoPurchaseResponse.date())
                .idSupplier(Supplier.builder().id(dtoPurchaseResponse.supplier()).build())
                .build();


      return  purchaseRepository.save(purchase);
    }


}


