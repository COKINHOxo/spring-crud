package com.estudo.primeiro.crud.dtos;

import com.estudo.primeiro.crud.entities.Product;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ProductDTO {
    private long id;

    @NotBlank(message = "O nome não pode estar vazio")
    @Size(min = 3, max = 300)
    private String name;

    @NotBlank
    @Size (max = 500)
    private String description;

    @NotNull(message = "O produto deve ter um preço")
    @PositiveOrZero(message = "Preço deve ser positivo ou zero")
    private Double price;

    @NotBlank(message = "O produto deve possuir uma categoria")
    private String category;

    @NotNull
    @Min(value = 0, message = ("Não é possível ter estoque negativo"))
    private Integer quantityInStock;

    @NotNull(message = "A data de lançamento é obrigatória")
    @PastOrPresent(message = "O produto não pode ter sido lançado no futuro")
    private LocalDate releaseDate;

    @DecimalMax(value = "5.0", message = ("A nota deve estar entre 0 e 5"))
    @DecimalMin(value = "0.0", message = ("A nota deve estar entre 0 e 5"))
    private Double rating;

    @NotNull(message = "O produto deve estar ativo, ou não")
    private Boolean active;

    @Pattern(regexp = "^(https?://).+", message = "O URL da imagem deve ser um URL válido começando com http ou https")
    private String imageUrl;
    @DecimalMin(value = "0", message = "O desconto deve ser positivo ou 0")
    @DecimalMax(value = "100", message = "O desconto não deve ser maior que 100%")
    private Double discount;

    public Product MapToEntity() {
        Product product = new Product();
        product.setName(this.getName());
        product.setDescription(this.getDescription());
        product.setPrice(this.getPrice());
        product.setCategory(this.getCategory());
        product.setActive(this.getActive());
        product.setRating(this.getRating());
        product.setImageUrl(this.getImageUrl());
        product.setQuantityInStock(this.getQuantityInStock());
        product.setReleaseDate(this.getReleaseDate());
        product.setDiscount(this.getDiscount());
        return product;
    }

}
