package uts.comercios.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import uts.comercios.web.dto.ProductoDto;
import uts.comercios.web.service.ProductoService;

import java.net.URI;
import java.util.List;

@RestController("/api/producto")
public class ProductoController {

    private ProductoService productoService;

    @PostMapping
    public ResponseEntity<ProductoDto>  createProducto(ProductoDto productoDto) {
        var producto = productoService.createProducto(productoDto);
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(producto.id())
            .toUri();
        return ResponseEntity.created(location).body(producto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDto> findProductoById(Long id) {
        var producto = productoService.findProductoById(id);
        return ResponseEntity.ok(producto);
    }

    @GetMapping
    public ResponseEntity<List<ProductoDto>> findAllProductos() {
        var productos = productoService.findAllProductos();
        return ResponseEntity.ok(productos);
    }

    @PatchMapping
    public ResponseEntity<ProductoDto> updateProducto(ProductoDto productoDto) {
        var producto = productoService.updateProducto(productoDto);
        return ResponseEntity.ok(producto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(Long id) {
        productoService.deleteProducto(id);
        return ResponseEntity.noContent().build();
    }
}
