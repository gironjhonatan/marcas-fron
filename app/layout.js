import './globals.css';
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">{children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}
