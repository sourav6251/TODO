package com.todo.controller;


import com.todo.dto.IdeasDTO;
import com.todo.service.IdeaService;
import com.todo.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/idea")
public class IdeaController {

    @Autowired
    IdeaService ideaService;

    @PostMapping()
    public ResponseEntity<?> createIdea(@RequestBody IdeasDTO ideasDTO){
        ResponseData response=ideaService.createIdea(ideasDTO);
        return ResponseEntity.status(response.status()).body(response.data());
    }

    @GetMapping("/{userID}")
    public ResponseEntity<?> showIdeas(@PathVariable("userID") long userID){
        ResponseData response=ideaService.showIdeas(userID);
        return ResponseEntity.status(response.status()).body(response.data());
    }

    @PutMapping("/{userID}")
    public ResponseEntity<?> updateIdea(@PathVariable("userID") long userID,@RequestBody IdeasDTO ideasDTO){
        ideasDTO.setUser(userID);
        ResponseData response=ideaService.updateIdea(ideasDTO);
        return ResponseEntity.status(response.status()).body(response.data());
    }

    @DeleteMapping("/{userID}/{ideaID}")
    public ResponseEntity<?> deleteIdea(@PathVariable("userID") long userID,@PathVariable("ideaID") long ideaID){
        ResponseData response=ideaService.deleteIdea(userID, ideaID);
        return ResponseEntity.status(response.status()).body(response.data());
    }

}
