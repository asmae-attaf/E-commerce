package com.back.shopback.Service;



import com.back.shopback.Entity.Image;
import com.back.shopback.Repository.CategorieRepository;
import com.back.shopback.Repository.ImageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }


    public void addImage(Image image){
        imageRepository.save(image);
    }
    public void deleteImage(Integer id){
        imageRepository.deleteById(id);
    }
    public void UpdateImage(Image image){
        imageRepository.save(image);
    }
    public List<Image> getAllImage(){
        return imageRepository.findAll();
    }
    public Optional<Image> getImageById(Integer id){
        return imageRepository.findById(id);
    }
}
