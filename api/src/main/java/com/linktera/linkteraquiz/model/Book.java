package com.linktera.linkteraquiz.model;

import lombok.Data;

import java.util.UUID;

@Data
public class Book {

    private UUID uuid;

    private String title;

    private String author;

}
