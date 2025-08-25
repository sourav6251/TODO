package com.todo.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Ideas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ideaId;
    private String idea;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users user;

    public long getIdeaId() {
        return ideaId;
    }

    public void setIdeaId(long ideaId) {
        this.ideaId = ideaId;
    }

    public String getIdea() {
        return idea;
    }

    public void setIdea(String idea) {
        this.idea = idea;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Ideas() {
    }
}
