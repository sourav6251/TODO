package com.todo.service;

import com.todo.dao.UserDAO;
import com.todo.dto.UserDTO;
import com.todo.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    public UserDAO userDAO;

    public void userCreate(UserDTO userDTO){
        userDAO.userCreate(userDTO);
    }

    public void updateUser(UserDTO userDTO){
        userDAO.updateUser(userDTO);
    }

    public void deleteUser(UserDTO userDTO){
        userDAO.deleteUser(userDTO);
    }
}
