//package com.todo.dao;
//
//
//import com.todo.dto.TodoDTO;
//import com.todo.model.Todos;
//import com.todo.model.Users;
//import com.todo.util.ResponseData;
//import com.todo.util.reposetory.TodosRepo;
//import com.todo.util.reposetory.UserRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.ArrayList;
//import java.util.NoSuchElementException;
//
//@Service
//@Transactional
//public class TodoDAO {
//
//    @Autowired
//    private TodosRepo todosRepo;
//    @Autowired
//    private UserRepo userRepo;
//
//    public ResponseData createTodo(TodoDTO todoDTO){
//        try {
//            Users users=userRepo.findById(todoDTO.getUser()).orElseThrow(()-> new NoSuchElementException("User not found"));
//            Todos todos=dtoToTODO(todoDTO);
//            todos.setUser(users);
//           Todos result= todosRepo.save(todos);
//            return new ResponseData(201,result);
//        } catch (NoSuchElementException e) {
//            return new ResponseData(400,e.getMessage());
//        } catch (RuntimeException e) {
//            return new ResponseData(500,e.getMessage());
//        }
//    }
//
//    public ResponseData updateTodo(TodoDTO todoDTO) {
//        try {
//            Todos todos = todosRepo.findById(todoDTO.getId())
//                    .orElseThrow(() -> new NoSuchElementException("Todo not exist"));
//
//            // Update only non-null or meaningful fields
//            if (todoDTO.getTitle() != null && !todoDTO.getTitle().isBlank()) {
//                todos.setTitle(todoDTO.getTitle());
//            }
//            if (todoDTO.getDescription() != null && !todoDTO.getDescription().isBlank()) {
//                todos.setDescription(todoDTO.getDescription());
//            }
//            if (todoDTO.getStatus() != null) {
//                todos.setStatus(todoDTO.getStatus());
//            }
//            if (todoDTO.getPriority() != null) {
//                todos.setPriority(todoDTO.getPriority());
//            }
//            if (todoDTO.getCreatedAt() != null) {
//                todos.setCreatedAt(todoDTO.getCreatedAt());
//            }
//            if (todoDTO.getExpireDate() != null) {
//                todos.setExpireDate(todoDTO.getExpireDate());
//            }
//            if (todoDTO.getOriginalExpireDate() != null) {
//                todos.setOriginalExpireDate(todoDTO.getOriginalExpireDate());
//            }
//            if (todoDTO.getLastExtendedDate() != null) {
//                todos.setLastExtendedDate(todoDTO.getLastExtendedDate());
//            }
//            if (todoDTO.getExtensionCount() != null) {
//                todos.setExtensionCount(todoDTO.getExtensionCount());
//            }
//            if (todoDTO.getTags() != null && !todoDTO.getTags().isEmpty()) {
//                todos.setTags(todoDTO.getTags());
//            }
//
//            // update user relation if passed
////            if (todoDTO.getUser() > 0) {
////                Users user = userRepo.findById(todoDTO.getUser())
////                        .orElseThrow(() -> new NoSuchElementException("User not exist"));
////                todos.setUser(user);
////            }
//
//            Todos updated = todosRepo.save(todos);
//            return new ResponseData(200, updated);
//
//        } catch (NoSuchElementException e) {
//            return new ResponseData(404, e.getMessage());
//        } catch (RuntimeException e) {
//            return new ResponseData(500, e.getMessage());
//        }
//    }
//
//    public ResponseData deleteTodo(long id){
//
//        try{
//            todosRepo.deleteById(id);
//            return new ResponseData(200);
//        } catch (RuntimeException e) {
//            return new ResponseData(500,e.getMessage());
//        }
//
//    }
//
//
//
//    private Todos dtoToTODO(TodoDTO todoDTO) {
//        Todos todos = new Todos();
//        todos.setTitle(todoDTO.getTitle());
//        todos.setDescription(todoDTO.getDescription());
//        todos.setStatus(todoDTO.getStatus());
//        todos.setPriority(todoDTO.getPriority());
//        todos.setCreatedAt(todoDTO.getCreatedAt());
//        todos.setExpireDate(todoDTO.getExpireDate());
//        todos.setOriginalExpireDate(todoDTO.getOriginalExpireDate());
//        todos.setLastExtendedDate(todoDTO.getLastExtendedDate());
//        todos.setExtensionCount(todoDTO.getExtensionCount());
//        todos.setTags(todoDTO.getTags() != null ? new ArrayList<>(todoDTO.getTags()) : new ArrayList<>());
//
//        // Assuming you have a method to get User by id
//        // todos.setUser(getUserById(todoDTO.getUser()));
//        return todos;
//    }
//}
package com.todo.dao;

