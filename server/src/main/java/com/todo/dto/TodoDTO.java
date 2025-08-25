package com.todo.dto;

import com.todo.model.Users;
import java.time.LocalDateTime;

public class TodoDTO {

    private Long todoID;
    private String todo;
    private int extendTime;
    private boolean status;
    private LocalDateTime createdAt;
    private LocalDateTime extendAt;
    private LocalDateTime finishAt;
    private Users user;
}
