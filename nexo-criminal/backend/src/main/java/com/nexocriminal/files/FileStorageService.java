package com.nexocriminal.files;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${nexo.uploads.directorio:uploads}")
    private String uploadDir;

    @PostConstruct
    public void init() {
        try {
            Path root = Paths.get(uploadDir);
            if (!Files.exists(root)) {
                Files.createDirectories(root);
            }
            Path desaparecidasDir = root.resolve("desaparecidas");
            if (!Files.exists(desaparecidasDir)) {
                Files.createDirectories(desaparecidasDir);
            }
        } catch (IOException e) {
            throw new RuntimeException("No se pudo crear el directorio de uploads", e);
        }
    }

    /**
     * Guarda un archivo y retorna la URL relativa para acceder.
     */
    public String guardarFotoDesaparecida(MultipartFile archivo) {
        if (archivo.isEmpty()) {
            throw new IllegalArgumentException("El archivo está vacío");
        }

        // Validar que sea imagen
        String contentType = archivo.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Solo se aceptan archivos de imagen");
        }

        // Validar tamaño (max 5MB)
        if (archivo.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("La imagen no puede superar los 5MB");
        }

        try {
            String original = archivo.getOriginalFilename();
            String extension = (original != null && original.contains("."))
                    ? original.substring(original.lastIndexOf("."))
                    : ".jpg";

            String nombreUnico = UUID.randomUUID().toString() + extension;

            Path destino = Paths.get(uploadDir).resolve("desaparecidas").resolve(nombreUnico);
            Files.copy(archivo.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);

            // URL relativa que servirá Spring
            return "/files/desaparecidas/" + nombreUnico;
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar el archivo", e);
        }
    }

    public void eliminarArchivo(String urlRelativa) {
        if (urlRelativa == null || !urlRelativa.startsWith("/files/")) return;

        String relativa = urlRelativa.replace("/files/", "");
        Path ruta = Paths.get(uploadDir).resolve(relativa);
        try {
            Files.deleteIfExists(ruta);
        } catch (IOException e) {
            // Log pero no romper
            System.err.println("No se pudo eliminar archivo: " + ruta);
        }
    }
}