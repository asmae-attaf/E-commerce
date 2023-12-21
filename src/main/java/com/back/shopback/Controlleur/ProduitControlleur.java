package com.back.shopback.Controlleur;

import com.back.shopback.Entity.Produit;
import com.back.shopback.Service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ProduitControlleur {
    @Autowired
    ProduitService produitService;
    @PostMapping("/api/produit/add")
    public void addProduit(@RequestBody Produit produit){
        produitService.addProduit(produit);
    }
    @PutMapping("/api/produit/update/{id}")
    public void updateProduit(@RequestBody Produit produit){
        produitService.updateProduit(produit);
    }
    @DeleteMapping("/api/produit/delete/{id}")

    public void deleteProduit(@PathVariable Integer id){
        produitService.deleteProduit(id);
    }
    @GetMapping("/api/produit/Allproduits")
    public List<Produit> getAllProduit(){
        return produitService.getAllProduits();
    }
    @GetMapping("/api/produit/{id}")
    public Optional<Produit> getProduitById(@PathVariable Integer id){
        return  produitService.getProduitById(id);
    }
}
