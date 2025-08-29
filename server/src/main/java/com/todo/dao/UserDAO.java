package com.todo.dao;

import com.todo.dto.UserDTO;
import com.todo.model.Users;
import com.todo.util.enums.reposetory.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UserDAO {
    @Autowired
    private UserRepo userrepo;

    public void userCreate(UserDTO userDTO){
        Users users=dtoToUsers(userDTO);
        userrepo.save(users);
    }

    public void updateUser(UserDTO userDTO){
        try{
            Users users = userrepo.findById(userDTO.getUserID()).orElseThrow(NoSuchElementException::new);
            users.setEmail(users.getEmail());
            users.setName(users.getName());
            userrepo.save(users);
        }catch (NoSuchElementException e){
            System.out.println("====================NoSuchElementException=============");
            Users users=dtoToUsers(userDTO);
            userrepo.save(users);
        }

    }

    public void deleteUser(UserDTO userDTO){
        userrepo.deleteById(userDTO.getUserID());
    }

    private Users dtoToUsers(UserDTO userDTO){
        Users users=new Users();
        users.setEmail(userDTO.getEmail());
        users.setName(userDTO.getName());
        users.setUserID(userDTO.getUserID());
        users.setCreatedAt(userDTO.getCreatedAt());
        return users;
    }
}
