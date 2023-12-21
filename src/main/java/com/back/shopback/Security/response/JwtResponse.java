package com.back.shopback.Security.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    @JsonProperty("token")
    private String token;
    private String type = "Bearer";
    @JsonProperty("id")
    private int id;
    @JsonProperty("nom")
    private String nom;
    @JsonProperty("prenom")
    private String prenom;
    @JsonProperty("email")
    private String email;
    @JsonProperty("password")
    private String password;
    @JsonProperty("telephone")
    private String telephone;
    @JsonProperty("adresse")
    private String adresse;
    @JsonProperty("pays")
    private String pays;
    @JsonProperty("ville")
    private String ville;
    @JsonProperty("codePostale")
    private int codePostale;
    @JsonProperty("roles")
    private List<String> roles;

    public  JwtResponse(String token, int id, String nom, String prenom, String email, String password, String telephone, String adresse, String pays, String ville, int codePostale, List<String> roles) {
        this.token = token;
        this.id =id;
        this.email = email;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse= adresse;
        this.telephone= telephone;
        this.pays=pays;
        this.ville=ville;
        this.codePostale=codePostale;
        this.roles = roles;
    }
}
