package com.todo.dto;

import com.todo.model.Ideas;
import com.todo.model.SignIn;
import com.todo.model.Todos;
import jakarta.persistence.OneToMany;

import java.util.List;

public class UserDTO {

    private Long userID;
    private String authID;
    private String name;
    private String email;
    private String profileUrl;
    private String profileUrlId;
    private String createdAt;
    private List<Todos> todos;
    private List<Ideas> ideas;
    private List<SignIn> sign;

    @Override
    public String toString() {
        return "UserDTO{" +
                "userID=" + userID +
                ", authID='" + authID + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", profileUrl='" + profileUrl + '\'' +
                ", profileUrlId='" + profileUrlId + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", todos=" + todos +
                ", ideas=" + ideas +
                ", sign=" + sign +
                '}';
    }
}
