"use client";

import { useState } from "react"; // 1. Add useState
import { supabase } from "../lib/supabase";

export default function BookingForm({ doctorId }: { doctorId: number }) {
  // 2. Create "states" to track if we are loading or finished
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

    const form = e.currentTarget;
    const formData = new FormData(form);

    const { error } = await supabase.from("appointments").insert([
  {
    doctor_id: doctorId, // Links the booking to the current doctor
    full_name: formData.get("name"), // Matches 'full_name' in your display code
    email: formData.get("email"), // Matches 'email' in your display code
    appointment_time: formData.get("date"), // Matches 'appointment_time' in your display code
    status: 'active' // Sets the appointment as active so it shows on the dashboard
  },
]);

    setIsSubmitting(false); // Stop loading

    if (error) {
      alert("Error: " + error.message);
    } else {
      setIsSuccess(true); // Show success message
      form.reset();
      
      // Hide the success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  // 3. Show a nice success box if the booking worked
  if (isSuccess) {
    return (
      <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center animate-pulse">
        <p className="font-bold">✅ Appointment Booked!</p>
        <p className="text-sm">We'll see you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleBooking} className="mt-4 space-y-2 p-4 border rounded bg-gray-50">
      <input name="name" placeholder="Full Name" className="w-full p-2 border rounded text-black" required />
      <input name="email" type="email" placeholder="Email Address" className="w-full p-2 border rounded text-black" required />
      <input name="date" type="datetime-local" className="w-full p-2 border rounded text-black" required />
      
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