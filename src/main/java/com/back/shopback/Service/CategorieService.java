package com.back.shopback.Service;

import com.back.shopback.Entity.Categorie;
import com.back.shopback.Repository.CategorieRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategorieService {
    private final CategorieRepository categorieRepository;

    public CategorieService(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    @Transactional
    public int addCategorie(Categorie categorie) {
        Categorie savedCategorie = categorieRepository.save(categorie);
        return savedCategorie.getId();
    }

    @Transactional
    public void addSousCategorie(List<Categorie>categories) {
        categorieRepository.saveAll(categories);
    }
    public void deleteCategorie(Integer id) {
        categorieRepository.deleteById(id);
    }
    public void UpdateCategorie(Categorie categorie) {
        categorieRepository.save(categorie);
    }

    public List<Categorie> getAllCategorie() {
        return categorieRepository.findAll();
    }

    public Optional<Categorie> getCategorieById(Integer id) {
        return categorieRepository.findById(id);
    }
}
