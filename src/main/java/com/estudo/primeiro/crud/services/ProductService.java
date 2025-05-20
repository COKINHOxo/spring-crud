package com.estudo.primeiro.crud.services;

import com.estudo.primeiro.crud.entities.Product;
import com.estudo.primeiro.crud.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository){
        this.repository = repository;
    }

    public List<Product> findAll(){
        return repository.findAll();
    }

    public Product findById(long id){
        return repository.findById(id).orElse(null);
    }

    public Product save(Product product){
        return repository.save(product);
    }

    public void delete(Long id){
       repository.deleteById(id);
    }


}