import com.todo.dto.TodosDTO;
import com.todo.model.Todos;
import com.todo.model.Users;
import com.todo.util.ResponseData;
import com.todo.util.reposetory.TodosRepo;
import com.todo.util.reposetory.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class TodosDAO {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TodosRepo todosRepo;

    public ResponseData createTodo(TodosDTO todosDTO) {
        try {
            Users user = userRepo.findById(todosDTO.getUser())
                    .orElseThrow(() -> new NoSuchElementException("User not exist"));

            Todos todo = dtoToEntity(todosDTO);
            todo.setUser(user);
            todo.setCreatedAt(LocalDateTime.now());

            todosRepo.save(todo);
            return new ResponseData(200);
        } catch (NoSuchElementException e) {
            return new ResponseData(400, e.getMessage());
        } catch (RuntimeException e) {
            return new ResponseData(500, e.getMessage());
        }
    }

    public ResponseData showTodos(long userID) {
        try {
            List<TodosDTO> todos = todosRepo.findTodosDTOByUserId(userID);
            if (todos.isEmpty()) {
                return new ResponseData(204);
            }
            return new ResponseData(200, todos);
        } catch (RuntimeException e) {
            return new ResponseData(500, e.getMessage());
        }
    }

    public ResponseData updateTodo(TodosDTO todosDTO) {
        try {
            Todos todo = todosRepo.findByIdAndUser_UserID(todosDTO.getId(), todosDTO.getUser())
                    .orElseThrow(() -> new NoSuchElementException("Todo not found"));

            if (todosDTO.getTitle() != null && !todosDTO.getTitle().isBlank()) {
                todo.setTitle(todosDTO.getTitle());
            }
            if (todosDTO.getDescription() != null && !todosDTO.getDescription().isBlank()) {
                todo.setDescription(todosDTO.getDescription());
            }
            if (todosDTO.getStatus() != null) {
                todo.setStatus(todosDTO.getStatus());
            }
            if (todosDTO.getPriority() != null) {
                todo.setPriority(todosDTO.getPriority());
            }
            if (todosDTO.getExpireDate() != null) {
                todo.setExpireDate(todosDTO.getExpireDate());
            }
            if (todosDTO.getTags() != null) {
                todo.setTags(todosDTO.getTags());
            }

            todosRepo.save(todo);
            return new ResponseData(200);
        } catch (NoSuchElementException e) {
            return new ResponseData(404, e.getMessage());
        } catch (RuntimeException e) {
            return new ResponseData(500, e.getMessage());
        }
    }

    public ResponseData deleteTodo(long userId, long todoId) {
        try {
            long data = todosRepo.deleteByIdAndUser_UserID(todoId, userId);
            if (data == 0) {
                return new ResponseData(400, "Something went wrong");
            }
            return new ResponseData(200);
        } catch (RuntimeException e) {
            return new ResponseData(500, e.getMessage());
        }
    }

    private Todos dtoToEntity(TodosDTO dto) {
        Todos todo = new Todos();
        todo.setTitle(dto.getTitle());
        todo.setDescription(dto.getDescription());
        todo.setStatus(dto.getStatus());
        todo.setPriority(dto.getPriority());
        todo.setExpireDate(dto.getExpireDate());
        todo.setOriginalExpireDate(dto.getOriginalExpireDate());
        todo.setLastExtendedDate(dto.getLastExtendedDate());
        todo.setExtensionCount(dto.getExtensionCount());
        todo.setTags(dto.getTags());
        return todo;
    }
}
