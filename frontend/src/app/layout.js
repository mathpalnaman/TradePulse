import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PrimeTrade | Crypto Journal",
  description: "Advanced trading intelligence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <footer className="w-full py-6 text-center text-xs text-crypto-muted border-t border-crypto-border/50 mt-auto">
            <p>© {new Date().getFullYear()} PrimeTrade.ai // Advanced Terminal</p>
          </footer>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#121212",
                color: "#fff",
                border: "1px solid #2A2A2A",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}