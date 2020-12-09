package com.ez.supermarket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ez.supermarket.model.Product;
import com.ez.supermarket.model.Shopping;
import com.ez.supermarket.service.BasketService;


@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/basket")
public class BasketController {
	
	@Autowired
	private BasketService basketService;
	
	@GetMapping
	public ResponseEntity<List<Shopping>> getShopping() {
		
		return ResponseEntity.ok(this.basketService.getShopping());
		
	}
	
	@PostMapping
	public ResponseEntity<Shopping> save(@RequestBody List<Product> products) {
		
		return ResponseEntity.ok(this.basketService.save(products));
		
	}

}
