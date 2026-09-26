package com.eventconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventconnect.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}