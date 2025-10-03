package com.todo.dto;

import com.todo.model.Users;

import java.time.LocalDateTime;

public class CredentialsDTO {

    private long id;
    private String url;
    private String username;
    private String description;
    private LocalDateTime createAt;
    private long user;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public long getUser() {
        return user;
    }

    public void setUser(long user) {
        this.user = user;
    }

    public CredentialsDTO(long id, String url, String username, String description, LocalDateTime createAt, long user) {
        this.id = id;
        this.url = url;
        this.username = username;
        this.description = description;
        this.createAt = createAt;
        this.user = user;
    }

    public CredentialsDTO() {
    }
}
