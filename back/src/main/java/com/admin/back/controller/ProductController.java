package com.admin.back.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.admin.back.dto.OptionDto;
import com.admin.back.dto.ProductDealDto;
import com.admin.back.dto.ProductDto;
import com.admin.back.entity.ProductEntity;
import com.admin.back.service.service.ProductService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("product")
@RequiredArgsConstructor
public class ProductController {
    
    private final ProductService productService;

    @GetMapping("getProducts")
    public ResponseEntity<List<ProductDto>> getProducts() {
        List<ProductDto> productDTOs = productService.getProducts();

        return ResponseEntity.ok().body(productDTOs);
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestParam("image") MultipartFile image,
                                        @RequestParam("detailImage") MultipartFile detailImage,
                                        @ModelAttribute ProductDto product) {

        ProductDto updateProductDto = productService.addProduct(product, image, detailImage);
        
        return ResponseEntity.ok().body(updateProductDto);
    }


    @PostMapping("image")
    public ResponseEntity<?> updateImage(@RequestParam("image") MultipartFile image, 
                                        @RequestParam("productId") Long productId) {
        ProductDto updateProductDto = productService.updateImage(productId, image);
        
        return ResponseEntity.ok().body(updateProductDto);
    }
    
    @PutMapping
    public ResponseEntity<ProductDto> updateProduct(@RequestBody ProductDto product) {
        ProductDto updateProductDto = productService.updateProduct(product);
        
        return ResponseEntity.ok().body(updateProductDto);
    }


    @GetMapping("deal")
    public ResponseEntity<List<ProductDealDto>> getDealProducts() {
        List<ProductDealDto> productDealDTOs = productService.getDealProducts();

        return ResponseEntity.ok().body(productDealDTOs);
    }

    @PostMapping("deal")
    public ResponseEntity<ProductDealDto> updateDealProducts(@RequestBody ProductDealDto productDeal) {
        ProductDealDto updateProductDeaDto = productService.updateDealProducts(productDeal);
        
        return ResponseEntity.ok().body(updateProductDeaDto);
    }
    
    @PutMapping("deal")
    public ResponseEntity<ProductDealDto> saveDealProducts(@RequestBody ProductDealDto productDeal) {
        ProductDealDto saveProductDealDto = productService.saveDealProducts(productDeal);
        
        return ResponseEntity.ok().body(saveProductDealDto);
    }

     
    @PostMapping("deal/delete")
    public ResponseEntity<ProductDealDto> deleteDealProducts(@RequestBody ProductDealDto productDeal) {
        ProductDealDto deleteProductDealDto = productService.deleteDealProducts(productDeal);
        
        return ResponseEntity.ok().body(deleteProductDealDto);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable("productId") Long productId) {
        productService.deleteProduct(productId);

        return ResponseEntity.ok().body(productId);
    }

    
    @PostMapping("option/{productId}")
    public ResponseEntity<?> updateProductOption(@PathVariable("productId") Long productId, @RequestBody List<OptionDto> options) {
        ProductDto updateProductDto = productService.updateProductOption(productId, options);

        return ResponseEntity.ok().body(updateProductDto);
    }
    
}
