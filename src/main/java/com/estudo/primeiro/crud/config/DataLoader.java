package com.estudo.primeiro.crud.config;

import com.estudo.primeiro.crud.entities.Product;
import com.estudo.primeiro.crud.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;

public class DataLoader implements CommandLineRunner {
    private final ProductRepository productRepository;

    public DataLoader(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Avoid inserting duplicates
        if (productRepository.count() == 0) {
            Product p1 = new Product("Notebook", 2999.99);
            Product p2 = new Product("Mouse", 149.90);
            Product p3 = new Product("Teclado", 249.90);

            productRepository.save(p1);
            productRepository.save(p2);
            productRepository.save(p3);

            System.out.println("Dummy data inserted!");
        }
    }

}
