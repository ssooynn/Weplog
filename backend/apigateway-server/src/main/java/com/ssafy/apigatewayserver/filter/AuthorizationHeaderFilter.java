package com.ssafy.apigatewayserver.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.security.Key;

@Component
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {

    private final Environment env;

    public AuthorizationHeaderFilter(Environment env) {
        super(Config.class);
        this.env = env;
    }

    // login -> token -> user(with token) -> header(include token)
    @Override
    public GatewayFilter apply(Config config) {

        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                return onError(exchange, "No Authorization Header", HttpStatus.UNAUTHORIZED);
            }

            String authorizationHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);

            String jwt = authorizationHeader.replace("Bearer", "");

            if (!isJwtValid(jwt, request)) {
                return onError(exchange, "JWT token is not Valid", HttpStatus.UNAUTHORIZED);
            }

            return chain.filter(exchange).then(Mono.fromRunnable(() -> {

            }));
        };

    }

    private boolean isJwtValid(String jwt, ServerHttpRequest request) {
        boolean returnValue = true;

        String subject = null;
        Key secretKey = Keys.hmacShaKeyFor(env.getProperty("token.secret").getBytes(StandardCharsets.UTF_8));

        try {
            subject = Jwts.parserBuilder().setSigningKey(secretKey).build()
                    .parseClaimsJws(jwt).getBody()
                    .getSubject();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedJwtException e) {
            throw new RuntimeException(e);
        } catch (MalformedJwtException e) {
            throw new RuntimeException(e);
        } catch (SignatureException e) {
            throw new RuntimeException(e);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }


        if (subject == null || subject.isEmpty()) {
            return false;
        }

        String userId = request.getHeaders().get("userId").get(0);
        if (!userId.equals(subject)) {
            returnValue = false;
        }

        return returnValue;
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {

        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);

        log.error(err);

        return response.setComplete();
    }

    public static class Config {

    }
}
