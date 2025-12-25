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
        <nav className="bg-white border-b p-4 flex justify-between-items-center shadow-sm">
  <div className="flex gap-6">
    <a href="/" className="text-blue-600 font-medium hover:text-blue-800">
      🏠 Home (Doctors)
    </a>
  </div> {/* This closing div on line 20 stays! */}
  <div className="text-sm text-gray-500 font-medium">
    Admin Portal
  </div>
</nav>
        <main>{children}</main>
      </body>
    </html>
  );
}