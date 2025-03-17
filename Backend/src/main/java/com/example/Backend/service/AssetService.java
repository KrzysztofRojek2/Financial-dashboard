package com.example.Backend.service;

import com.example.Backend.dto.AssetDTO;
import com.example.Backend.model.Asset;
import com.example.Backend.model.UserEntity;
import com.example.Backend.repository.AssetRepository;
import com.example.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssetService {

    private final AssetRepository assetRepository;
    private final UserRepository userRepository;

    @Autowired
    public AssetService(AssetRepository assetRepository, UserRepository userRepository) {
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
    }

    public AssetDTO mapAssetToDTO(Asset asset) {
        AssetDTO assetDTO = new AssetDTO();

        assetDTO.setId(asset.getId());
        assetDTO.setName(asset.getName());
        assetDTO.setCost(asset.getCost());
        assetDTO.setColor(asset.getColor());

        return assetDTO;
    }

    public List<AssetDTO> getAllAssetsByUserId(Long userId) {
        List<Asset> assets = assetRepository.findAllByUserId(userId);
        return assets.stream()
                .map(this::mapAssetToDTO)
                .collect(Collectors.toList());
    }

    public Asset mapDTOToAsset(AssetDTO assetDTO) {
        Asset asset = new Asset();

        asset.setName(assetDTO.getName());
        asset.setCost(assetDTO.getCost());
        asset.setColor(assetDTO.getColor());

        return asset;
    }

    public boolean deleteAsset(Long id) {
        if (assetRepository.existsById(id)) {
            assetRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public AssetDTO updateAsset(Long id, AssetDTO assetDTO) {
        return assetRepository.findById(id)
                .map(asset -> {
                    asset.setName(assetDTO.getName());
                    asset.setCost(assetDTO.getCost());
                    asset.setColor(assetDTO.getColor());
                    assetRepository.save(asset);
                    return mapAssetToDTO(asset);
                })
                .orElse(null);
    }

    public AssetDTO createAsset(AssetDTO assetDTO, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Asset asset = mapDTOToAsset(assetDTO);
        asset.setUser(user);
        asset = assetRepository.save(asset);

        return mapAssetToDTO(asset);
    }

}

