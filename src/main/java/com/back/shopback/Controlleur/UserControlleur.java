package com.back.shopback.Controlleur;

import com.back.shopback.Entity.Produit;
import com.back.shopback.Entity.User;
import com.back.shopback.Service.ProduitService;
import com.back.shopback.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserControlleur {
    @Autowired
    UserService userService;

    @PutMapping("/api/user/update/{id}")

    public void updateUser(@RequestBody User user) {
        userService.updateUser(user);
    }

    @DeleteMapping("/api/User/delete/{id}")

    public void deleteuser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }

    @GetMapping("/api/user/Allusers")

    public List<User> getAllUser() {
        return userService.getAllUsers();
    }

    @GetMapping("/api/user/{id}")

    public Optional<User> getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }
}