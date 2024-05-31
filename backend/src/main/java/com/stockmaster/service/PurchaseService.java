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
<<<<<<< HEAD
    public PurchaseResponseDTO createPurchase(PurchaseRequestDTO requestDTO) {
        final Purchase purchase = new Purchase();
        purchase.setBill(requestDTO.getBill());
        purchase.setDate(requestDTO.getDate());
        purchase.setIdSupplier(requestDTO.getSupplier_id());
        purchase.setTotal(calculateTotal(requestDTO.getProducts()));
=======
    public Purchase MakeAPurchase(DtoPurchaseResponse dtoPurchaseResponse) {
>>>>>>> 3b0587dcdd6b13f3faaefc256c3d2c11d092d101

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


<<<<<<< HEAD
    private PurchaseResponseDTO mapToResponseDTO(final Purchase purchase) {
        final PurchaseResponseDTO dto = new PurchaseResponseDTO();
        dto.setId(purchase.getId());
        dto.setBill(purchase.getBill());
        dto.setDate(purchase.getDate());

        final SupplierResponseDTO supplierDTO = supplierRepository.findById(purchase.getIdSupplier())
                .map(supplier -> {
                    final SupplierResponseDTO sDto = new SupplierResponseDTO();
                    sDto.setId(supplier.getId());
                    sDto.setName(supplier.getName());
                    sDto.setCompanyCode(supplier.getCompanyCode());
                   sDto.setActive(supplier.isActive());
                    return sDto;
                }).orElse(null);
        dto.setSupplier(supplierDTO);

        final List<PurchaseProductDTO> products = purchase.getProducts().stream().map(product -> {
            final PurchaseProductDTO productDTO = new PurchaseProductDTO();
            productDTO.setIdProduct(product.getIdProduct());
            productDTO.setQuantity(product.getQuantity());
            return productDTO;
        }).collect(Collectors.toList());

        dto.setProducts(products);
        dto.setTotal(purchase.getTotal());
        return dto;
    }
}
=======
>>>>>>> 3b0587dcdd6b13f3faaefc256c3d2c11d092d101
