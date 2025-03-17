package com.example.Backend.controller;

import com.example.Backend.dto.AssetDTO;
import com.example.Backend.service.AssetService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.100.19:8081" , "http://localhost:8081"})
public class AssetController {
    private final AssetService assetService;

    @PostMapping("/{userId}")
    public ResponseEntity<AssetDTO> createAsset(
            @PathVariable Long userId,
            @RequestBody AssetDTO assetDTO) {

        AssetDTO createdAsset = assetService.createAsset(assetDTO, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAsset);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<AssetDTO>> getAllAssets(@PathVariable Long userId) {
        return ResponseEntity.ok(assetService.getAllAssetsByUserId(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        return assetService.deleteAsset(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetDTO> updateAsset(
            @PathVariable Long id,
            @RequestBody AssetDTO assetDTO) {
        System.out.println("Received update request: " + assetDTO);

        AssetDTO updatedAsset = assetService.updateAsset(id, assetDTO);
        return updatedAsset != null
                ? ResponseEntity.ok(updatedAsset)
                : ResponseEntity.notFound().build();
    }

}
