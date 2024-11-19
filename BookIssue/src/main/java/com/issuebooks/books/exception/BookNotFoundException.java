package com.issuebooks.books.exception;

public class BookNotFoundException extends RuntimeException {
	public BookNotFoundException(String str) {
		super(str);
	}

}
