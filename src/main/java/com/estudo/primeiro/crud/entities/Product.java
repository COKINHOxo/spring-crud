package com.estudo.primeiro.crud.entities;

import com.estudo.primeiro.crud.dtos.ProductDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;
    private String description;
    private Double price;
    private String category;
    private Integer quantityInStock;
    private LocalDate releaseDate;
    private Double rating;
    private Boolean active;
    private String imageUrl;
    private Double discount;




    public Product(String name, Double price) {
        this.name = name;
        this.price = price;
    }

    public void UpdateProduct(String name, String description,Double price, String category, Integer quantityInStock, LocalDate releaseDate, Double rating, Boolean active, String imageUrl,Double discount){
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.quantityInStock = quantityInStock;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.active = active;
        this.imageUrl = imageUrl;
        this.discount = discount;
    }


    public ProductDTO MapToDTO() {
        ProductDTO dto = new ProductDTO();
        dto.setId(this.getId());
        dto.setName(this.getName());
        dto.setDescription(this.getDescription());
        dto.setPrice(this.getPrice());
        dto.setCategory(this.getCategory());
        dto.setActive(this.getActive());
        dto.setRating(this.getRating());
        dto.setImageUrl(this.getImageUrl());
        dto.setQuantityInStock(this.getQuantityInStock());
        dto.setReleaseDate(this.getReleaseDate());
        dto.setDiscount(this.getDiscount());
        return dto;
    }
}
