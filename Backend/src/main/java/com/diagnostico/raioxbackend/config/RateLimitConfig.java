package com.diagnostico.raioxbackend.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitConfig {

    @Value("${rate-limit.analysis-requests-per-minute:10}")
    private int requestsPerMinute;

    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    public boolean tryConsume(String usuarioId) {
        Bucket bucket = buckets.computeIfAbsent(usuarioId, this::criarBucket);
        return bucket.tryConsume(1);
    }

    private Bucket criarBucket(String usuarioId) {
        Bandwidth limit = Bandwidth.classic(
                requestsPerMinute,
                Refill.greedy(requestsPerMinute, Duration.ofMinutes(1)));
        return Bucket.builder().addLimit(limit).build();
    }
}
