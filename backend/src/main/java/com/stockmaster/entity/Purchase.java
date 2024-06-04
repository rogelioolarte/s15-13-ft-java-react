package com.stockmaster.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "purchase")
//@IdClass(PurchaseProductId.class)
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long purchaseId;

    private String bill;

    @Temporal(TemporalType.DATE)
    private Date date = new Date();

    @ManyToOne
    @JoinColumn(name = "id_supplier", referencedColumnName = "id")
    private Supplier supplier;

    private BigDecimal total;

    //@NotFound(action = NotFoundAction.IGNORE)
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "purchase_products",
            joinColumns = @JoinColumn(name = "id_purchase" , referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id_product", referencedColumnName = "id")
    )
    private List<Product> products;

    @Column(insertable=false, updatable=false)
    @ElementCollection
    @CollectionTable(name = "products_purchase", joinColumns = @JoinColumn(name = "id_purchase"))
    private List<PurchaseProduct> productsPurchased;


    @OneToMany(mappedBy="purchase")
    private List<PurchaseProduct> PurchaseProduct;

}