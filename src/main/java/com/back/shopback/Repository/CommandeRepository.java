package com.back.shopback.Repository;

import com.back.shopback.Entity.Commande;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande, Integer> {

}