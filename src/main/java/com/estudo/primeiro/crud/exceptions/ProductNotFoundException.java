package com.estudo.primeiro.crud.exceptions;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id) {
        super("Produto com ID " + id + " não encontrado");
    }
}

