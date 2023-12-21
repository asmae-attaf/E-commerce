package com.back.shopback.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "`order`")  // Entourer le nom de la table avec des backticks
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int orderId;

    @Column(name = "order_quantity", nullable = false)
    private int orderQuantity;

    @Column(name = "order_price", nullable = false)
    private double orderPrice;

    @Column(name = "order_date")
    @Temporal(TemporalType.DATE)
    private Date orderDate;

    // @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "panier_id")
    private Panier panier;

    //@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;

    @ManyToOne
    @JoinColumn(name = "commande_id")
    private Commande commande;
}
