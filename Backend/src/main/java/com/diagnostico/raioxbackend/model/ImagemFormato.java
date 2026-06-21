package com.diagnostico.raioxbackend.model;

public enum ImagemFormato {
    JPEG, PNG, DICOM;

    public String extensao() {
        return switch (this) {
            case JPEG  -> ".jpg";
            case PNG   -> ".png";
            case DICOM -> ".dcm";
        };
    }
}
