package com.todo.controller;


import com.todo.dto.UsersDTO;
import com.todo.service.UserService;
import com.todo.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping()
    public ResponseEntity<?>  createUser(UsersDTO usersDTO){
        ResponseData response=userService.createUser(usersDTO);
        return ResponseEntity.status(response.status()).body(response.data());
    }

    @GetMapping("/{userID}")
    public ResponseEntity<?>  showUser(@PathVariable("userID") long userID){
        ResponseData response=userService.showUser(userID);
        return ResponseEntity.status(response.status()).body(response.data());
    }

    @DeleteMapping("/{userID}")
    public ResponseEntity<?>  deleteUser(@PathVariable("userID") long userID){
        ResponseData response=userService.deleteUser(userID);
        return ResponseEntity.status(response.status()).body(response.data());
    }


    @PutMapping()
    public ResponseEntity<?>  updateUser(@RequestBody UsersDTO usersDTO){
        ResponseData response=userService.updateUser(usersDTO);
        return ResponseEntity.status(response.status()).body(response.data());
    }



    @PutMapping("/update_password/{userID}")
    public ResponseEntity<?>  updatePassword(@PathVariable("userID") long userId,@RequestBody  String password){
        ResponseData response=userService.updateUserPassword(userId, password);
        return ResponseEntity.status(response.status()).body(response.data());
    }


}
