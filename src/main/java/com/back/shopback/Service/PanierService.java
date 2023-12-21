package com.back.shopback.Service;

import com.back.shopback.Entity.Panier;
import com.back.shopback.Repository.PanierRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PanierService {
    private final PanierRepository panierRepository;

    public PanierService(PanierRepository panierRepository) {
        this.panierRepository = panierRepository;
    }
    public void addPanier(Panier panier){
        panierRepository.save(panier);
    }
    public void updatePanier(Panier panier){
        panierRepository.save(panier);
    }
    public void deletePanier(Integer id){
        panierRepository.deleteById(id);
    }
    public List<Panier>  getAllPanier(){
        return panierRepository.findAll();
    }
    public Optional<Panier> getPanierById(Integer id){
        return panierRepository.findById(id);
    }
}
