package com.back.shopback.Controlleur;

import com.back.shopback.Entity.Favoris;
import com.back.shopback.Entity.Produit;
import com.back.shopback.Service.FavorisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class FavorisControlleur {
    @Autowired
    FavorisService FavorisService;

    @PostMapping("/api/Favoris/add")

    public void addFavoris(@RequestBody Favoris Favoris) {
        FavorisService.addFavoris(Favoris);
    }

    @PutMapping("/api/Favoris/update/{id}")

    public void updateFavoris(@RequestBody Favoris Favoris) {
        FavorisService.updateFavoris(Favoris);
    }

    // FavorisControlleur.java
    @DeleteMapping("/api/Favoris/delete/{id}")
    public ResponseEntity<String> deleteFavoris(@PathVariable Integer id) {
        try {
            FavorisService.deleteFavoris(id);
            return ResponseEntity.ok("Favori supprimé avec succès.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la suppression du favori.");
        }
    }
    @GetMapping("/api/Favoris/AllFavoris")
    public List<Favoris> getAllFavoris() {
        return FavorisService.getAllFavoriss();
    }

    @GetMapping("/api/Favoris/{id}")

    public Optional<Favoris> getFavorisById(@PathVariable Integer id) {
        return FavorisService.getFavorisById(id);
    }

    @GetMapping("/api/Favoris/user/{userId}/products")
    public List<Produit> getFavoriteProductsByUserId(@PathVariable Integer userId) {
        return FavorisService.getFavoriteProductsByUserId(userId);
    }

}