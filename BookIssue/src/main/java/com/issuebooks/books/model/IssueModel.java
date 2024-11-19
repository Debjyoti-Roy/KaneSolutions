package com.issuebooks.books.model;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "IssuedHistory")
@NoArgsConstructor
@AllArgsConstructor
public class IssueModel {
	

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long issuedId;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false) 
    private BooksModel book;

    private String issuedUser;

    @Column(nullable = false)
    private LocalDate issuedDate = LocalDate.now();

    private LocalDate returnDate;

}
