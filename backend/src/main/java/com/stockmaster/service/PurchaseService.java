package com.stockmaster.service;

import com.stockmaster.dto.Purchase.DtoPurchaseResponse;
import com.stockmaster.entity.Product;
import com.stockmaster.entity.ProductPurchase;
import com.stockmaster.entity.Purchase;
import com.stockmaster.entity.Supplier;
import com.stockmaster.repository.ProductPurchaseRepository;
import com.stockmaster.repository.PurchaseRepository;
import com.stockmaster.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private ProductPurchaseRepository productPurchaseRepository;

    @Autowired
    private ProductService productService;
    //getSupplierById
    @Autowired
    private SupplierRepository supplierService;
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

        Set<ProductPurchase> productPurchase = dtoPurchaseResponse.productList().stream().map(ProductPurchase::new).collect(Collectors.toSet());


        //productPurchase.forEach((f) ->  productPurchaseRepository.save(f));

var suplierdb = supplierService.getReferenceById(dtoPurchaseResponse.supplier());
        List<Product> products = productPurchase.stream().map(Product::new).toList();

        Purchase purchase = Purchase.builder()
                .bill(dtoPurchaseResponse.bill())
                .product(products)
                .date(dtoPurchaseResponse.date())
                .idSupplier(suplierdb)
                .build();

        var purchaseDb = purchaseRepository.save(purchase);

        for (ProductPurchase p : productPurchase) {
            Product product = productService.getProductById(p.getProduct().getId());
            //p.setProduct(Product.builder().id(p.getProduct().getId()).build());
            p.setProduct(product);
            p.setPurchase(purchaseDb);
            productPurchaseRepository.save(p);
        }

        return purchaseDb;
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
