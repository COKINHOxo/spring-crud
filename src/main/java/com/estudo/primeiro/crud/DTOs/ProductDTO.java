package com.estudo.primeiro.crud.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ProductDTO {
    @NotBlank(message = "O nome não pode estar vazio")
    private String name;

    private String description;

    @Positive(message = "Preço deve ser maior que 0")
    private double price;

}
