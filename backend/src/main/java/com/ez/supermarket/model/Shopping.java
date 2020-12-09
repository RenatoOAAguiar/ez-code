package com.ez.supermarket.model;

import java.util.List;

import javax.persistence.Entity;

import lombok.Data;

@Entity
@Data
public class Shopping {
	
	private Long id;
	
	private String user;
	
	List<Product> products;
}
