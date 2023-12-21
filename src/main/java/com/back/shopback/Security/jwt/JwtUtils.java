package com.back.shopback.Security.jwt;

import com.back.shopback.Service.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${bezkoder.app.jwtSecret}")
    private String jwtSecret; // Clé secrète utilisée pour signer et vérifier le jeton

    @Value("${bezkoder.app.jwtExpirationMs}")
    private int jwtExpirationMs; // Durée de validité du jeton en millisecondes

    // Méthode pour générer un jeton JWT
    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        // Construction du jeton JWT
        return Jwts.builder()
                .setSubject((userPrincipal.getUsername())) // Définit le nom d'utilisateur comme sujet du jeton
                .setIssuedAt(new Date()) // Définit la date de création du jeton (actuelle)
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)) // Définit la date d'expiration
                .signWith(key(), SignatureAlgorithm.HS256) // Signe le jeton avec la clé secrète et l'algorithme HS256
                .compact(); // Compile le jeton en une chaîne compacte
    }

    // Méthode pour obtenir le nom d'utilisateur à partir d'un jeton JWT
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    // Méthode pour valider un jeton JWT
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }

    // Méthode pour obtenir la clé secrète
    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }
}
