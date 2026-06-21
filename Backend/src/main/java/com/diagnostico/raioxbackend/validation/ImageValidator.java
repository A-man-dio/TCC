package com.diagnostico.raioxbackend.validation;

import com.diagnostico.raioxbackend.exception.InvalidImageException;
import com.diagnostico.raioxbackend.model.ImagemFormato;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Component
public class ImageValidator {

    private static final long MAX_SIZE_BYTES = 10L * 1024 * 1024;

    public ImagemFormato validarEDetectarFormato(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidImageException("Nenhuma imagem fornecida.");
        }
        if (file.getSize() > MAX_SIZE_BYTES) {
            throw new InvalidImageException("Tamanho máximo permitido: 10MB.");
        }

        try {
            byte[] header = lerHeader(file.getInputStream(), 132);
            return detectarFormato(header);
        } catch (IOException e) {
            throw new InvalidImageException("Não foi possível ler a imagem.");
        }
    }

    private ImagemFormato detectarFormato(byte[] header) {
        if (isJpeg(header)) return ImagemFormato.JPEG;
        if (isPng(header))  return ImagemFormato.PNG;
        if (isDicom(header)) return ImagemFormato.DICOM;
        throw new InvalidImageException("Formato não suportado. Use JPEG, PNG ou DICOM (.dcm).");
    }

    private boolean isJpeg(byte[] h) {
        return h.length >= 2
                && (h[0] & 0xFF) == 0xFF
                && (h[1] & 0xFF) == 0xD8;
    }

    private boolean isPng(byte[] h) {
        return h.length >= 4
                && (h[0] & 0xFF) == 0x89
                && h[1] == 0x50   // P
                && h[2] == 0x4E   // N
                && h[3] == 0x47;  // G
    }

    private boolean isDicom(byte[] h) {
        // DICOM: "DICM" nos bytes 128-131
        return h.length >= 132
                && h[128] == 0x44  // D
                && h[129] == 0x49  // I
                && h[130] == 0x43  // C
                && h[131] == 0x4D; // M
    }

    private byte[] lerHeader(InputStream is, int tamanho) throws IOException {
        byte[] buffer = new byte[tamanho];
        int lido = is.read(buffer, 0, tamanho);
        if (lido < 4) throw new InvalidImageException("Ficheiro demasiado pequeno.");
        return buffer;
    }
}
