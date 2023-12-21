package com.back.shopback.Service;

import com.back.shopback.Entity.Commande;
import com.back.shopback.Repository.CommandeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommandeService {
    private final CommandeRepository commandeRepository;

    public CommandeService(CommandeRepository commandeRepository) {
        this.commandeRepository = commandeRepository;
    }

    public void addCommande(Commande commande){
        commandeRepository.save(commande);
    }
    public void updateCommaande(Commande commande){
        commandeRepository.save(commande);
    }
    public void deleteCommande(Integer id){
        commandeRepository.deleteById(id);
    }
    public List<Commande> getAllCommandes(){
        return commandeRepository.findAll();
    }
    public Optional<Commande> getCommandesById(Integer id){
        return commandeRepository.findById(id);
    }
}
