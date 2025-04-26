package uts.comercios.web.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import uts.comercios.web.repository.UsuarioRepository;

@Service
@RequiredArgsConstructor
public class AutenticacionService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByNombre(username).orElseThrow(() -> new UsernameNotFoundException(username));
    }
}
