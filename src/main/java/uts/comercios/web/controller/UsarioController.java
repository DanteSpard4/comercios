package uts.comercios.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import uts.comercios.web.config.jwt.JwtService;
import uts.comercios.web.dto.DatosJWTToken;
import uts.comercios.web.dto.UserDto;
import uts.comercios.web.model.UserEntity;

@RestController
public class UsarioController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UsarioController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/api/v1/auth")
    public ResponseEntity<DatosJWTToken> authenticate(@RequestBody UserDto usuario) {
        Authentication authenticationToken =
                new UsernamePasswordAuthenticationToken(usuario.nombre(),usuario.clave());
        Authentication usuarioAuth = authenticationManager.authenticate(authenticationToken);
        UserEntity user = (UserEntity) usuarioAuth.getPrincipal();
        var jwtToken = jwtService.BuildToken(user.getUsername());
        return ResponseEntity.ok(new DatosJWTToken(jwtToken));
    }
}
