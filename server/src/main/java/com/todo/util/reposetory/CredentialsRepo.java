package com.todo.util.reposetory;

import com.todo.dto.CredentialsDTO;
import com.todo.model.Credentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CredentialsRepo extends JpaRepository<Credentials,Long> {


    List<Credentials> findByUser_UserID(Long userId);
    // DTO fetch (new way)
    @Query("SELECT new com.todo.dto.CredentialsDTO(c.id, c.url, c.username, c.description, c.createAt, c.user.userID) " +
            "FROM Credentials c WHERE c.user.userID = :userId")
    List<CredentialsDTO> findAllDTOByUserId(Long userId);

    // Find a single credential by userId + credentialId
    Optional<Credentials> findByIdAndUser_UserID(Long id, Long userId);

    long deleteByIdAndUser_UserID(Long id, Long userId);

}
