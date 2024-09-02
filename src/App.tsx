import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import BookingForm from './components/BookingForm';
import BookingHistory from './components/BookingHistory';
import { useLocation } from 'react-router-dom';

const mockUserId = 'user-123';
const mockEventId = 'event-456';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/book" element={<BookingWrapper />} />
          <Route path="/history" element={<BookingHistory userId={mockUserId} />} />
        </Routes>
      </div>
    </Router>
  );
};

const BookingWrapper: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = location.state || {};
  const handleBookingSuccess = () => {
    alert('Booking successful!');
    navigate('/history');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book an Event</h1>
      <BookingForm event={eventId} />
    </div>
  );
};

export default App;
