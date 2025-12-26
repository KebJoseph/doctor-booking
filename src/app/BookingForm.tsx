"use client";

import { useState } from "react"; // 1. Add useState
import { supabase } from "../lib/supabase";

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
}