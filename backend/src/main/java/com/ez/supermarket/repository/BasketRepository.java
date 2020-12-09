package com.ez.supermarket.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ez.supermarket.model.Shopping;


@Transactional
public interface BasketRepository extends JpaRepository<Shopping, Long> {
	
	
}
