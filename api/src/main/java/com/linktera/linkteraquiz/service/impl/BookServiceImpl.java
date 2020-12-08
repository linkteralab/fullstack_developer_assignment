package com.linktera.linkteraquiz.service.impl;

import com.linktera.linkteraquiz.model.Book;
import com.linktera.linkteraquiz.service.BookService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookServiceImpl implements BookService {

    @Override
    public List<Book> getList() {
        return Collections.emptyList();
    }

    @Override
    public Book get(UUID uuid) {
        return new Book();
    }

    @Override
    public void save(Book book) {

    }

    @Override
    public void update(UUID uuid, Book book) {

    }

    @Override
    public void delete(UUID uuid) {

    }

}
