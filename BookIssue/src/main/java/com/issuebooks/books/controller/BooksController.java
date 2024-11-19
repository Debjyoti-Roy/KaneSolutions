package com.issuebooks.books.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.issuebooks.books.Repository.IssuedBookRepository;
import com.issuebooks.books.model.IssueBookRequest;
import com.issuebooks.books.model.IssueModel;
import com.issuebooks.books.model.ReturnBookRequest;
import com.issuebooks.books.service.BookService;

@RestController
@RequestMapping("/api/issuedbooks")
public class BooksController {
	
	@Autowired
	private BookService bookService;
	
	@Autowired
	private IssuedBookRepository issuedBookRepository;
	
	@PostMapping("/issue")
	@CrossOrigin
	public ResponseEntity<IssueModel> issuedBook(@RequestBody IssueBookRequest bookRequest){
		IssueModel book=bookService.issue(bookRequest.getBookName(), bookRequest.getUserName());
		return ResponseEntity.ok(book);
	}
	
	@PostMapping("/return")
	@CrossOrigin
	public ResponseEntity<String> returnBook(@RequestBody ReturnBookRequest returnBookRequest){
		try {
			bookService.returnBook(returnBookRequest.getBookName());
			return ResponseEntity.ok("BOOK RETURNED SUCCESSFULLY");
		} catch (Exception e) {
			return ResponseEntity.status(404).body(e.getMessage());
		}
	}
	
	@GetMapping
	@CrossOrigin
	public List<IssueModel> getAll(){
		return issuedBookRepository.findAll();
	}

}
