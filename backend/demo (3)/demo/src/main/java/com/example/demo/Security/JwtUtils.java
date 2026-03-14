package com.example.demo.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    private static final String SECRET_TOKEN = "ajbkjdbckhdhsdbhjdsbhjsdhjbsdchjcbh";
    private static final int EXPIRATION_TIME = 24 * 60 * 60 * 1000;

    private Key getkey() {
        return Keys.hmacShaKeyFor(SECRET_TOKEN.getBytes());
    }

    public String generateToken(String email, String role) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + EXPIRATION_TIME))
                .signWith(getkey())
                .compact();
    }

    public String ExtractEmail(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getkey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    public Boolean validatetoken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getkey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }


}
