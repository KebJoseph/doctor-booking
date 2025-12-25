import { supabase } from '../lib/supabase';
import BookingForm from '../BookingForm';
  const { data: doctors, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("verified", true);

  if (error) {
    return <div className="p-10 text-red-600">Error loading doctors: {error.message}</div>;
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">Available Doctors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors?.map((doctor: any) => (
          <div key={doctor.id} className="p-6 border rounded-xl shadow-sm bg-white">
            <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
            <p className="text-blue-600 font-medium mb-4">{doctor.specialty || "General Practitioner"}</p>
            
            <hr className="my-4" />
            
            <p className="text-sm font-bold text-gray-400 uppercase mb-2">Instant Booking</p>
            <BookingForm doctorId={doctor.id} />
          </div>
        ))}
      </div>
    </div>
  );
}