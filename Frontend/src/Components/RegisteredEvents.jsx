import React, { useEffect, useState } from "react";

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const fetchRegisteredEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || token === "null" || token === "undefined") {
        throw new Error("No valid token provided");
      }

      const response = await fetch("http://localhost:5000/api/events/registered", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Correct header
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again.");
        } else {
          throw new Error("Failed to fetch registered events");
        }
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRegisteredEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-semibold mb-6">My Registered Events</h1>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-white px-4 py-2 rounded-md mb-6">
          {error}
        </div>
      )}

      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={`${event.categoryId}-${event.eventId || event.title}`}
              className="p-4 border border-white/20 rounded-md bg-white/5"
            >
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p>{event.details?.description}</p>
              <p className="text-sm text-gray-400">
                Date: {event.details?.date} • Time: {event.details?.time} • Venue: {event.details?.venue}
              </p>
              <p className="text-xs text-gray-500">Category: {event.categoryName}</p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No registered events found.</p>
      )}
    </div>
  );
};

export default RegisteredEvents;
