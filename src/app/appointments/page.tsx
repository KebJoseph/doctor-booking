import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default async function AppointmentsPage() {
  // Fetch appointments and join with doctor names
  const { data: appointments, error } = await supabase
    .from("appointments")
    .select(`
      id,
      patient_name,
      patient_email,
      appointment_date,
      doctors (
        name
      )
    `)
    .order("appointment_date", { ascending: true });

  if (error) {
    return <div className="p-10 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Scheduled Appointments</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Doctors
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Patient</th>
              <th className="p-4 font-semibold text-gray-700">Doctor</th>
              <th className="p-4 font-semibold text-gray-700">Date & Time</th>
              <th className="p-4 font-semibold text-gray-700">Contact</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((apt: any) => (
              <tr key={apt.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-gray-800 font-medium">{apt.patient_name}</td>
                <td className="p-4 text-blue-700">{apt.doctors?.name}</td>
                <td className="p-4 text-gray-600">
                  {new Date(apt.appointment_date).toLocaleString()}
                </td>
                <td className="p-4 text-gray-500 text-sm">{apt.patient_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {appointments?.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
}