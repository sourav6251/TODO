package com.todo.dao;

import com.todo.dto.IdeasDTO;
import com.todo.model.Ideas;
import com.todo.model.Users;
import com.todo.util.ResponseData;
import com.todo.util.reposetory.IdeasRepo;
import com.todo.util.reposetory.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class IdeasDAO {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private IdeasRepo ideasRepo;


    public ResponseData createIdea(IdeasDTO ideasDTO) {
        try {
            Users user = userRepo.findById(ideasDTO.getUser())
                    .orElseThrow(() -> new NoSuchElementException("User not exist"));

            Ideas idea = dtoToEntity(ideasDTO);
            idea.setUser(user);
            idea.setCreateAt(LocalDateTime.now());

            ideasRepo.save(idea);
            return new ResponseData(200);
        } catch (NoSuchElementException e) {
            return new ResponseData(400, e.getMessage());
        } catch (RuntimeException e) {
            return new ResponseData(500, e.getMessage());
        }
    }

    public ResponseData showIdeas(long userID){
        try{
            List<IdeasDTO> ideasDTOS=ideasRepo.findIdeasDTOByUserId(userID);
            if (ideasDTOS.isEmpty()){
                return new ResponseData(204);
            }return new ResponseData(200,ideasDTOS);
        } catch (RuntimeException e) {
            return new ResponseData(500,e.getMessage());
        }
    }

    public ResponseData updateIdea(IdeasDTO ideasDTO) {
        try {
            Ideas idea = ideasRepo.findByIdAndUser_UserID(ideasDTO.getId(), ideasDTO.getUser())
                    .orElseThrow(() -> new NoSuchElementException("Idea not found"));

            if (ideasDTO.getTitle() != null && !ideasDTO.getTitle().isBlank()) {
                idea.setTitle(ideasDTO.getTitle());
            }
            if (ideasDTO.getDescription() != null && !ideasDTO.getDescription().isBlank()) {
                idea.setDescription(ideasDTO.getDescription());
            }
            if (ideasDTO.getCreateAt() != null) {
                idea.setCreateAt(ideasDTO.getCreateAt());
            }

            Ideas updated = ideasRepo.save(idea);
            return new ResponseData(200);
        } catch (NoSuchElementException e) {
            return new ResponseData(404, e.getMessage());
        } catch (RuntimeException e) {
            return new ResponseData(500, e.getMessage());
        }
    }

    public ResponseData deleteIdea(long userId,long ideaID) {
        try {
          long data=  ideasRepo.deleteByIdAndUser_UserID(ideaID,userId);
          if (data==0){
              return new ResponseData(400,"Something went wrong");
          }
            return new ResponseData(200);
        } catch (RuntimeException e) {
            return new ResponseData(500, e.getMessage());
        }
    }

    private Ideas dtoToEntity(IdeasDTO ideasDTO) {
        Ideas idea = new Ideas();
        idea.setTitle(ideasDTO.getTitle());
        idea.setDescription(ideasDTO.getDescription());
        idea.setCreateAt(ideasDTO.getCreateAt());
        return idea;
    }

}
