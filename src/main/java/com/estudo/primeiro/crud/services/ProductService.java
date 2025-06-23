package com.estudo.primeiro.crud.services;

import com.estudo.primeiro.crud.dtos.ProductDTO;
import com.estudo.primeiro.crud.entities.Product;
import com.estudo.primeiro.crud.exceptions.ProductNotFoundException;
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

    public ProductDTO FindById(long id){
        Product product = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return product.MapToDTO();

    }


    public void Delete(Long id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        repository.delete(product);
    }

    public ProductDTO Update(ProductDTO dto, Long id) {
        Optional<Product> optionalProduct = repository.findById(id);

        if (optionalProduct.isEmpty()) {
            throw new ProductNotFoundException(id);
        }

        Product product = optionalProduct.get();
        product.UpdateProduct(dto.getName(), dto.getDescription(), dto.getPrice(), dto.getCategory(), dto.getQuantityInStock(), dto.getReleaseDate(), dto.getRating(), dto.getActive(), dto.getImageUrl(), dto.getDiscount());
        repository.save(product);

        return product.MapToDTO();
    }
}
