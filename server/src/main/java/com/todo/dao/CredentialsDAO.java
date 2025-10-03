package com.todo.dao;


import com.todo.dto.CredentialsDTO;
import com.todo.model.Credentials;
import com.todo.model.Users;
import com.todo.util.ResponseData;
import com.todo.util.reposetory.CredentialsRepo;
import com.todo.util.reposetory.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class CredentialsDAO {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private CredentialsRepo credentialsRepo;


    public ResponseData createCredentials(CredentialsDTO credentialsDTO){

        try{
            Users users=userRepo.findById(credentialsDTO.getUser()).orElseThrow(()-> new NoSuchElementException("User not exist"));
            Credentials credentials=dtoToCredential(credentialsDTO);
            credentials.setUser(users);
            credentials.setCreateAt(LocalDateTime.now());

            credentialsRepo.save(credentials);
            return new ResponseData(200);
        }catch (NoSuchElementException e){
            return new ResponseData(400,e.getMessage());
        } catch (RuntimeException e) {
            return new ResponseData(500);
        }

    }

    public ResponseData getCredentialsByUserId(Long userId) {
        try{
            List<CredentialsDTO> credentials=  credentialsRepo.findAllDTOByUserId(userId);
            if (credentials.isEmpty()){
                return new ResponseData(204);
            }
            return new ResponseData(200,credentials);
        }catch (RuntimeException e){
            return new ResponseData(500,e.getMessage());
        }
    }

    public ResponseData updateCredentials(long userID,CredentialsDTO credentialsDTO) {
        try {
            System.out.println("Enter into updateCredentials");
            Credentials credentials = credentialsRepo.findByIdAndUser_UserID(credentialsDTO.getId(),userID)
                    .orElseThrow(() -> new NoSuchElementException("Credentials not found"));

            // Update only if provided in DTO
            if (credentialsDTO.getUrl() != null && !credentialsDTO.getUrl().isBlank()) {
                credentials.setUrl(credentialsDTO.getUrl());
            }
            if (credentialsDTO.getUsername() != null && !credentialsDTO.getUsername().isBlank()) {
                credentials.setUsername(credentialsDTO.getUsername());
            }
            if (credentialsDTO.getDescription() != null && !credentialsDTO.getDescription().isBlank()) {
                credentials.setDescription(credentialsDTO.getDescription());
            }
            if (credentialsDTO.getCreateAt() != null) {
                credentials.setCreateAt(credentialsDTO.getCreateAt());
            }

             credentialsRepo.save(credentials);
            return new ResponseData(200);

        } catch (NoSuchElementException e) {
            return new ResponseData(404, e.getMessage());
        } catch (RuntimeException e) {
            return new ResponseData(500, e.getMessage());
        }
    }

    public ResponseData deleteCredentials(long userId,long credentialID){
        try {
          long data=  credentialsRepo.deleteByIdAndUser_UserID(credentialID,userId);
            if(data==1){
                return new ResponseData(200);
            }
            return new ResponseData(400,"Data not found");
        } catch (RuntimeException e) {
            return new ResponseData(500,e.getMessage());
        }
    }


    private Credentials dtoToCredential(CredentialsDTO credentialsDTO) {
        Credentials credentials = new Credentials();

        credentials.setUrl(credentialsDTO.getUrl());
        credentials.setUsername(credentialsDTO.getUsername());
        credentials.setDescription(credentialsDTO.getDescription());
        credentials.setCreateAt(credentialsDTO.getCreateAt());
        return credentials;
    }

}
