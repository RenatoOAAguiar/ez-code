package com.ez.supermarket.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ez.supermarket.model.Product;

@Service
public class ProductService {
	
	@Autowired
	private RestTemplate restTemplate;
	
	final String uri = "http://mock:8081/products";

	public List<Product> getProducts() {
		ResponseEntity<Product[]> response = restTemplate.getForEntity(uri, Product[].class);
		List<Product> products = new ArrayList<Product>(Arrays.asList(response.getBody())); 
		return products;
	}

	public Product getProductDetail(String id) {
		
		ResponseEntity<Product> response = restTemplate.getForEntity(uri + "/" + id, Product.class);
		Product product = response.getBody(); 
		return product;
	}

}
