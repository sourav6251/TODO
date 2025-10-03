package com.todo.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userID;
    private String name;
    private String email;
    private String bio;
    private String password;
    private String profileUrl;
    private String profileUrlId;
    private String phone;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Todos> todos = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ideas> ideas = new ArrayList<>();

    public List<Credentials> getCredentials() {
        return credentials;
    }

    public void setCredentials(List<Credentials> credentials) {
        this.credentials = credentials;
    }

    public List<Ideas> getIdeas() {
        return ideas;
    }

    public void setIdeas(List<Ideas> ideas) {
        this.ideas = ideas;
    }

    public List<Todos> getTodos() {
        return todos;
    }

    public void setTodos(List<Todos> todos) {
        this.todos = todos;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProfileUrlId() {
        return profileUrlId;
    }

    public void setProfileUrlId(String profileUrlId) {
        this.profileUrlId = profileUrlId;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Credentials> credentials = new ArrayList<>();

    // Helper methods
    public void addTodo(Todos todo) {
        todos.add(todo);
        todo.setUser(this);
    }

    public void removeTodo(Todos todo) {
        todos.remove(todo);
        todo.setUser(null);
    }

    public void addIdea(Ideas idea) {
        ideas.add(idea);
        idea.setUser(this);
    }

    public void removeIdea(Ideas idea) {
        ideas.remove(idea);
        idea.setUser(null);
    }

    public void addCredential(Credentials credential) {
        credentials.add(credential);
        credential.setUser(this);
    }

    public void removeCredential(Credentials credential) {
        credentials.remove(credential);
        credential.setUser(null);
    }
}
