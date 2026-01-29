'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SelectionPage() {
  const wells = ["ALR-001", "KMB-001", "CLA-001"];

  return (
    <div className="min-h-screen bg-red-900 flex flex-col items-center font-sans text-white p-6 md:p-10 relative overflow-x-hidden select-none cursor-default">
      {/* Navbar Atas */}
      <nav className="w-full md:absolute top-0 right-0 p-6 flex justify-center md:justify-end gap-6 text-[10px] font-bold tracking-widest uppercase z-20">
        {wells.map((w) => (
          <Link 
            key={w} 
            href={`/parameter?well=${w}`} 
            className="hover:text-gray-300 transition-colors cursor-pointer"
          >
            {w}
          </Link>
        ))}
        <Link href="/parameter" className="hover:text-gray-300 border-b border-white pb-1">WEBGIS</Link>
        <Link href="/" className="hover:text-gray-300 border-b border-white pb-1">DASHBOARD</Link>
      </nav>

      {/* Judul Utama */}
      <div className="mt-12 md:mt-32 mb-10 md:mb-16 text-center z-10 px-4">
        <Link href="/parameter">
          <h1 className="text-2xl md:text-4xl font-bold tracking-[0.2em] uppercase hover:text-gray-200 hover:scale-105 transition-all">
            AKSES WEBGIS PETA INTERAKTIF
          </h1>
        </Link>
      </div>

      {/* KONFIGURASI RESPONSIVE: 
          grid-cols-1 (HP: 1 Kolom ke bawah)
          lg:grid-cols-3 (Laptop: 3 Kolom ke samping) 
      */}
      {/* Grid Sumur di Halaman 2 */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl px-4 pb-20">
  {wells.map((well) => (
    <Link key={well} href={`/parameter?well=${well}`} className="cursor-pointer">
      <div className="flex flex-col items-center group bg-white/5 lg:bg-transparent p-6 lg:p-0 rounded-2xl transition-all">
        
        {/* Wadah Gambar Sumur */}
        <div className="w-full max-w-[240px] aspect-square bg-white/10 rounded-xl mb-4 flex items-center justify-center overflow-hidden border border-white/20 group-hover:border-white transition-all shadow-xl">
          <img 
            // Memanggil gambar berdasarkan nama: alr-001.png, kmb-001.png, atau cla-001.png
            src={`/${well.toLowerCase()}.png`} 
            alt={`${well}`} 
            draggable="false"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 pointer-events-none"
          />
        </div>

        {/* Nama Sumur dengan kontras terbalik */}
<span className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase transition-all duration-300 select-none text-white/40 group-hover:text-white group-hover:scale-110">
  {well}
</span>
      </div>
    </Link>
  ))}
</div>

      {/* Footer Dekoratif */}
      <div className="absolute bottom-6 w-full text-center text-[9px] md:text-[9px] tracking-[0.3em] md:tracking-[0.3em] opacity-30 uppercase px-4">
        PERTAMINA HULU ROKAN — KERJA PRAKTIK
      </div>
    </div>
  );
}