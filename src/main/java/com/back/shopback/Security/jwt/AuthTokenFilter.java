package com.back.shopback.Security.jwt;

import com.back.shopback.Service.UserDetailsServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException {
        try {
            // Étape 1 : Extraction du jeton JWT de l'en-tête Authorization de la requête
            String jwt = parseJwt(request);

            // Étape 2 : Vérification du jeton JWT
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                // Étape 3 : Extraction du nom d'utilisateur à partir du jeton JWT
                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                // Étape 4 : Chargement des détails de l'utilisateur depuis la base de données
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                // Étape 5 : Création de l'objet d'authentification Spring Security
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());

                // Étape 6 : Ajout des détails de la requête à l'objet d'authentification
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Étape 7 : Définition de l'objet d'authentification dans le contexte de sécurité
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // Gestion des exceptions en cas d'erreur lors de l'authentification
            logger.error("Cannot set user authentication: {}", e);
        }

        try {
            // Étape 8 : Poursuite du traitement de la requête
            filterChain.doFilter(request, response);
        } catch (IOException e) {
            // Gestion des exceptions en cas d'erreur lors du traitement de la requête
            throw new RuntimeException(e);
        }
    }

    private String parseJwt(HttpServletRequest request) {
        // Extraction du jeton JWT de l'en-tête Authorization de la requête
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            // Suppression du préfixe "Bearer " pour obtenir le jeton JWT
            return headerAuth.substring(7);
        }

        // Retourne null si aucun jeton JWT n'est trouvé
        return null;
    }
}