package com.todo.util.reposetory;

import com.todo.dto.UsersDTO;
import com.todo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface UserRepo extends JpaRepository<Users,Long> {

   Users findUserByEmail(String email);
   // Fetch User as DTO by ID

   @Query("SELECT new com.todo.dto.UsersDTO(u.userID, u.name, u.email, u.bio, u.profileUrl, u.profileUrlId, u.phone, u.createdAt, u.updatedAt) " +
           "FROM Users u WHERE u.userID = :id")
   Optional<UsersDTO> findUserDTOById(Long id);

   // Fetch User as DTO by Email
   @Query("SELECT new com.todo.dto.UsersDTO(u.userID, u.name, u.email, u.bio, u.profileUrl, u.profileUrlId, u.phone, u.createdAt, u.updatedAt) " +
           "FROM Users u WHERE u.email = :email")
   UsersDTO findUserDTOByEmail(String email);
}
