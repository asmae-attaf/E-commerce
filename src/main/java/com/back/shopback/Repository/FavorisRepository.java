package com.back.shopback.Repository;

import com.back.shopback.Entity.Favoris;
import com.back.shopback.Entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavorisRepository extends JpaRepository<Favoris,Integer> {
    List<Favoris> findByUserId(Integer userId);
    List<Produit> getFavoriteProductsByUserId(Integer userId);

}
