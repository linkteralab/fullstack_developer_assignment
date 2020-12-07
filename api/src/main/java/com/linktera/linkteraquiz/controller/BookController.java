package com.linktera.linkteraquiz.controller;

import com.linktera.linkteraquiz.request.BookRequest;
import com.linktera.linkteraquiz.response.BookResponse;
import com.linktera.linkteraquiz.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping()
    public BookResponse getBooks() {
        return new BookResponse(bookService.getList());
    }

    @GetMapping("/{uuid}")
    public BookResponse getBook(@PathVariable("uuid") UUID uuid) {
        if (uuid == null) {
            throw new NullPointerException("Uuid not be empty");
        }

        return new BookResponse(bookService.get(uuid));
    }

    @PostMapping()
    public void saveBook(@RequestBody BookRequest request) {
        if (request == null || request.getBook() == null) {
            throw new NullPointerException("Book not be empty");
        }

        bookService.save(request.getBook());
    }

    @PutMapping("/{uuid}")
    public void updateBook(@RequestBody BookRequest request, @PathVariable("uuid") UUID uuid) {
        if (request == null || request.getBook() == null || uuid == null) {
            throw new NullPointerException("Book or uuid not be empty");
        }

        bookService.update(uuid, request.getBook());
    }

    @DeleteMapping("/{uuid}")
    public void deleteBook(@PathVariable("uuid") UUID uuid) {
        if (uuid == null) {
            throw new NullPointerException("Uuid not be empty");
        }

        bookService.delete(uuid);
    }

}
