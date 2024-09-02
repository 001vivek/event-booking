import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Event = {
  _id: string;
  title: string;
  date: string;
  location: string;
  availableSeats: number;
};

const Homepage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>('http://localhost:3001/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleBookClick = (eventId: string) => {
    navigate(`/book`, { state: { eventId } }); 
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 ">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id} className="border p-4 rounded-lg bg-white shadow">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{new Date(event.date).toLocaleDateString()} date</p>
            <p>Location: {event.location} location</p>
            <p>Available Seats: {event.availableSeats} </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              // onClick={() => console.log('Booking event:', event._id)}
              onClick={() => handleBookClick(event._id)} 
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;