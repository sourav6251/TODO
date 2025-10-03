package com.todo.controller;

import com.todo.dto.CredentialsDTO;
import com.todo.service.CredentialService;
import com.todo.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/credential")
public class CredentialsController {

    @Autowired
    CredentialService credentialService;

    @PostMapping("/{userId}")
    public ResponseEntity<?> createCredentials(@PathVariable("userId") long userId, @RequestBody CredentialsDTO credentialsDTO){
        credentialsDTO.setUser(userId);
        ResponseData response=credentialService.createCredentials(credentialsDTO);
        return ResponseEntity.status(response.status()).body(response.data());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> showCredentials(@PathVariable("userId") long userId){
        ResponseData response=credentialService.getCredentialsByUserId(userId);
        return ResponseEntity.status(response.status()).body(response.data());

    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateCredentials(@PathVariable("userId") long userId,@RequestBody CredentialsDTO credentialsDTO){
        ResponseData response=credentialService.updateCredentials(userId,credentialsDTO);
        return ResponseEntity.status(response.status()).body(response.data());
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteCredentials(@RequestParam("userId") long userId,@RequestParam("credentialID") long credentialsDTO){
        ResponseData response=credentialService.deleteCredentials(userId,credentialsDTO);
        return ResponseEntity.status(response.status()).body(response.data());
    }

}
