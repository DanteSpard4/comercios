package uts.comercios.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uts.comercios.web.model.ProductoEntity;

public interface ProductoRepository extends JpaRepository<ProductoEntity, Long> {

}
