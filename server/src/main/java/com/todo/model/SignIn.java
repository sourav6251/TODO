package com.todo.model;


import com.todo.util.enums.SignInOption;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class SignIn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long signId;
    private String  website;
    private String signWith;
    private String description;
    @Enumerated(EnumType.STRING)
    private SignInOption option;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users user;

    public SignIn() {
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getSignId() {
        return signId;
    }

    public void setSignId(long signId) {
        this.signId = signId;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getSignWith() {
        return signWith;
    }

    public void setSignWith(String signWith) {
        this.signWith = signWith;
    }

    public SignInOption getOption() {
        return option;
    }

    public void setOption(SignInOption option) {
        this.option = option;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public SignIn(String website, String signWith, SignInOption option) {
        this.website = website;
        this.signWith = signWith;
        this.option = option;
    }
}
