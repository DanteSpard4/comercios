package uts.comercios.web.dto;

import java.math.BigDecimal;

public record ProductoDto(
        Long id,
        String nombre,
        BigDecimal precio,
        Integer stock
) {
}
