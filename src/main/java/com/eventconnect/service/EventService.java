package com.eventconnect.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eventconnect.model.Event;
import com.eventconnect.repository.EventRepository;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // Create Event
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    // View all Events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // View Event Details
    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    // Update Event
    public Event updateEvent(Long id, Event eventDetails) {

        Event event = eventRepository.findById(id).orElse(null);

        if (event == null) {
            return null;
        }

        event.setEventName(eventDetails.getEventName());
        event.setDateTime(eventDetails.getDateTime());
        event.setVenue(eventDetails.getVenue());
        event.setDescription(eventDetails.getDescription());
        event.setTicketInformation(eventDetails.getTicketInformation());
        event.setPublished(eventDetails.isPublished());

        return eventRepository.save(event);
    }

    // Delete Event
    public boolean deleteEvent(Long id) {

        if (!eventRepository.existsById(id)) {
            return false;
        }

        eventRepository.deleteById(id);
        return true;
    }

    // Search Event
    public List<Event> searchEvents(String keyword) {

        List<Event> events = eventRepository.findAll();

        return events.stream()
                .filter(event ->
                    (event.getEventName() != null &&
                     event.getEventName().toLowerCase().contains(keyword.toLowerCase()))
                    ||
                    (event.getVenue() != null &&
                     event.getVenue().toLowerCase().contains(keyword.toLowerCase()))
                    ||
                    (event.getDescription() != null &&
                     event.getDescription().toLowerCase().contains(keyword.toLowerCase()))
                )
                .toList();
    }
}