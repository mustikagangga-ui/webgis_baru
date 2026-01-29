'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="bg-red-900 h-screen text-white flex items-center justify-center font-bold">LOADING DATA...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const wellParam = searchParams.get('well') || 'ALR-001';
  
  const [activeWell, setActiveWell] = useState(wellParam);
  const [activeMap, setActiveMap] = useState('Peta Orthophoto');

  useEffect(() => {
    if (wellParam) setActiveWell(wellParam);
  }, [wellParam]);

  const wells = ["ALR-001", "KMB-001", "CLA-001"];
  const maps = ["Peta Orthophoto", 
                "Peta Topografi", 
                "Peta Elevasi", 
                "Peta Kelerengan",
                "Peta Profil Memanjang dan Melintang", 
                "Peta Geologi", 
                "Peta Hillshade", 
                "Peta Line Density", 
                "Peta Indikatif Areal Perhutanan Sosial (PIAPS)"];
  // Fungsi untuk mencocokkan nama file sesuai gambar VS Code Anda
  const getFileName = (mapName: string, wellName: string) => {
    // Mengambil kata kunci dari nama peta (misal: "Topografi")
    const mapKey = mapName.toLowerCase().replace("peta ", "").replace(" ", "");
    
    // Penyesuaian suffix berdasarkan sumur (sesuai folder public/maps Anda)
    let suffix = wellName.toLowerCase();
    if (wellName === "CLA-001") suffix = "cla"; 
    if (wellName === "KMB-001") suffix = "kmb";
    if (wellName === "ALR-001") suffix = "alr";
    
    // Variabel untuk animasi Sidebar (Slide dari kiri)
    const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } 
      }
    };

    // Variabel untuk animasi tiap tombol di dalam Sidebar (Stagger)
    const itemVariants = {
      hidden: { x: -20, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    };
    return `${mapKey}_${suffix}`;
  };

  return (
    // Tambahkan select-none dan cursor-default di container utama
    <motion.div className="flex flex-col h-screen bg-white font-sans overflow-hidden select-none cursor-default">
      
      {/* Header Merah */}
      <header className="bg-red-800 p-4 flex flex-col md:flex-row justify-between items-center text-white px-6 md:px-10 gap-4 shadow-md z-30">
        
        <div className="text-center md:text-left">
          <span className="text-[10px] uppercase tracking-widest opacity-70 block font-semibold select-none">Sumur</span>
          <span className="font-bold text-lg md:text-2xl tracking-wider font-archivo select-none">{activeWell}</span>
        </div>

        {/* NAVIGASI ATAS: Menggunakan Kursor Pointer (Tangan) */}
        <nav className="flex gap-4 md:gap-8 font-bold text-[10px] tracking-widest uppercase items-center">
          {wells.map((w) => (
            <Link 
              key={w} 
              href={`/parameter?well=${w}`} 
              className={`transition-all duration-300 cursor-pointer ${
                activeWell === w 
                  ? 'border-b-2 border-white pb-1 scale-110 opacity-100' 
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
              {w}
            </Link>
          ))}
          <Link href="/parameter" className="opacity-60 hover:opacity-100 cursor-pointer border-l border-white/30 pl-4 md:pl-8">
            WEBGIS
          </Link>
          <Link href="/" className="opacity-60 hover:opacity-100 cursor-pointer pl-1 md:pl-2">
            DASHBOARD
          </Link>
        </nav>
      </header>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar Menu Peta */}
        <motion.aside className="w-full md:w-72 bg-red-900 p-4 md:p-8 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto z-20 shadow-inner">
          {maps.map((map) => (
            <button 
              key={map} 
              onClick={() => setActiveMap(map)} 
              className={`whitespace-nowrap md:whitespace-normal text-left text-[10px] md:text-xs tracking-widest px-4 py-3 rounded-full transition-all cursor-pointer ${
                activeMap === map ? 'bg-white text-red-900 font-extrabold shadow-md' : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              {map.toUpperCase()}
            </button>
          ))}
        </motion.aside>

        {/* Display Peta Utama: Menggunakan kursor Crosshair agar terasa seperti GIS */}
        <main className="flex-1 bg-gray-100 p-4 md:p-8 overflow-hidden">
          <div className="bg-white h-full rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
            {/* TOOLBAR DOWNLOAD */}
            <div className="p-4 bg-gray-50 border-b px-6 flex flex-col lg:flex-row justify-between items-center gap-4">
              <h2 className="text-red-900 font-bold tracking-widest text-[10px] md:text-xs uppercase">
                {activeMap} — {activeWell}
              </h2>
              
              <div className="flex gap-2">
                {/* Download PNG */}
                <a 
                  href={`/maps/${getFileName(activeMap, activeWell)}.png`}
                  download={`${getFileName(activeMap, activeWell)}.png`}
                  className="flex items-center gap-2 bg-white border border-gray-300 px-3 py-2 rounded-lg text-[9px] font-bold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer shadow-sm"
                >
                  <span className="text-blue-600">↓</span> DOWNLOAD PNG
                </a>

                {/* Download PDF */}
                <a 
                  href={`/documents/${getFileName(activeMap, activeWell)}.pdf`}
                  download={`${getFileName(activeMap, activeWell)}.pdf`}
                  className="flex items-center gap-2 bg-red-800 px-3 py-2 rounded-lg text-[9px] font-bold text-white hover:bg-red-900 transition-all cursor-pointer shadow-sm"
                >
                  <span>📄</span> DOWNLOAD PDF
                </a>
              </div>
            </div>
            
            {/* AREA PETA */}
            <motion.div 
            key={`${activeWell}-${activeMap}`} // Penting: memicu animasi ulang saat peta berubah
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex items-center justify-center p-2 bg-white cursor-crosshair group relative overflow-hidden">
              <img 
                src={`/maps/${getFileName(activeMap, activeWell)}.png`} 
                alt="Peta" 
                draggable="false"
                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                onError={(e) => { 
                  e.currentTarget.src = "https://via.placeholder.com/800x500?text=DATA+TIDAK+DITEMUKAN"; 
                }} 
              />
            </motion.div>          
          </div>
        </main>
      </div>
    </motion.div>
  );
}