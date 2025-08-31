package com.todo.util.enums.reposetory;

import com.todo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<Users,String> {

//    Optional<Users> findBy
}
