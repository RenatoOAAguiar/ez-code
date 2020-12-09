package com.ez.supermarket.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ez.supermarket.model.Product;
import com.ez.supermarket.model.Shopping;
import com.ez.supermarket.repository.BasketRepository;

@Service
public class BasketService {
	
	@Autowired
	private BasketRepository basketRepository;
	
	public List<Shopping> getShopping() {
		return this.basketRepository.findAll();
	}
	
	public Shopping save(List<Product> products) {
		Shopping shop = new Shopping();
		shop.setUser("admin");
		shop.setProducts(products);
		return basketRepository.save(shop);
	}

}
