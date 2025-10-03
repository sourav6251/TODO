package com.todo.service;

import com.todo.dao.IdeasDAO;
import com.todo.dto.IdeasDTO;
import com.todo.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IdeaService {

    @Autowired
    private IdeasDAO ideasDAO;

    public ResponseData createIdea(IdeasDTO ideasDTO) {
        return ideasDAO.createIdea(ideasDTO);
    }

    public ResponseData showIdeas(long userID) {
        return ideasDAO.showIdeas(userID);
    }

    public ResponseData updateIdea(IdeasDTO ideasDTO) {
        return ideasDAO.updateIdea(ideasDTO);
    }

    public ResponseData deleteIdea(long userId,long ideaID) {
        return ideasDAO.deleteIdea(userId,ideaID);
    }

}
