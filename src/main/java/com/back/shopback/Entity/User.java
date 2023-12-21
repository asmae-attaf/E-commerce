package com.back.shopback.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="user")

@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id",nullable = false)
    private int id;

    @Column(name="nom" ,nullable = false)
    private String nom;

    @Column(name="prenom",nullable = false)
    private String prenom;

    @Column(name="email",nullable = false)
    private String email;

    @Column(name="password",nullable = false)
    private String password;

    @Column(name="telephone",nullable = false)
    private String telephone;

    @Column(name="adresse",nullable = false)
    private String adresse;

    @Column(name = "pays",nullable = false)
    private String pays;

    @Column(name="ville",nullable = false)
    private String ville;

    @Column(name="codePostale",nullable = false)
    private int codePostale;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Evaluation> evaluation;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Favoris> favoris;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

   public User(int id, String nom, String prenom, String email, String encode, String telephone, String adresse, String pays, String ville, int codePostale) {
  this.id=id;
  this.nom=nom;
  this.prenom=prenom;
  this.email=email;
  this.password=encode;
  this.telephone=telephone;
  this.adresse=adresse;
  this.pays=pays;
  this.ville=ville;
  this.codePostale=codePostale;
   }
}
