package com.todo.controller;


import com.todo.dto.TodosDTO;
import com.todo.service.TodoService;
import com.todo.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping()
    public ResponseEntity<?> createTodo(@RequestBody TodosDTO todosDTO) {
        ResponseData response = todoService.createTodo(todosDTO);
        return ResponseEntity.status(response.status()).body(response.data());
    }

    @GetMapping("/{userID}")
    public ResponseEntity<?> showTodos(@PathVariable("userID") long userID) {
        ResponseData response = todoService.showTodos(userID);
        return ResponseEntity.status(response.status()).body(response.data());
    }

    @PutMapping("/{userID}")
    public ResponseEntity<?> updateTodo(@PathVariable("userID") long userID, @RequestBody TodosDTO todosDTO) {
        todosDTO.setUser(userID);
        ResponseData response = todoService.updateTodo(todosDTO);
        return ResponseEntity.status(response.status()).body(response.data());
    }

    @DeleteMapping("/{userID}/{todoID}")
    public ResponseEntity<?> deleteTodo(@PathVariable("userID") long userID, @PathVariable("todoID") long todoID) {
        ResponseData response = todoService.deleteTodo(userID, todoID);
        return ResponseEntity.status(response.status()).body(response.data());
    }
}
