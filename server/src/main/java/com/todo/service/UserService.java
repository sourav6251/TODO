package com.todo.service;

import com.todo.dao.UserDAO;
import com.todo.dto.UsersDTO;
import com.todo.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserDAO userDAO;

    public ResponseData createUser(UsersDTO usersDTO){
        return userDAO.createUser(usersDTO);
    }
    public ResponseData showUser(long usersID){
        return userDAO.showUser(usersID);
    }
    public ResponseData updateUser(UsersDTO usersDTO){
        return userDAO.updateUser(usersDTO);
    }
    public ResponseData deleteUser(long userId){
        return userDAO.deleteUser(userId);
    }
    public ResponseData updateUserPassword(long userId, String password){
        return userDAO.updatePassword(userId, password);
    }
}
