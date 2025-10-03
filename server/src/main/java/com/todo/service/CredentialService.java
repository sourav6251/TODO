package com.todo.service;

import com.todo.dao.CredentialsDAO;
import com.todo.dto.CredentialsDTO;
import com.todo.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CredentialService {

    @Autowired
    CredentialsDAO credentialsDAO;

    public ResponseData createCredentials(CredentialsDTO credentialsDTO){
        return credentialsDAO.createCredentials(credentialsDTO);

    }
    public ResponseData getCredentialsByUserId(long userId){
        return credentialsDAO.getCredentialsByUserId(userId);

    }
    public ResponseData updateCredentials(long userId,CredentialsDTO credentialsDTO){
        return credentialsDAO.updateCredentials(userId,credentialsDTO);

    }
    public ResponseData deleteCredentials(long userId,long credentialsID){
        return credentialsDAO.deleteCredentials(userId,credentialsID);

    }
}
