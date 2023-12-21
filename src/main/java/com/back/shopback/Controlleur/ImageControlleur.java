package com.back.shopback.Controlleur;


import com.back.shopback.Entity.Categorie;
import com.back.shopback.Entity.Image;
import com.back.shopback.Service.CategorieService;
import com.back.shopback.Service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ImageControlleur {
    @Autowired
    ImageService imageService;
    @PostMapping("/api/image/add")
    public void AddImage(@RequestBody Image image){
        imageService.addImage(image);
    }
    @PutMapping("/api/image/update/{id}")
    public void updateImage(@RequestBody Image image){
        imageService.UpdateImage(image);
    }
    @DeleteMapping("/api/image/delete/{id}")
    public void deleteImage(@PathVariable Integer id){
        imageService.deleteImage(id);
    }
    @GetMapping("/api/image/AllImage")
    public List<Image> getAllImage(){
        return imageService.getAllImage();
    }
    @GetMapping("/api/image/categorie/{id}")
    public Optional<Image> getImgeById(@PathVariable Integer id){
        return imageService.getImageById(id);
    }
}
