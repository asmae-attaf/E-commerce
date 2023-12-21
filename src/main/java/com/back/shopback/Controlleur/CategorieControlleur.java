package com.back.shopback.Controlleur;

import com.back.shopback.Entity.Categorie;
import com.back.shopback.Service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CategorieControlleur {
    @Autowired
    CategorieService categorieService;
    @PostMapping("/api/categorie/addSous")
    public void AddSousCategorie(@RequestBody List<Categorie>  categorie){
        categorieService.addSousCategorie(categorie);
    }
    @PostMapping("/api/categorie/add")
    public int AddCategorie(@RequestBody Categorie categorie) {
        return categorieService.addCategorie(categorie);

    }

    @PutMapping("/api/categorie/update/{id}")
    public void updateCategorie(@RequestBody Categorie categorie){
        categorieService.UpdateCategorie(categorie);
    }
    @DeleteMapping("/api/categorie/delete/{id}")
    public void deleteCategorie(@PathVariable Integer id){
        categorieService.deleteCategorie(id);
    }
    @GetMapping("/api/categorie/AllCategorie")
    public List<Categorie> getAllCategorie(){
        return categorieService.getAllCategorie();
    }
    @GetMapping("/api/categorie/{id}")
    public Optional<Categorie> getCategorieById(@PathVariable Integer id){
        return categorieService.getCategorieById(id);
    }
}
