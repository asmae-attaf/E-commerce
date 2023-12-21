package com.back.shopback.Service;


import com.back.shopback.Entity.User;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;
    @Getter
    private int id;
    @Getter
    private String nom;
    @Getter
    private String prenom;
    @Getter
    private String email;
    @Getter
    private String password;
    @Getter
    private String telephone;
    @Getter
    private String adresse;
    @Getter
    private String pays;
    @Getter
    private String ville;
    @Getter
    private int codePostale;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(int id,String email,String password, String nom, String prenom, String telephone,
                           String adresse,String pays,String ville,int codePostale,
                           Collection<? extends GrantedAuthority> authorities) {
        this.id =id;
        this.email = email;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.telephone=telephone;
        this.adresse=adresse;
       this.pays=pays;
       this.ville= ville;
        this.codePostale=codePostale;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getNom(),
                user.getPrenom(),
               user.getTelephone(),
                user.getAdresse(),
                user.getPays(),
                user.getVille(),
             user.getCodePostale(),

                authorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }


    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}