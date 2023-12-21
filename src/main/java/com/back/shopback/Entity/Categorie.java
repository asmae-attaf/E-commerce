package com.back.shopback.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categorie")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;
    @Column(name = "image")
    private String image;
    @JsonIgnore

    @OneToMany(mappedBy = "parentCategorie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Categorie> sousCategories ; // Initialisez la liste ici
    @ManyToOne
    @JoinColumn(name = "parent_categorie_id")
    private Categorie parentCategorie;
    @JsonIgnore
    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Evaluation> evaluation;
    @JsonIgnore
    @OneToMany(mappedBy = "categorie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Produit> produits;
}



