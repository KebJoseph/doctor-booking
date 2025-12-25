'use client';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
          <div className="flex gap-6">
            <a href="/" className="text-blue-600 font-medium hover:underline">🏠 Home</a>
            <a href="/appointments" className="text-blue-600 font-medium hover:underline">🗓 Dashboard</a>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
          >
            Sign Out
          </button>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}