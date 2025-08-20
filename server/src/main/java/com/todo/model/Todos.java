// Todos.java
package com.todo.model;

import jakarta.persistence.*;

@Entity
public class Todos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoID;

    private String todo;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Users user;

    public Todos() {}

    // getters & setters
    public Long getTodoID() { return todoID; }
    public void setTodoID(Long todoID) { this.todoID = todoID; }

    public String getTodo() { return todo; }
    public void setTodo(String todo) { this.todo = todo; }

    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }
}
/**
 *
 * One (Users) → Many (Todos)
 *
 * Many (Todos) → One (Users)
 *
 */