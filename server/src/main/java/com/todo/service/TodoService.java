package com.todo.service;

import com.todo.dao.TodosDAO;
import com.todo.dto.TodosDTO;
import com.todo.util.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

    @Autowired
    private TodosDAO todosDAO;

    public ResponseData createTodo(TodosDTO todosDTO) {
        return todosDAO.createTodo(todosDTO);
    }

    public ResponseData showTodos(long userID) {
        return todosDAO.showTodos(userID);
    }

    public ResponseData updateTodo(TodosDTO todosDTO) {
        return todosDAO.updateTodo(todosDTO);
    }

    public ResponseData deleteTodo(long userId, long todoId) {
        return todosDAO.deleteTodo(userId, todoId);
    }
}
