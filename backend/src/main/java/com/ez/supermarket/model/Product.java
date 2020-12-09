package com.ez.supermarket.model;

import java.util.List;

import lombok.Data;

@Data
public class Product {
	
	private String id;
	private String name;
	private Integer price;
	private List<Promotion> promotions;
	private Integer qty;
	private Integer custo;
	private Integer total;
	private Integer discount;
}
