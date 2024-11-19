package com.issuebooks.books.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.issuebooks.books.Repository.BookRepository;
import com.issuebooks.books.exception.BookNotFoundException;
import com.issuebooks.books.model.BooksFindbyName;
import com.issuebooks.books.model.BooksModel;

@RestController
@RequestMapping("/api/booklist")
public class BookListController {
	
	@Autowired
	private BookRepository bookRepository;
	
	@GetMapping
	@CrossOrigin
	public List<BooksModel> getAll(){
		return bookRepository.findAll();
	}
	
	@GetMapping("/book")
	@CrossOrigin
	public List<BooksModel> find(@RequestParam String name) {
		
		return bookRepository.getByNameContainingIgnoreCase(name);
		
	}
}
