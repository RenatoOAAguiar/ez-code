package com.ez.supermarket.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

import lombok.Data;

@Data
@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private String id;
	
	private String name;
	
	private Integer price;
	
	@Transient
	private List<Promotion> promotions;
	
	private Integer qty;
	
	private Integer custo;
	
	private Integer total;
	
	private Integer discount;
}
