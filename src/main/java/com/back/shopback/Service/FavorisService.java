package com.back.shopback.Service;

import com.back.shopback.Entity.Favoris;
import com.back.shopback.Entity.Produit;
import com.back.shopback.Repository.FavorisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavorisService {
    private final FavorisRepository favorisRepository;

    @Autowired
    public FavorisService(FavorisRepository favorisRepository) {
        this.favorisRepository = favorisRepository;
    }

    public List<Produit> getFavoriteProductsByUserId(Integer userId) {
        List<Favoris> favorisList = favorisRepository.findByUserId(userId);

        return favorisList.stream()
                .map(Favoris::getProduit)
                .collect(Collectors.toList());
    }

    public List<Favoris> getFavorisByUserId(Integer userId) {
        return favorisRepository.findByUserId(userId);
    }

    public void addFavoris(Favoris favoris) {
        favorisRepository.save(favoris);
    }

    public void updateFavoris(Favoris favoris) {
        favorisRepository.save(favoris);
    }

    public void deleteFavoris(Integer id) {
        favorisRepository.deleteById(id);
    }

    public List<Favoris> getAllFavoriss() {
        return favorisRepository.findAll();
    }

    public Optional<Favoris> getFavorisById(Integer id) {
        return favorisRepository.findById(id);
    }
}
