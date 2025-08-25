package com.todo.controller;

import com.todo.dto.UserDTO;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/")
public class auth {
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO){
        System.out.println(userDTO.toString());
        return  ResponseEntity.status(200).body("hi");
    }

    @GetMapping("/test")
    public ResponseEntity<Object> testing(){
        return ResponseEntity.status(200)
                .header("Content-Type", "text/plain").body("test is successfull");
    }

    @PostMapping("/test/{id}")
    public ResponseEntity<?> test(@PathVariable("id") String id){
        return ResponseEntity.ok(id);
    }

}
