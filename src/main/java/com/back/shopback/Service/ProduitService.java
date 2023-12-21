package com.back.shopback.Service;

import com.back.shopback.Entity.Produit;
import com.back.shopback.Repository.PanierRepository;
import com.back.shopback.Repository.ProduitRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {
    private final ProduitRepository produitRepository;

    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }
    public void addProduit(Produit produit){
        produitRepository.save(produit);
    }
    @Transactional
    public void updateProduit(Produit produit){
        produitRepository.save(produit);
    }
    public void deleteProduit(Integer id){
        produitRepository.deleteById(id);
    }
    public List<Produit> getAllProduits(){
      return  produitRepository.findAll();
    }
    public Optional<Produit> getProduitById(Integer id){
        return produitRepository.findById(id);
    }
}
