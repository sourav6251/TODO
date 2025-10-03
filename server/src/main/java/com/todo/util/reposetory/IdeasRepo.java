package com.todo.util.reposetory;

import com.todo.dto.IdeasDTO;
import com.todo.model.Ideas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IdeasRepo extends JpaRepository<Ideas,Long> {

    Optional<Ideas> findByIdAndUser_UserID(Long id, Long userId);
  long deleteByIdAndUser_UserID(Long id, Long userId);

    @Query("SELECT new com.todo.dto.IdeasDTO(i.id, i.title, i.description, i.createAt, i.user.userID) " +
            "FROM Ideas i WHERE i.user.userID = :userId")
    List<IdeasDTO> findIdeasDTOByUserId(Long userId);

}
