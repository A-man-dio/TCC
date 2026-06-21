package com.diagnostico.raioxbackend.service;

import com.diagnostico.raioxbackend.model.ImagemFormato;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String armazenarTemp(MultipartFile file, String hash, ImagemFormato formato);
    byte[] carregar(String chave);
    String salvarImagemFeedback(byte[] bytes, String caminho);
    void eliminarTemp(String chave);
}
