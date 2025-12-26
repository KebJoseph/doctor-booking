import "./globals.css";

export const metadata = {
  title: 'Doctor Booking',
  description: 'Manage your appointments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
       <nav className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
          <div className="flex gap-6">
            <a href="/" className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1">
              🏠 Home (Doctors)
            </a>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="tel:0757148814" 
              className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              📞 Emergency: 0757148814
            </a>
            <div className="text-sm text-gray-400 italic">
              Admin Portal
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}