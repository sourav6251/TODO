package com.todo.dto;

import com.todo.model.Users;

import java.time.LocalDateTime;

public class IdeaDTO {

    private long ideaId;
    private String idea;
    private LocalDateTime createdAt;
    private Users user;
}
