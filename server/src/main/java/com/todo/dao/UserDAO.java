package com.todo.dao;

import com.todo.dto.UsersDTO;
import com.todo.model.Users;
import com.todo.util.ResponseData;
import com.todo.util.reposetory.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Component
//@Transactional
public class UserDAO {
    @Autowired
    private UserRepo userRepo;

    public ResponseData createUser(UsersDTO usersDTO) {
        try {
            Users existUser = userRepo.findUserByEmail(usersDTO.getEmail());
            if (existUser != null) {
                return new ResponseData(400, "User already exists");
            }

            Users user = dtoToEntity(usersDTO);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());

            Users savedUser = userRepo.save(user);
            return new ResponseData(200, savedUser);

        } catch (RuntimeException e) {
            return new ResponseData(500, e.getMessage());
        }
    }

    public ResponseData showUser(long userID){
        try {
            UsersDTO users=userRepo.findUserDTOById(userID).orElseThrow(()->new NoSuchElementException("User not found"));
            return new ResponseData(200,users);
        } catch (NoSuchElementException e) {
            return new ResponseData(400,e.getMessage());
        } catch (RuntimeException e) {
            return new ResponseData(500,e.getMessage());
        }
    }

    @Transactional
    public ResponseData updateUser(UsersDTO usersDTO) {
        try {
            // Find existing user
            Users user = userRepo.findById(usersDTO.getUserID())
                    .orElseThrow(() -> new NoSuchElementException("User not found"));

            // Update only provided fields (to support partial updates)
            if (usersDTO.getName() != null && !usersDTO.getName().isBlank()) {
                user.setName(usersDTO.getName());
            }
//            if (usersDTO.getEmail() != null && !usersDTO.getEmail().isBlank()) {
//                // Optional: check if new email is already taken
//                Users existUser = userRepo.findUserByEmail(usersDTO.getEmail());
//                if (existUser != null && !existUser.getUserID().equals(user.getUserID())) {
//                    return new ResponseData(400, "Email already in use by another user");
//                }
//                user.setEmail(usersDTO.getEmail());
//            }

            if (usersDTO.getBio() != null) {
                user.setBio(usersDTO.getBio());
            }
            if (usersDTO.getProfileUrl() != null) {
                user.setProfileUrl(usersDTO.getProfileUrl());
            }
            if (usersDTO.getProfileUrlId() != null) {
                user.setProfileUrlId(usersDTO.getProfileUrlId());
            }
            if (usersDTO.getPhone() != null) {
                user.setPhone(usersDTO.getPhone());
            }

            // Always update timestamp
            user.setUpdatedAt(LocalDateTime.now());

            // Save updated user
            Users updatedUser = userRepo.save(user);
            return new ResponseData(200, updatedUser);

        } catch (NoSuchElementException e) {
            return new ResponseData(404, e.getMessage());
        } catch (RuntimeException e) {
            return new ResponseData(500, e.getMessage());
        }
    }

    @Transactional
    public ResponseData deleteUser(long id){
        try{
            userRepo.deleteById(id);
            return new ResponseData(200);
        }catch (RuntimeException e){
            return new ResponseData(500,e.getMessage());
        }
    }

    @Transactional
    public ResponseData updatePassword(long id, String password){
        try{
            System.out.println("Password=>"+password);
            System.out.println("ID=>"+id);
            Users users= userRepo.findById(id).orElseThrow(()-> new NoSuchElementException("User not found"));
            users.setPassword(password);
            userRepo.save(users);
            return new ResponseData(200);
        }catch (NoSuchElementException e){
            return new ResponseData(400,e.getMessage());
        } catch (RuntimeException e) {
            return new ResponseData(500,e.getMessage());
        }

    }

    private Users dtoToEntity(UsersDTO dto) {
        Users user = new Users();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setBio(dto.getBio());
        user.setPassword(dto.getPassword());
        user.setProfileUrl(dto.getProfileUrl());
        user.setProfileUrlId(dto.getProfileUrlId());
        user.setPhone(dto.getPhone());
        user.setCreatedAt(dto.getCreatedAt());
        user.setUpdatedAt(dto.getUpdatedAt());
        return user;
    }

}
