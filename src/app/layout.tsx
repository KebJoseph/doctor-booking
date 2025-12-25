import "./globals.css";

export const metadata = {
  title: "The Care Bridge",
  description: "Book your doctor appointments easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white border-b p-4 shadow-sm flex justify-center gap-8 sticky top-0 z-50">
          <a href="/" className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-2">
            🏠 Home (Doctors)
          </a>
          <a href="/appointments" className="font-bold text-gray-600 hover:text-blue-600 flex items-center gap-2">
            📅 View Appointments
          </a>
        </nav>

        {/* This renders the content of your pages */}
        <main>{children}</main>
      </body>
    </html>
  );
}