package com.diagnostico.raioxbackend.service;

import com.diagnostico.raioxbackend.exception.StorageException;
import com.diagnostico.raioxbackend.model.ImagemFormato;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Primary
public class LocalStorageService implements StorageService {

    private final Path raizTemp;
    private final Path raizFeedback;

    public LocalStorageService(
            @Value("${storage.local.root:./uploads}") String rootTemp,
            @Value("${storage.feedback.root:./feedback-data}") String rootFeedback) {
        this.raizTemp = Paths.get(rootTemp, "temp");
        this.raizFeedback = Paths.get(rootFeedback);
        criarDiretorios(this.raizTemp);
        criarDiretorios(this.raizFeedback.resolve("triagem"));
        criarDiretorios(this.raizFeedback.resolve("diagnostico"));
    }

    @Override
    public String armazenarTemp(MultipartFile file, String hash, ImagemFormato formato) {
        Path destino = raizTemp.resolve(hash + formato.extensao());
        try {
            Files.write(destino, file.getBytes());
            return destino.toString();
        } catch (IOException e) {
            throw new StorageException("Falha ao armazenar imagem temporária", e);
        }
    }

    @Override
    public byte[] carregar(String chave) {
        try {
            return Files.readAllBytes(Paths.get(chave));
        } catch (IOException e) {
            throw new StorageException("Falha ao carregar imagem: " + chave, e);
        }
    }

    @Override
    public String salvarImagemFeedback(byte[] bytes, String caminho) {
        Path destino = raizFeedback.resolve(caminho);
        try {
            Files.createDirectories(destino.getParent());
            Files.write(destino, bytes);
            return destino.toString();
        } catch (IOException e) {
            throw new StorageException("Falha ao guardar imagem de feedback", e);
        }
    }

    @Override
    public void eliminarTemp(String chave) {
        try {
            Files.deleteIfExists(Paths.get(chave));
        } catch (IOException e) {
            throw new StorageException("Falha ao eliminar ficheiro temporário", e);
        }
    }

    private void criarDiretorios(Path path) {
        try {
            Files.createDirectories(path);
        } catch (IOException e) {
            throw new StorageException("Não foi possível criar directório: " + path, e);
        }
    }
}
