import React, { useState, useEffect } from "react";
import poster1 from "../assets/2025.jpg";
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
import { IoCalendarClear } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [error, setError] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
          "http://localhost:5000/api/events"
      );
      const data = response.data;
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCategoryClick = (chartIndex, catIndex) => {
    const categoryId = `${chartIndex}-${catIndex}`;
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleRegisterClick = (categoryId, event) => {
    setSelectedEvent({ ...event, categoryId });
    setShowRegisterPopup(true);
  };

  // Current logged-in user id from localStorage
  const currentUserId = JSON.parse(localStorage.getItem("user") || "{}")?.id;

  const handleRegistrationSubmit = async () => {
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    if (!selectedEvent || !selectedEvent.categoryId || !selectedEvent._id) {
      alert("Invalid event data");
      return;
    }

    setRegistrationStatus({ loading: true, error: null, success: false });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to register for events");
        navigate("/login");
        return;
      }

      const response = await axios.put(
      `http://localhost:5000/api/events/${selectedEvent.categoryId}/events/${selectedEvent._id}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setRegistrationStatus({ loading: false, error: null, success: true });
        setShowRegisterPopup(false);
        setShowSuccessPopup(true);
        setSelectedEvent(null);
        setAcceptedTerms(false);
        fetchEvents();
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationStatus({
        loading: false,
        error: error.response?.data?.message || "Failed to register for event",
        success: false,
      });
    }
  };

  const SuccessPopup = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-xl max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-green-400 mb-4">Success!</h3>
        <p className="text-gray-300 mb-6">Successfully registered for event!</p>
        <button
          onClick={() => setShowSuccessPopup(false)}
          className="w-full bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );

  const RegisterPopup = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-xl max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-purple-400 mb-4">
          Register for {selectedEvent?.title}
        </h3>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-2">
            Event Details:
          </h4>
          <p className="text-gray-300">
            Venue: {selectedEvent?.details?.venue}
          </p>
          <p className="text-gray-300">Date: {selectedEvent?.details?.date}</p>
          <p className="text-gray-300">Time: {selectedEvent?.details?.time}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-2">
            Terms and Conditions:
          </h4>
          <div className="bg-gray-700 p-4 rounded-md mb-4 max-h-40 overflow-y-auto text-gray-300 text-sm">
            {selectedEvent?.termsandconditions ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedEvent.termsandconditions,
                }}
              />
            ) : (
              <p>
                1. By registering for this event, you agree to follow all event
                guidelines and rules.
              </p>
            )}
          </div>
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
            />
            I accept the terms and conditions
          </label>
        </div>

        {registrationStatus.error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-100">
            {registrationStatus.error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleRegistrationSubmit}
            disabled={!acceptedTerms || registrationStatus.loading}
            className={`flex-1 bg-purple-500 text-white px-6 py-2 rounded-md transition-all duration-300 
              ${
                !acceptedTerms || registrationStatus.loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-purple-600"
              }`}
          >
            {registrationStatus.loading
              ? "Registering..."
              : "Confirm Registration"}
          </button>
          <button
            onClick={() => {
              setShowRegisterPopup(false);
              setSelectedEvent(null);
              setAcceptedTerms(false);
              setRegistrationStatus({
                loading: false,
                error: null,
                success: false,
              });
            }}
            className="px-6 py-2 border border-gray-500 text-gray-300 rounded-md hover:bg-gray-700 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-black/50 to-black"></div>
          <div className="absolute inset-0 bg-[url('/path/to/pattern.png')] opacity-30 bg-repeat"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-6"
          >
            Our Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed"
          >
            Join us for an unforgettable experience at our carefully curated events
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-center">
            {error}
          </div>
        ) : (
          <div className="space-y-24">
            {events.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Category Header */}
                <div className="sticky top-20 z-10 bg-black/80 backdrop-blur-sm py-6 mb-12">
                  <div className="flex items-center gap-6">
                    <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 whitespace-nowrap">
                      {category.categoryName}
                    </h2>
                    <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
                  </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.Events && category.Events.map((event, eventIndex) => (
                    <motion.div
                      key={eventIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: eventIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative bg-gradient-to-br from-purple-900/20 via-gray-900/40 to-black/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500"
                    >
                      {/* Event Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                      </div>

                      {/* Event Content */}
                      <div className="relative p-6 space-y-4">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                          {event.title}
                        </h3>

                        <p className="text-gray-300 text-sm line-clamp-2 min-h-[40px]">
                          {event.details.description}
                        </p>

                        {/* Event Details */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-300">
                            <IoLocationSharp className="text-purple-400 mr-2 text-lg" />
                            <span className="truncate">{event.details.venue}</span>
                          </div>
                          <div className="flex items-center text-gray-300">
                            <IoCalendarClear className="text-purple-400 mr-2 text-lg" />
                            <span>{event.details.date} | {event.details.time}</span>
                          </div>
                        </div>

                        {/* Registration Button */}
                        {event.registeredStudents?.some((id) => String(id) === String(currentUserId)) ? (
                          <div className="flex items-center justify-center bg-gray-800/80 text-gray-400 px-6 py-3 rounded-xl cursor-not-allowed">
                            <span className="flex items-center gap-2">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Already Registered
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRegisterClick(category._id, event)}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-medium transform hover:translate-y-[-2px] transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                          >
                            Register Now
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Keep the existing modals */}
      {showRegisterPopup && <RegisterPopup />}
      {showSuccessPopup && <SuccessPopup />}
    </div>
  );
};

export default Events;
