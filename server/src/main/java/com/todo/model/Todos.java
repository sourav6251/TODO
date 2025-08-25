// Todos.java
package com.todo.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Todos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoID;

    private String todo;
    private int extendTime;
    private boolean status;
    private LocalDateTime createdAt;
    private LocalDateTime extendAt;
    private LocalDateTime finishAt;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users user;

    public Todos() {
    }


    public Long getTodoID() {
        return todoID;
    }

    public void setTodoID(Long todoID) {
        this.todoID = todoID;
    }

    public int getExtendTime() {
        return extendTime;
    }

    public void setExtendTime(int extendTime) {
        this.extendTime = extendTime;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExtendAt() {
        return extendAt;
    }

    public void setExtendAt(LocalDateTime extendAt) {
        this.extendAt = extendAt;
    }

    public LocalDateTime getFinishAt() {
        return finishAt;
    }

    public void setFinishAt(LocalDateTime finishAt) {
        this.finishAt = finishAt;
    }

    public String getTodo() {
        return todo;
    }

    public void setTodo(String todo) {
        this.todo = todo;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
/**
 * One (Users) → Many (Todos)
 * <p>
 * Many (Todos) → One (Users)
 */

