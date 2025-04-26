package uts.comercios.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uts.comercios.web.model.UserEntity;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByNombre(String nombre);
}
