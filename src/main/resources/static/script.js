const API_URL = "/api/events";


// ===============================
// Load All Events
// ===============================

async function loadEvents() {

    try {

        const response = await fetch(API_URL);

        const events = await response.json();

        displayEvents(events);

    } catch (error) {

        console.error("Error loading events:", error);

        document.getElementById("eventList").innerHTML =
            "<p>Unable to load events.</p>";
    }
}


// ===============================
// Display Events
// ===============================

function displayEvents(events) {

    const eventList = document.getElementById("eventList");

    eventList.innerHTML = "";

    if (events.length === 0) {

        eventList.innerHTML = "<p>No events found.</p>";

        return;
    }

    events.forEach(event => {

        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `

            <h3>${event.eventName}</h3>

            <p>
                <strong>Date & Time:</strong>
                ${event.dateTime}
            </p>

            <p>
                <strong>Venue:</strong>
                ${event.venue}
            </p>

            <p>
                <strong>Description:</strong>
                ${event.description}
            </p>

            <p>
                <strong>Ticket:</strong>
                ${event.ticketInformation}
            </p>

            <p class="status">
                <strong>Status:</strong>
                ${event.published ? "Published" : "Not Published"}
            </p>

            <button
                class="update-btn"
                onclick="updateEvent(${event.id})">
                Update
            </button>

            <button
                class="delete-btn"
                onclick="deleteEvent(${event.id})">
                Delete
            </button>

        `;

        eventList.appendChild(card);
    });
}


// ===============================
// Search Events
// ===============================

async function searchEvents() {

    const keyword =
        document.getElementById("searchInput").value.trim();

    if (keyword === "") {

        loadEvents();

        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/search?keyword=${encodeURIComponent(keyword)}`
            );

        const events = await response.json();

        displayEvents(events);

    } catch (error) {

        console.error("Search error:", error);

        alert("Unable to search events.");
    }
}


// ===============================
// Create Event
// ===============================

document
    .getElementById("eventForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const newEvent = {

            eventName:
                document.getElementById("eventName").value,

            dateTime:
                document.getElementById("dateTime").value,

            venue:
                document.getElementById("venue").value,

            description:
                document.getElementById("description").value,

            ticketInformation:
                document.getElementById("ticketInformation").value,

            published:
                document.getElementById("published").checked
        };


        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(newEvent)
            });


            if (!response.ok) {

                throw new Error("Failed to create event.");
            }


            alert("Event created successfully!");

            document
                .getElementById("eventForm")
                .reset();

            loadEvents();


        } catch (error) {

            console.error("Create event error:", error);

            alert("Unable to create event.");
        }

    });


// ===============================
// Delete Event
// ===============================

async function deleteEvent(id) {

    const confirmation =
        confirm("Are you sure you want to delete this event?");


    if (!confirmation) {
        return;
    }


    try {

        const response =
            await fetch(`${API_URL}/${id}`, {

                method: "DELETE"

            });


        if (!response.ok) {

            throw new Error("Failed to delete event.");
        }


        alert("Event deleted successfully!");

        loadEvents();


    } catch (error) {

        console.error("Delete error:", error);

        alert("Unable to delete event.");
    }
}


// ===============================
// Update Event
// ===============================

async function updateEvent(id) {

    const eventName =
        prompt("Enter new event name:");

    if (eventName === null) {
        return;
    }


    const dateTime =
        prompt("Enter new date and time:");

    if (dateTime === null) {
        return;
    }


    const venue =
        prompt("Enter new venue:");

    if (venue === null) {
        return;
    }


    const description =
        prompt("Enter new description:");

    if (description === null) {
        return;
    }


    const ticketInformation =
        prompt("Enter new ticket information:");

    if (ticketInformation === null) {
        return;
    }


    const published =
        confirm("Should this event be published?");


    const updatedEvent = {

        eventName: eventName,

        dateTime: dateTime,

        venue: venue,

        description: description,

        ticketInformation: ticketInformation,

        published: published

    };


    try {

        const response =
            await fetch(`${API_URL}/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedEvent)

            });


        if (!response.ok) {

            throw new Error("Failed to update event.");
        }


        alert("Event updated successfully!");

        loadEvents();


    } catch (error) {

        console.error("Update error:", error);

        alert("Unable to update event.");
    }
}


// ===============================
// Load Events When Page Opens
// ===============================

window.onload = function() {

    loadEvents();

};