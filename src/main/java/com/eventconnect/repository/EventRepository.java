package com.eventconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventconnect.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
}