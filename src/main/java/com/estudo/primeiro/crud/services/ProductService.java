package com.estudo.primeiro.crud.services;

import com.estudo.primeiro.crud.dtos.ProductDTO;
import com.estudo.primeiro.crud.entities.Product;
import com.estudo.primeiro.crud.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository){
        this.repository = repository;
    }

    public ProductDTO Create(ProductDTO dto) {
        Product product = dto.MapToEntity();
        repository.save(product);

        return product.MapToDTO();
    }

    public List<ProductDTO> FindAll(){
        return repository.findAll().stream().map(Product::MapToDTO).toList();
    }

    public Optional<ProductDTO> FindById(long id){
        return repository.findById(id).map(Product::MapToDTO);
    }


    public void Delete(Long id){
        Optional<Product> optionalProduct = repository.findById(id);

        if (optionalProduct.isEmpty()) {
            // TODO: criar mensagem de erro
            return;
        }

        repository.deleteById(id);
    }

    public ProductDTO Update(ProductDTO dto, Long id) {
        Optional<Product> optionalProduct = repository.findById(id);

        if (optionalProduct.isEmpty()) {
            // TODO: criar mensagem de erro
            return null;
        }

        Product product = optionalProduct.get();
        product.UpdateProduct(dto.getName(), dto.getDescription(), dto.getPrice());
        repository.save(product);

        return product.MapToDTO();
    }
}
