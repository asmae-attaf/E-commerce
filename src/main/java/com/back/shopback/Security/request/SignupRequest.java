package com.back.shopback.Security.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {

    private int id;

    private String nom;

    private String prenom;

    private String email;

    private String password;

    private String telephone;

    private String adresse;

    private String pays;

    private String ville;

    private int codePostale;
    private Set<String> role;


}
