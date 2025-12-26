'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function BookingForm({ doctorId }: { doctorId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const { error } = await supabase.from("appointments").insert([
      {
        doctor_id: doctorId,
        full_name: formData.get("name"),
        email: formData.get("email"),
        appointment_time: formData.get("date"),
        status: 'active'
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  if (isSuccess) {
    return (
      <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
        <p className="font-bold">✅ Appointment Booked!</p>
        <p className="text-sm">We'll see you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleBooking} className="mt-4 space-y-2 p-4 border rounded bg-gray-50">
      <input 
        name="name" 
        placeholder="Full Name" 
        required
        className="w-full p-2 border rounded text-black" 
      />
      <input 
        name="email" 
        type="email" 
        placeholder="Email Address" 
        required
        className="w-full p-2 border rounded text-black" 
      />
      <input 
        name="date" 
        type="datetime-local" 
        required
        className="w-full p-2 border rounded text-black" 
      />
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full text-white p-2 rounded font-bold transition-colors ${
          isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Booking..." : "Book Appointment"}
      </button>
    </form>
  );
}