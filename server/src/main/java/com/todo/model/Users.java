// Users.java
package com.todo.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userID;

    private String authID;
    private String name;
    private String email;
//    private String profileUrl;
//    private String profileUrlId;
    private String createdAt;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Todos> todos;

    @OneToMany(mappedBy = "user")
    private List<Ideas> ideas;

    @OneToMany(mappedBy = "user")
    private List<SignIn> sign;

    public Users() {}

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
//
//    public String getProfileUrl() {
//        return profileUrl;
//    }
//
//    public void setProfileUrl(String profileUrl) {
//        this.profileUrl = profileUrl;
//    }
//
//    public String getProfileUrlId() {
//        return profileUrlId;
//    }
//
//    public void setProfileUrlId(String profileUrlId) {
//        this.profileUrlId = profileUrlId;
//    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    // getters & setters
    public Long getUserID() { return userID; }
    public void setUserID(Long userID) { this.userID = userID; }

    public String getAuthID() { return authID; }
    public void setAuthID(String authID) { this.authID = authID; }

    public List<Todos> getTodos() { return todos; }
    public void setTodos(List<Todos> todos) { this.todos = todos; }

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
}
