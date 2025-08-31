package com.todo.dto;

import com.todo.model.Users;
import com.todo.util.enums.SignInOption;

public class SignInDTO {

    private long signId;
    private String  website;
    private String signWith;
    private SignInOption option;
    private Users user;
}
