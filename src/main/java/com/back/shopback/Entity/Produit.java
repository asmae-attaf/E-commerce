package com.back.shopback.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
@Entity
@Table(name="produit")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nom", nullable = false)
    private String nom;
    @Column(name = "imageproduit", nullable = false)
    private String imageproduit;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "prix", nullable = false)
    private Double prix;
    @Column(name = "stock", nullable = false)
    private int stock;
    @ManyToOne
    @JoinColumn(name = "categorie_id")
    private Categorie categorie;
    @JsonIgnore
    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orderes;
    @JsonIgnore
    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Favoris> favoris;
    @JsonIgnore
    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Image> image;
    @JsonIgnore
    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Evaluation> evaluation;

}
