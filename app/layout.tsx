import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { WorkoutProvider } from "./context/WorkoutContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog - Workout Library",
  description: "Train hard, log honest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} font-sans bg-background text-textPrimary flex flex-col min-h-screen`}>
        <WorkoutProvider>
          <Navbar />
          <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8">
            {children}
          </main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}