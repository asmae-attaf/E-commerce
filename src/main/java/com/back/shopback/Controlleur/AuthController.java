package com.back.shopback.Controlleur;


import com.back.shopback.Entity.ERole;
import com.back.shopback.Entity.Role;
import com.back.shopback.Entity.User;
import com.back.shopback.Repository.RoleRepository;
import com.back.shopback.Repository.UserRepository;
import com.back.shopback.Security.jwt.JwtUtils;
import com.back.shopback.Security.request.LoginRequest;
import com.back.shopback.Security.request.SignupRequest;
import com.back.shopback.Service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import com.back.shopback.Security.response.MessageResponse;
import com.back.shopback.Security.response.JwtResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
    private JwtUtils jwt;

    @PostMapping("/api/auth/signin")

    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
     // L'utilisateur soumet une requête de connexion avec son email et son mot de passe.

   // Le gestionnaire d'authentification (authenticationManager) tente d'authentifier l'utilisateur.
        Authentication authentication = authenticationManager.authenticate(
                //  Crée une instance d'UsernamePasswordAuthenticationToken avec les informations de connexion.
                // Cela permet de vérifier si l'email et le mot de passe sont valides.
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        // 3. Si l'authentification est réussie, l'utilisateur est considéré comme authentifié.
        // Nous le plaçons dans le contexte de sécurité pour cette session.
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 4. Nous récupérons les détails de l'utilisateur authentifié, y compris ses autorisations (rôles).
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // 5. Nous récupérons les autorisations (rôles) de l'utilisateur.
        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

        // 6. Nous créons une réponse au format JwtResponse contenant les informations de l'utilisateur
        //    ainsi que le jeton JWT généré pour cette session.
        JwtResponse response = new JwtResponse(
                jwt.generateJwtToken(authentication),
                userDetails.getId(),
                userDetails.getNom(),
                userDetails.getPrenom(),
                userDetails.getEmail(),
                userDetails.getPassword(),
                userDetails.getTelephone(),
                userDetails.getAdresse(),
                userDetails.getPays(),
                userDetails.getVille(),
                userDetails.getCodePostale(),
                authorities.stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList())
        );

        // 7. Nous renvoyons la réponse au client, ce qui permet à l'utilisateur de se connecter
        //    avec succès et d'obtenir son jeton JWT pour les futures requêtes.
        return ResponseEntity.ok(response);
    }





    @PostMapping("/api/auth/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }


        User user = new User(signUpRequest.getId(),
                signUpRequest.getNom(),
                signUpRequest.getPrenom(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getTelephone(),
                signUpRequest.getAdresse(),
                signUpRequest.getPays(),
                signUpRequest.getVille(),
                signUpRequest.getCodePostale()

        );
        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();


        strRoles.forEach(role -> {
            if (role.equals("admin")) {
                Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(adminRole);
            } else if (role.equals("user")) {
                Role modRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(modRole);
            }
        });


        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));

    }
}
