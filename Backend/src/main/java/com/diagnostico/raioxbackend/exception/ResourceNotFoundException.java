package com.diagnostico.raioxbackend.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, String id) {
        super(resource + " não encontrado: " + id);
    }
}
