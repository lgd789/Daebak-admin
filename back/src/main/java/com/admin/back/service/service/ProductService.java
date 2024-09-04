package com.admin.back.service.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.admin.back.dto.OptionDto;
import com.admin.back.dto.ProductDealDto;
import com.admin.back.dto.ProductDto;
import com.admin.back.entity.ProductEntity;

public interface ProductService {
    public List<ProductDto> getProducts();

    public ProductDto updateProduct(ProductDto productDto);

    public List<ProductDealDto> getDealProducts();

    public ProductDealDto updateDealProducts(ProductDealDto productDeal);

    public ProductDealDto saveDealProducts(ProductDealDto productDeal);

    public ProductDealDto deleteDealProducts(ProductDealDto productDeal);

    public ProductDto addProduct(ProductDto product, MultipartFile image, MultipartFile detailImage);

    public void deleteProduct(Long productId);

    public ProductDto updateImage(Long productId, MultipartFile image);

    public ProductDto updateProductOption(Long productId, List<OptionDto> options);
}
