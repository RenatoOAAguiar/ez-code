package com.ez.supermarket.model;

import lombok.Data;

@Data
public class Promotion {
	private String id;
	private String type;
	private Integer required_qty;
	private Integer free_qty;
	private Integer price;
	private Integer amount;
}
