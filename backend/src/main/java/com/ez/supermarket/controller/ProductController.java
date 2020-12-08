package com.ez.supermarket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ez.supermarket.model.Product;
import com.ez.supermarket.service.ProductService;

@Controller
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@GetMapping
	public ResponseEntity<List<Product>> associacaoList() {
		
		return ResponseEntity.ok(this.productService.getProducts());
		
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Product> getProductDetail(@PathVariable String id) {
		
		return ResponseEntity.ok(this.productService.getProductDetail(id));
		
	}
}
