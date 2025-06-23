package com.estudo.primeiro.crud.controllers;

import com.estudo.primeiro.crud.dtos.ProductDTO;
import com.estudo.primeiro.crud.services.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }




    @Operation(summary = "Listar todos os produtos", description = "Retorna uma lista contendo todos os produtos no sistema.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso!"),
        @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping
    public List<ProductDTO> getAllproducts() {
        return service.FindAll();
    }



    @Operation(summary = "Buscar produto por ID", description = "Retorna o produto com o ID selecionado")
    @ApiResponses({
            @ApiResponse(responseCode = "404", description = "Produto não encontrado"),
            @ApiResponse(responseCode = "200", description = "Produto encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(service.FindById(id));
    }

    @Operation(summary = "Criar um produto no sistema", description = "Cria um produto baseado nas informações enviadas ao sistema")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Produto criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Falha na criação do produto"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO dto) {
        return ResponseEntity.ok(service.Create(dto));
    }



    @Operation(summary = "Editar um produto existente", description = "Edita um produto existente, baseando-se no seu ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Produto editado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Falha na edição do produto"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductDTO dto) throws Exception {
        ProductDTO existing = service.Update(dto, id);

        return ResponseEntity.ok(existing);
    }



    @Operation(summary = "Deletar um produto", description = "Deleta um produto do sistema, baseando-se no seu id")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Produto deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) throws Exception {
        service.Delete(id);
        return ResponseEntity.noContent().build();
    }
}


