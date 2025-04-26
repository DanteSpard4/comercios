package uts.comercios.web.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    @Value("HelloWorld")
    private String secret;

    public String BuildToken(String username) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("auth0")
                    .withSubject(username)
                    .sign(algorithm);
        } catch (JWTCreationException exception){
            throw new RuntimeException(exception + exception.getMessage());
        }
    }

    public DecodedJWT decodeToken(String token) {
        return JWT.require(Algorithm.HMAC256(secret))
                .withIssuer("auth0")
                .build()
                .verify(token);
    }

    public String getSubject(String token) {
        return decodeToken(token).getSubject();
    }
    
}
