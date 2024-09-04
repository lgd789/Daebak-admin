package com.admin.back.service.implement;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.admin.back.dto.OptionDto;
import com.admin.back.dto.ProductDealDto;
import com.admin.back.dto.ProductDto;
import com.admin.back.entity.OptionEntity;
import com.admin.back.entity.ProductDealEntity;
import com.admin.back.entity.ProductDetailEntity;
import com.admin.back.entity.ProductEntity;
import com.admin.back.repository.OptionRepository;
import com.admin.back.repository.ProductDealRepository;
import com.admin.back.repository.ProductRepository;
import com.admin.back.service.service.ProductService;
import com.admin.back.service.service.S3Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService  {

    private final S3Service s3Service;
    private final ProductRepository productRepository;
    private final ProductDealRepository productDealRepository;
    private final OptionRepository optionRepository;

    @Override
    public List<ProductDto> getProducts() {
        List<ProductEntity> productEntities = productRepository.findAllWithDetails();

        List<ProductDto> productDTOs = productEntities.stream()
            .map(ProductDto::fromEntity)
            .collect(Collectors.toList());

        return productDTOs;
    }

    public ProductDto updateProduct(ProductDto productDto) {
        Optional<ProductEntity> optionalProductEntity = productRepository.findById(productDto.getProductId());

        if (optionalProductEntity.isPresent()) {
            ProductEntity productEntity = optionalProductEntity.get();

            productEntity.setCategory(productDto.getCategory());
            productEntity.setName(productDto.getName());
            productEntity.setStockQuantity(productDto.getStockQuantity());
            productEntity.setRegularPrice(productDto.getRegularPrice());
            productEntity.setSalePrice(productDto.getSalePrice());
            productEntity.setShippingCost(productDto.getShippingCost());
            productEntity.setDescription(productDto.getDescription());
            productEntity.setArrivalDate(productDto.getArrivalDate());
            productEntity.setRecommended(productDto.getRecommended());
            productEntity.setPopularity(productDto.getPopularity());
            productEntity.setMaxQuantityPerDelivery(productDto.getMaxQuantityPerDelivery());

            // if (image != null) {
            //     String imageUrl;
            //     try {
            //         imageUrl = s3Service.saveImageToS3(image, "product/" + UUID.randomUUID().toString());
            //         productEntity.setImageUrl(imageUrl);
            //     } catch (IOException e) {
            //         throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save image to S3", e);
            //     }
            // }

            ProductEntity updatedProductEntity = productRepository.save(productEntity);

            return ProductDto.fromEntity(updatedProductEntity);
        } else {
            throw new IllegalArgumentException("Product with ID " + productDto.getProductId() + " not found.");
        }
    }

    @Override
    public List<ProductDealDto> getDealProducts() {
        List<ProductDealEntity> productDealEntities = productDealRepository.findAll();
    
        List<ProductDealDto> productDealDTOs = productDealEntities.stream()
            .map(ProductDealDto::fromEntity)
            .collect(Collectors.toList());

        return productDealDTOs;
    }

    @Override
    public ProductDealDto updateDealProducts(ProductDealDto productDeal) {
        Optional<ProductDealEntity> optionalProductDealEntity= productDealRepository.findById(productDeal.getDealId());

        if (optionalProductDealEntity.isPresent()) {
            ProductDealEntity productDealEntity = optionalProductDealEntity.get();

            productDealEntity.setDealPrice(productDeal.getDealPrice());
            productDealEntity.setStartDate(productDeal.getStartDate());
            productDealEntity.setEndDate(productDeal.getEndDate());

            ProductDealEntity updatedProductDealEntity = productDealRepository.save(productDealEntity);
            
            return ProductDealDto.fromEntity(updatedProductDealEntity);
        } else {
            throw new IllegalArgumentException("Product with ID " + productDeal.getDealId() + " not found.");
        }
    }

    @Override
    public ProductDealDto saveDealProducts(ProductDealDto productDeal) {
        ProductDealEntity newPoductDealEntity = ProductDealDto.toEntity(productDeal);

        Optional<ProductDealEntity> optionalProductDealEntity = productDealRepository.findByProduct(newPoductDealEntity.getProduct());
        
        if (optionalProductDealEntity.isPresent()) {
            ProductDealEntity productDealEntity = optionalProductDealEntity.get();

            productDealEntity.setDealPrice(productDeal.getDealPrice());
            productDealEntity.setStartDate(productDeal.getStartDate());
            productDealEntity.setEndDate(productDeal.getEndDate());

            ProductDealEntity updatedProductDealEntity = productDealRepository.save(productDealEntity);
            return ProductDealDto.fromEntity(updatedProductDealEntity);
        } else {
            ProductDealEntity savedProductDealEntity = productDealRepository.save(newPoductDealEntity);
            return ProductDealDto.fromEntity(savedProductDealEntity);
        }

    }

    @Override
    public ProductDealDto deleteDealProducts(ProductDealDto productDeal) {
        Optional<ProductDealEntity> optionalProductDealEntity = productDealRepository.findById(productDeal.getDealId());

        if (optionalProductDealEntity.isPresent()) {
            productDealRepository.deleteById(productDeal.getDealId());

            return productDeal;
        } else {
            throw new IllegalArgumentException("Deal with ID " + productDeal.getDealId() + " not found.");
        }
    }

    @Override
    public ProductDto addProduct(ProductDto product, MultipartFile image, MultipartFile detailImage) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setCategory(product.getCategory());
        productEntity.setName(product.getName());
        productEntity.setStockQuantity(product.getStockQuantity());
        productEntity.setRegularPrice(product.getRegularPrice());
        productEntity.setSalePrice(product.getSalePrice());
        productEntity.setShippingCost(product.getShippingCost());
        productEntity.setDescription(product.getDescription());
        productEntity.setMaxQuantityPerDelivery(product.getMaxQuantityPerDelivery());

        List<OptionEntity> optionEntities = product.getOptions().stream()
            .filter(optionDto -> !optionDto.getName().isEmpty() && optionDto.getAddPrice() != null)
            .map(optionDto -> {
                OptionEntity optionEntity = new OptionEntity();
                System.out.println("optoin" + optionDto.getName());
                optionEntity.setName(optionDto.getName());
                optionEntity.setAddPrice(optionDto.getAddPrice());
                optionEntity.setProduct(productEntity); // Set the product entity in the option entity
                return optionEntity;
            }).collect(Collectors.toList());

        productEntity.setOptions(optionEntities);
        
        ProductDetailEntity productDetailEntity = new ProductDetailEntity();
        try {
            String imageUrl = s3Service.saveImageToS3(image, "product/");
            productEntity.setImageUrl(imageUrl);

            String detailImageUrl = s3Service.saveImageToS3(detailImage, "detail/");
            productDetailEntity.setImageUrl(detailImageUrl);


            productDetailEntity.setProduct(productEntity);
            productEntity.setProductDetail(productDetailEntity);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save image to S3", e);
        }
        

        ProductEntity updatedProductEntity = productRepository.save(productEntity);

        return ProductDto.fromEntity(updatedProductEntity);
    }

    @Transactional
    @Override
    public void deleteProduct(Long productId) {
        Optional<ProductEntity> optionalProduct = productRepository.findById(productId);
        
        if (optionalProduct.isPresent()) {
            ProductEntity productEntity = optionalProduct.get();
            productRepository.delete(productEntity);

            try {
                s3Service.deleteImageFromS3(productEntity.getImageUrl());
                s3Service.deleteImageFromS3(productEntity.getProductDetail().getImageUrl());
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete image to S3", e);
            }
        } else {
            throw new IllegalArgumentException("Product with ID " + productId + " not found.");
        }
    }

    @Override
    public ProductDto updateImage(Long productId, MultipartFile image) {
        Optional<ProductEntity> optionalProduct = productRepository.findById(productId);
        
        if (optionalProduct.isPresent()) {
            ProductEntity productEntity = optionalProduct.get();

            try {
                s3Service.deleteImageFromS3(productEntity.getImageUrl());

                String imageUrl;
                imageUrl = s3Service.saveImageToS3(image, "product/" + UUID.randomUUID().toString());
                productEntity.setImageUrl(imageUrl);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save image to S3", e);
            }

            ProductEntity updatedProductEntity = productRepository.save(productEntity);
            return ProductDto.fromEntity(updatedProductEntity);
        } else {
            throw new IllegalArgumentException("Product with ID " + productId + " not found.");
        }
    }

    @Override
    public ProductDto updateProductOption(Long productId, List<OptionDto> options) {
        System.out.println("productId" + productId);
        Optional<ProductEntity> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            ProductEntity productEntity = optionalProduct.get();

            List<OptionEntity> optionsToDelete = new ArrayList<>();
            for (OptionEntity existingOption : productEntity.getOptions()) {
                boolean optionExistsInRequest = options.stream()
                        .anyMatch(optionDto -> Objects.equals(optionDto.getOptionId(), existingOption.getOptionId()));
                if (!optionExistsInRequest) {
                    optionsToDelete.add(existingOption);
                }
            }
            productEntity.getOptions().removeAll(optionsToDelete);
            optionRepository.deleteAll(optionsToDelete);

            List<OptionEntity> optionEntities = new ArrayList<>();
            for (OptionDto optionDto : options) {
                if (optionDto.getName().isEmpty() || optionDto.getAddPrice() == null) continue;

                if (optionDto.getOptionId() != null) {
                    OptionEntity existingOption = productEntity.getOptions().stream()
                            .filter(option -> option.getOptionId().equals(optionDto.getOptionId()))
                            .findFirst()
                            .orElseThrow(() -> new IllegalArgumentException("Option with ID " + optionDto.getOptionId() + " not found."));
                    existingOption.setName(optionDto.getName());
                    existingOption.setAddPrice(optionDto.getAddPrice());
                    optionEntities.add(existingOption);
                } else {
                    OptionEntity newOption = new OptionEntity();
                    newOption.setProduct(productEntity);
                    newOption.setName(optionDto.getName());
                    newOption.setAddPrice(optionDto.getAddPrice());
                    optionEntities.add(newOption);
                }
            }
        
            productEntity.setOptions(optionEntities);

            productRepository.save(productEntity);

            return ProductDto.fromEntity(productEntity); 
        } else {
            throw new IllegalArgumentException("Product with ID " + productId + " not found.");
        }
    }
}
