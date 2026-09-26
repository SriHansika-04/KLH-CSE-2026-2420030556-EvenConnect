package com.eventconnect.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventName;

    private String dateTime;

    private String venue;

    private String description;

    private String ticketInformation;

    private boolean published;

    public Event() {
    }

    public Event(String eventName, String dateTime, String venue,
                 String description, String ticketInformation,
                 boolean published) {
        this.eventName = eventName;
        this.dateTime = dateTime;
        this.venue = venue;
        this.description = description;
        this.ticketInformation = ticketInformation;
        this.published = published;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTicketInformation() {
        return ticketInformation;
    }

    public void setTicketInformation(String ticketInformation) {
        this.ticketInformation = ticketInformation;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }
}