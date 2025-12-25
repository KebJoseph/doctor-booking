'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      // 1. The Gatekeeper: Check if you are logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // If not logged in, redirect to the login page
        router.push('/login');
        return;
      }

      // 2. Fetch data: Only runs if the user check above passed
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching appointments:', error);
      } else {
        setAppointments(data || []);
      }
      setLoading(false);
    };

    checkAuthAndFetch();
  }, [router]);

  // Show a loading screen while checking credentials
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-500 font-medium">
        Verifying Admin Access...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button 
          onClick={async () => { 
            await supabase.auth.signOut(); 
            router.push('/login'); 
          }}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-700">Patient Name</th>
              <th className="p-4 font-semibold text-gray-700">Email Address</th>
              <th className="p-4 font-semibold text-gray-700">Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((apt) => (
                <tr key={apt.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{apt.full_name}</td>
                  <td className="p-4 text-gray-600">{apt.email}</td>
                  <td className="p-4 text-gray-600">{new Date(apt.appointment_time).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-10 text-center text-gray-400">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}