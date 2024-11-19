package com.issuebooks.books.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.issuebooks.books.Repository.BookRepository;
import com.issuebooks.books.Repository.IssuedBookRepository;
import com.issuebooks.books.exception.BookNotFoundException;
import com.issuebooks.books.model.BooksModel;
import com.issuebooks.books.model.IssueModel;

@Service
public class BookService {
	
	private final BookRepository bookRepository;
	private final IssuedBookRepository issuedBookRepository;
	
	public BookService(BookRepository bookRepository, IssuedBookRepository issuedBookRepository) {
		this.bookRepository=bookRepository;
		this.issuedBookRepository=issuedBookRepository;
	}
	
	public IssueModel issue(String Book, String User) {
		BooksModel book=bookRepository.findByName(Book).orElseThrow(()-> new BookNotFoundException("THE BOOK IS NOT FOUND"));
		
		if(book.getStatus()==false) {
			throw new BookNotFoundException("THIS BOOK IS ALREADY ISSUED AND NOT YET RETURNED");
		}
		
		book.setStatus(false);
		book.setIssuername(User);
		bookRepository.save(book);
		IssueModel issuedBook= new IssueModel();
		issuedBook.setBook(book);
		issuedBook.setIssuedUser(User);
		issuedBook.setIssuedDate(LocalDate.now());
		
		return issuedBookRepository.save(issuedBook);
				
	}
	public IssueModel returnBook(String BookName) {
		BooksModel book=bookRepository.findByName(BookName).orElseThrow(()->new BookNotFoundException("THE BOOK IS NOT FOUNT"));
		
		Optional<IssueModel> issuedBook= issuedBookRepository.findByBookAndReturnDateIsNull(book);
		IssueModel issueModel=issuedBook.orElseThrow(()-> new BookNotFoundException("THE BOOK IS NOT ISSUED YET"));
		
		issueModel.setReturnDate(LocalDate.now());
		book.setStatus(true);
		book.setIssuername(null);
		bookRepository.save(book);
		
		return issuedBookRepository.save(issueModel);
		
		
		
	}

}
