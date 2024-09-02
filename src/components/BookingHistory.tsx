import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


type Event = {
  title: string;
  date: string;
  location: string;
  availableSeats:string
};

type Booking = {
  _id: string;
  event: Event;
  tickets: number;
  bookingDate: string;
  
};

interface BookingHistoryProps {
  userId: string;
}

const BookingHistory: React.FC<BookingHistoryProps> = ({ userId }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const location = useLocation();
  const { user } = location.state || {};

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get<Booking[]>(`http://localhost:3001/api/bookings/${user}`);
        console.log('booking data:',response.data)
        setBookings(response.data);
       
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Booking History</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="border p-4 rounded-lg shadow bg-white">
              <h2 className="text-xl font-semibold">{booking.event.title}</h2>
              <p>Date: {new Date(booking.event.date).toLocaleDateString()}</p>
              <p>Location: {booking.event.location}</p>
              <p>Tickets: {booking.event?.availableSeats}</p>
              <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;
