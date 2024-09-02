import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


type BookingFormData = {
  event: string;
  seatsBooked: number;
  user: string
};

interface BookingFormProps {
  event: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ event }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<BookingFormData>({
    defaultValues: { event },
  });

  const navigate = useNavigate()

  const onSubmit = async (data: BookingFormData) => {
    try {
      console.log(data,'data')
      await axios.post('http://localhost:3001/api/bookings', { ...data }); 
      alert('Booking successful!');
     
    } catch (error) {
      console.error('Error booking event:', error);
      alert('Booking failed, Not enough seats are available or something went wrong!.');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Book Your Tickets</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Event ID</label>
        <input
          type="text"
          {...register('event', { required: 'Event ID is required' })}
          className={`mt-1 block w-full p-2 border ${
            errors.event ? 'border-red-500' : 'border-gray-300'
          } rounded-md`}
        />
        {errors.event && <p className="text-red-500 text-xs">{errors.event.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">User</label>
        <input
          type="text"
          {...register('user', {
            required: 'user is required',
          })}
          className={`mt-1 block w-full p-2 border ${
            errors.seatsBooked ? 'border-red-500' : 'border-gray-300'
          } rounded-md`}
        />
        {errors.user && <p className="text-red-500 text-xs">{errors.user.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Number of Tickets</label>
        <input
          type="number"
          {...register('seatsBooked', {
            required: 'Number of tickets is required',
            min: { value: 1, message: 'At least 1 ticket is required' },
            max: { value: 10, message: 'You cannot book more than 10 tickets' },
            valueAsNumber: true,
          })}
          className={`mt-1 block w-full p-2 border ${
            errors.seatsBooked ? 'border-red-500' : 'border-gray-300'
          } rounded-md`}
        />
        {errors.seatsBooked && <p className="text-red-500 text-xs">{errors.seatsBooked.message}</p>}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Book Now
      </button>
    </form>
     <button
     className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
     onClick={() => navigate('/history',{ state: { user: getValues('user') } })}
   >
     View Booking History
   </button>
   </>
  );
};

export default BookingForm;
