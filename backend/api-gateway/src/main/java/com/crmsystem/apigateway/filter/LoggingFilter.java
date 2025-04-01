package com.crmsystem.apigateway.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Component
@Slf4j
public class LoggingFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String requestId = UUID.randomUUID().toString();
        
        log.info("Request ID: {} | Method: {} | Path: {} | Source IP: {}",
                requestId,
                request.getMethod(),
                request.getURI().getPath(),
                request.getRemoteAddress().getAddress().getHostAddress()
        );
        
        long startTime = System.currentTimeMillis();
        
        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            long endTime = System.currentTimeMillis();
            long duration = endTime - startTime;
            
            log.info("Request ID: {} | Response Status: {} | Duration: {}ms",
                    requestId,
                    exchange.getResponse().getStatusCode(),
                    duration
            );
        }));
    }

    @Override
    public int getOrder() {
        // Set a high precedence
        return -1;
    }
} 