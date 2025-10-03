package com.todo.util.reposetory;

import com.todo.dto.TodosDTO;
import com.todo.model.Todos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TodosRepo extends JpaRepository<Todos,Long> {

    @Query("SELECT new com.todo.dto.TodosDTO(t.id, t.title, t.description, t.status, t.priority, " +
            "t.createdAt, t.expireDate, t.originalExpireDate, t.lastExtendedDate, " +
            "t.extensionCount, t.user.userID) " +
            "FROM Todos t WHERE t.user.userID = :userId")
    List<TodosDTO> findTodosDTOByUserId(Long userId);


    Optional<Todos> findByIdAndUser_UserID(Long id, Long userId);

    long deleteByIdAndUser_UserID(Long id, Long userId);


}
