package com.issuebooks.books.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.issuebooks.books.model.BooksModel;
import com.issuebooks.books.model.IssueModel;

@Repository
public interface IssuedBookRepository extends JpaRepository<IssueModel, Long> {
	Optional<IssueModel> findByBookAndReturnDateIsNull(BooksModel book);

}
