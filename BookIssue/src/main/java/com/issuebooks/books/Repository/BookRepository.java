package com.issuebooks.books.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.issuebooks.books.model.BooksModel;

@Repository
public interface BookRepository extends JpaRepository<BooksModel, Long> {
	
	Optional<BooksModel> findByName(String name);
	
	@Query("SELECT b FROM BooksModel b WHERE LOWER(b.name) LIKE LOWER(CONCAT('%', :name, '%'))") 
	List<BooksModel> getByNameContainingIgnoreCase(@Param("name") String name);

}
