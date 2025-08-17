package com.todo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Todos {

    @Id
    private String todoID;
    private String todo;

    @ManyToOne
    private List<Users> user;
}
