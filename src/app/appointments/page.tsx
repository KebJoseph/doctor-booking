'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

interface Appointment {
  id: string;
  full_name: string;
  email: string;
  appointment_time: string;
  status: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuthAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/login');
      return;
    }

    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('status', 'active')
      .eq('doctor_id', user.id);

    if (!error && data) {
      setAppointments(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const handleComplete = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('appointments')
      .update({ status: 'completed' })
      .eq('id', id)
      .eq('doctor_id', user.id);

    if (!error) {
      setAppointments(prev => prev.filter(apt => apt.id !== id));
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">Your Scheduled Appointments</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Patient</th>
              <th className="p-4 font-semibold text-gray-700">Email</th>
              <th className="p-4 font-semibold text-gray-700">Date & Time</th>
              <th className="p-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((apt) => (
                <tr key={apt.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{apt.full_name}</td>
                  <td className="p-4 text-gray-600">{apt.email}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(apt.appointment_time).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleComplete(apt.id)}
                      className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition"
                    >
                      Done
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-400">
                  No active appointments found for you.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}