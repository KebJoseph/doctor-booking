'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/appointments'); // Redirect to the dashboard on success
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600">Admin Login</h1>
      <p className="text-center text-gray-500 mb-6">Enter your credentials to access the dashboard.</p>
      
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            placeholder="mugandamulama@gmail.com" 
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        
        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100 text-center">
            {error}
          </p>
        )}
        
        <button 
          disabled={loading}
          className="bg-blue-600 text-white p-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md disabled:bg-blue-300"
        >
          {loading ? 'Verifying...' : 'Sign In to Dashboard'}
        </button>
      </form>
    </div>
  );
}