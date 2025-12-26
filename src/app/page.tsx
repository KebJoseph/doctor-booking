'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import BookingForm from './BookingForm';

export default function Home() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      // We removed .eq("verified", true) because the column might not exist
      const { data, error } = await supabase
        .from('doctors')
        .select('*');
      
      if (error) {
        console.error("Supabase Error:", error.message);
      }
      
      if (data) setDoctors(data);
      setLoading(false);
    }
    fetchDoctors();
  }, []);

  if (loading) return <div className="p-10 text-center text-white">Loading Doctors...</div>;

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">Available Doctors</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{doctor.name}</h2>
                <p className="text-blue-600 font-semibold mb-4">{doctor.specialty}</p>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-2">Book an Appointment</p>
                  <BookingForm doctorId={doctor.id} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-center col-span-2">No doctors found in database.</div>
          )}
        </div>
      </div>
    </main>
  );
}