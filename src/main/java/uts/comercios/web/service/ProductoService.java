package uts.comercios.web.service;

import org.springframework.stereotype.Service;
import uts.comercios.web.dto.ProductoDto;
import uts.comercios.web.model.ProductoEntity;
import uts.comercios.web.repository.ProductoRepository;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public ProductoDto createProducto(ProductoDto productoDto) {
        var p = new ProductoEntity();
        p.setNombre(productoDto.nombre());
        p.setPrecio(productoDto.precio());
        p.setStock(productoDto.stock());
        productoRepository.save(p);
        return productoDto;
    }

    public ProductoDto findProductoById(Long id) {
        var p = productoRepository.findById(id).orElseThrow();
        return new ProductoDto(p.getId(), p.getNombre(), p.getPrecio(), p.getStock());
    }

    public List<ProductoDto> findAllProductos() {
        return productoRepository.findAll().stream()
            .map(p -> new ProductoDto(p.getId(), p.getNombre(), p.getPrecio(), p.getStock()))
            .toList();
    }

    public ProductoDto updateProducto(ProductoDto productoDto) {
        // update the product
        var p =productoRepository.findById(productoDto.id()).orElseThrow();
        p.setNombre(productoDto.nombre());
        p.setPrecio(productoDto.precio());
        p.setStock(productoDto.stock());
        productoRepository.save(p);
        return productoDto;
    }

    public void deleteProducto(Long id) {
        productoRepository.deleteById(id);
    }
}
