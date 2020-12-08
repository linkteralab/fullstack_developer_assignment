package com.linktera.linkteraquiz.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.linktera.linkteraquiz.model.Book;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BookResponse {

    @JsonProperty("book")
    @JsonInclude(Include.NON_NULL)
    private Book book;

    public BookResponse(Book book) {
        this.book = book;
    }

    @JsonProperty("books")
    @JsonInclude(Include.NON_NULL)
    private List<Book> books;

    public BookResponse(List<Book> books) {
        this.books = books;
    }

}
