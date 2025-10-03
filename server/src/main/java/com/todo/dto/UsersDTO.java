package com.todo.dto;

import java.time.LocalDateTime;

public class UsersDTO {

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


    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UsersDTO() {
    }

    public UsersDTO(Long userID, String name, String email, String bio, String profileUrl, String profileUrlId, String phone, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.userID = userID;
        this.name = name;
        this.email = email;
        this.bio = bio;
        this.profileUrl = profileUrl;
        this.profileUrlId = profileUrlId;
        this.phone = phone;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
