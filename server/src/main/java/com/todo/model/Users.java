// Users.java
package com.todo.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userID;

    private String authID;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Todos> todos;

    public Users() {}

    // getters & setters
    public Long getUserID() { return userID; }
    public void setUserID(Long userID) { this.userID = userID; }

    public String getAuthID() { return authID; }
    public void setAuthID(String authID) { this.authID = authID; }

    public List<Todos> getTodos() { return todos; }
    public void setTodos(List<Todos> todos) { this.todos = todos; }
}
