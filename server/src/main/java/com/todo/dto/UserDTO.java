package com.todo.dto;

import com.todo.model.Ideas;
import com.todo.model.SignIn;
import com.todo.model.Todos;
import jakarta.persistence.OneToMany;

import java.time.LocalDateTime;
import java.util.List;

public class UserDTO {

    private String userID;
//    private String authID;
    private String name;
    private String email;
    private String profileUrl;
    private String profileUrlId;
    private LocalDateTime createdAt;
    private List<Todos> todos;
    private List<Ideas> ideas;
    private List<SignIn> sign;

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

//    public String getAuthID() {
//        return authID;
//    }

//    public void setAuthID(String authID) {
//        this.authID = authID;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }

    public String getProfileUrlId() {
        return profileUrlId;
    }

    public void setProfileUrlId(String profileUrlId) {
        this.profileUrlId = profileUrlId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Todos> getTodos() {
        return todos;
    }

    public void setTodos(List<Todos> todos) {
        this.todos = todos;
    }

    public List<Ideas> getIdeas() {
        return ideas;
    }

    public void setIdeas(List<Ideas> ideas) {
        this.ideas = ideas;
    }

    public List<SignIn> getSign() {
        return sign;
    }

    public void setSign(List<SignIn> sign) {
        this.sign = sign;
    }

    public UserDTO(String userID, String name, String email, LocalDateTime createdAt) {
        this.userID=userID;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }

    public UserDTO() {
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "userID=" + userID +
//                ", authID='" + authID + '\'' +
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
