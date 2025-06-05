package com.estudo.primeiro.crud.controllers;

import com.estudo.primeiro.crud.DTOs.ProductDTO;
import com.estudo.primeiro.crud.entities.Product;
import com.estudo.primeiro.crud.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private Product mapToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setCategory(dto.getCategory());
        product.setActive(dto.getActive());
        product.setRating(dto.getRating());
        product.setImageUrl(dto.getImageUrl());
        product.setQuantityInStock(dto.getQuantityInStock());
        product.setReleaseDate(dto.getReleaseDate());
        product.setDiscount(dto.getDiscount());
        return product;
    }

    private ProductDTO mapToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setCategory(product.getCategory());
        dto.setActive(product.getActive());
        dto.setRating(product.getRating());
        dto.setImageUrl(product.getImageUrl());
        dto.setQuantityInStock(product.getQuantityInStock());
        dto.setReleaseDate(product.getReleaseDate());
        dto.setDiscount(product.getDiscount());
        return dto;
    }

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProductDTO> getAllproducts() {
        return service.findAll().stream().map(this::mapToDTO).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Product product = service.findById(id);
        return product != null ? ResponseEntity.ok(mapToDTO(product)) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO dto) {
        Product product = mapToEntity(dto);
        Product saved = service.save(product);
        ProductDTO responseDto = mapToDTO(saved);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductDTO dto) {
        Product existing = service.findById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        existing.setName(dto.getName());
        existing.setPrice(dto.getPrice());
        existing.setDescription(dto.getDescription());
        Product updated = service.save(existing);
        return ResponseEntity.ok(mapToDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        Product existing = service.findById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}


