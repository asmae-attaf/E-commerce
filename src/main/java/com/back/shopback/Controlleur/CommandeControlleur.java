package com.back.shopback.Controlleur;

import com.back.shopback.Entity.Commande;
import com.back.shopback.Entity.Panier;
import com.back.shopback.Service.CommandeService;
import com.back.shopback.Service.PanierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class CommandeControlleur {
    @Autowired
    CommandeService commandeService;
    @PostMapping("/api/commande/add")
    public void addcommande(@RequestBody Commande commande) {
        commandeService.addCommande(commande);
    }
    @PutMapping("/api/commande/update/{id}")
    public void updatecommande(@RequestBody Commande commande) {
        commandeService.updateCommaande(commande);
    }
    @DeleteMapping("/api/commande/delete/{id}")
    public void deletecommande(@PathVariable Integer id) {
        commandeService.deleteCommande(id);
    }


    @GetMapping("/api/commande/Allcommandes")

    public List<Commande> getAllcommande() {
        return commandeService.getAllCommandes();
    }
    @GetMapping("/api/commande/{id}")
    public Optional<Commande> getcommandeById(@PathVariable Integer id) {
        return commandeService.getCommandesById(id);
    }
}