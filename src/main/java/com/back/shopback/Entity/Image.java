package com.back.shopback.Entity;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name="Image")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="image",nullable = false)
    private String image;
    @ManyToOne
    @JoinColumn(name="produit_id")
    @JsonIgnore
    private Produit produit;
}



