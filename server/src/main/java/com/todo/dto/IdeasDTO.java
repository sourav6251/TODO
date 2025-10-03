package com.todo.dto;

import com.todo.model.Users;
import java.time.LocalDateTime;

public class IdeasDTO {

    private long id;
    private String title;
    private  String description;
    private LocalDateTime createAt;
    private long user;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public IdeasDTO(long id, String title, String description, LocalDateTime createAt, long user) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createAt = createAt;
        this.user = user;
    }

    public IdeasDTO() {
    }
}
