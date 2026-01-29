'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-hidden relative select-none cursor default">
      
      {/* 1. GAMBAR BACKGROUND FULL (Mencakup hingga footer) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/sumur_phr.jpg" // Ganti dengan nama file gambar Anda
          alt="Background PHR Full" 
          draggable="false" // Ini mencegah gambar diseret/dipindah
          className="w-full h-full object-cover opacity-30" // Opacity rendah agar teks tetap terbaca
        />
      </div>

      {/* SEKSI LOGO (Pojok Kiri Atas) */}
      <div className="absolute top-8 left-16 z-20 flex items-center gap-4 select-none">
        {/* Logo PHR */}
        <img 
          src="/logo_PHR.png" 
          alt="Logo PHR" 
          draggable="false" // Ini mencegah gambar diseret/dipindah
          className="h-10 md:h-12 w-auto object-contain select-none pointer-events-none" 
        />
        
        {/* Garis Pemisah Tipis (Opsional, agar terlihat lebih rapi) */}
        <div className="h-8 w-[1px] bg-gray-300"></div>
        
        {/* Logo ITB (Sebelah Kanan Logo PHR) */}
        <img 
          src="/logo_itb.png" 
          alt="Logo ITB" 
          draggable="false" // Ini mencegah gambar diseret/dipindah
          className="h-10 md:h-12 w-auto object-contain select-none pointer-events-none" 
        />
      </div>

      {/* KONTEN UTAMA */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-red-800 text-5xl md:text-7xl font-bold tracking-[0.4em] mb-4 uppercase select-none cursor-default">WELCOME</h1>
          <p className="text-gray-500 text-sm md:text-base tracking-[0.1em] mb-12 font-medium select-none cursor-default">
            3 Sumur Minyak Pertamina Hulu Rokan
          </p>

          <Link href="/selection">
            <motion.button className="bg-red-800 text-white px-16 py-4 rounded-full text-sm font-bold tracking-[0.3em] hover:bg-red-900 hover:scale-105 transition-all uppercase active:scale-95 cursor-pointer">
              MASUK
            </motion.button>
          </Link>
        </div>
      </main>

      <footer className="p-10 text-center">
        <p className="text-[10px] text-gray-400 tracking-[0.4em] uppercase font-semibold">
          dibuat oleh: MGN, NKAS, RR
        </p>
      </footer>
    </div>
  );
}