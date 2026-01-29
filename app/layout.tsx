import type { Metadata } from "next";
// 1. Tambahkan Archivo_Black di sini
import { Geist, Geist_Mono, Archivo_Black } from "next/font/google"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// 2. Konfigurasi font Archivo Black
const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "PHR Asset Explorer",
  description: "WebGIS Monitoring Aset Pertamina Hulu Rokan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Masukkan variabel archivoBlack ke dalam body className */}
      <body className={`${geistSans.variable} ${archivoBlack.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}