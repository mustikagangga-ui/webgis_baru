'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

// --- DATA KOORDINAT ---
const dataProfilKMB = [
  { id: 1, top: '62.1%', left: '13.3%', nama: 'a' },
  { id: 2, top: '59.58%', left: '13.55%', nama: 'b' },
  { id: 3, top: '57.06%', left: '13.8%', nama: 'c' },
  { id: 4, top: '54.54%', left: '14.05%', nama: 'd' },
  { id: 5, top: '52.02%', left: '14.3%', nama: 'e' },
  { id: 6, top: '49.5%', left: '14.55%', nama: 'f' },
  { id: 7, top: '46.98%', left: '14.8%', nama: 'g' },
  { id: 8, top: '44.46%', left: '15.05%', nama: 'h' },
  { id: 9, top: '41.94%', left: '15.3%', nama: 'i' },
  { id: 10, top: '39.42%', left: '15.55%', nama: 'j' },
  { id: 11, top: '36.9%', left: '15.8%', nama: 'k' },
  { id: 12, top: '34.38%', left: '16.05%', nama: 'l' },
  { id: 13, top: '31.86%', left: '16.3%', nama: 'm' },
  { id: 14, top: '29.34%', left: '16.55%', nama: 'n' },
  { id: 15, top: '26.82%', left: '16.8%', nama: 'o' },
  { id: 16, top: '24.3%', left: '17.05%', nama: 'p' },
  { id: 17, top: '21.78%', left: '17.3%', nama: 'q' },
  { id: 18, top: '19.26%', left: '17.55%', nama: 'r' },
  { id: 19, top: '16.74%', left: '17.8%', nama: 's' },
  { id: 20, top: '14.22%', left: '18.05%', nama: 't' },
  { id: 21, top: '11.7%', left: '18.3%', nama: 'u' },
  { id: 22, top: '5.60%', left: '23.33%', nama: '1' },
  { id: 23, top: '6.20%', left: '26.81%', nama: '2' },
  { id: 24, top: '6.80%', left: '30.29%', nama: '3' },
  { id: 25, top: '7.39%', left: '33.77%', nama: '4' },
  { id: 26, top: '7.99%', left: '37.25%', nama: '5' },
  { id: 27, top: '8.59%', left: '40.73%', nama: '6' },
  { id: 28, top: '9.19%', left: '44.20%', nama: '7' },
];

const dataProfilALR = [
  { id: 101, left: '5.08%', top: '60.20%', nama: 'a' },  
  { id: 102, left: '5.79%', top: '56.90%', nama: 'b' },  
  { id: 103, left: '6.33%', top: '54.48%', nama: 'c' },  
  { id: 104, left: '6.87%', top: '51.21%', nama: 'd' },  
  { id: 105, left: '7.50%', top: '48.27%', nama: 'e' },  
  { id: 106, left: '8.13%', top: '45.24%', nama: 'f' }, 
  { id: 107, left: '9.21%', top: '42.06%', nama: 'g' },  
  { id: 108, left: '9.75%', top: '39.52%', nama: 'h' },  
  { id: 109, left: '9.55%', top: '36.49%', nama: 'i' }, 
  { id: 110, left: '10.29%', top: '33.43%', nama: 'j' }, 
  { id: 111, left: '10.64%', top: '29.76%', nama: 'k' },
  { id: 112, left: '11.35%', top: '26.98%', nama: 'l' },
  { id: 113, left: '12.35%', top: '23.55%', nama: 'm' },
];

const dataProfilCLA = [
  { id: 201, left: '27.49%', top: '17.98%', nama: '1' }, 
  { id: 202, left: '27.91%', top: '26.94%', nama: '2' }, 
  { id: 203, left: '36.07%', top: '33.43%', nama: '3' }, 
  { id: 204, left: '39.06%', top: '36.49%', nama: '4' }, 
  { id: 205, left: '35.50%', top: '51.21%', nama: '5' }, 
  { id: 206, left: '35.67%', top: '66.90%', nama: '6' }, 
  { id: 207, left: '35.59%', top: '87.54%', nama: '7' }, 
];

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
  const handleDownload = (format: 'png' | 'pdf') => {
  const wellCode = activeWell.toLowerCase().split('-')[0];
  const folder = format === 'png' ? 'maps' : 'documents';
  
  // toUpperCase untuk memastikan pengecekan menu akurat
  const isPIAPS = activeMap.toUpperCase().includes("PIAPS");
  const isProfil = activeMap.toUpperCase().includes("PROFIL");

  let fileName = "";
  if (isPIAPS) {
    fileName = `piaps_${wellCode}.${format}`;
  } else if (isProfil) {
    fileName = `profil_${wellCode}.${format}`;
  } else {
    // Fallback untuk peta lainnya
    fileName = `${getFileName(activeMap, activeWell)}.${format}`;
  }

  const filePath = `/${folder}/${fileName}`;

  // Eksekusi Download
  const link = document.createElement('a');
  link.href = filePath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  useEffect(() => {
    if (wellParam) setActiveWell(wellParam);
  }, [wellParam]);

  const wells = ["ALR-001", "KMB-001", "CLA-001"];
  const maps = [
    "Peta Orthophoto", "Peta DTM", "Peta Elevasi", 
    "Peta Kelerengan", "Peta Profil Memanjang dan Melintang", 
    "Peta Geologi", "Peta Hillshade", "Peta Line Density", 
    "Peta Indikatif Areal Perhutanan Sosial (PIAPS)"
  ];
  
  // Helper untuk mendapatkan data koordinat yang sesuai sumur aktif
  const getActiveProfileData = () => {
    switch (activeWell) {
      case "KMB-001": return dataProfilKMB;
      case "ALR-001": return dataProfilALR;
      case "CLA-001": return dataProfilCLA;
      default: return [];
    }
  };

  // Fungsi untuk mencocokkan nama file sesuai gambar
  const getFileName = (mapName: string, wellName: string) => {
    // Mengambil kata kunci dari nama peta (misal: "Topografi")
    const mapKey = mapName.toLowerCase().replace("peta ", "").replace(" ", "");
    
    // Penyesuaian suffix berdasarkan sumur (sesuai folder public/maps)
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

  const currentProfileData = getActiveProfileData();
  
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
          <Link href="https://webgissumurphr.netlify.app/" target="_blank" className="opacity-60 hover:opacity-100 cursor-pointer border-l border-white/30 pl-4 md:pl-8">
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
          {/* 2. Tombol Khusus CLA (Logika ini harus mengenali variabel 'well' di atas) */}
          {wellParam === "CLA-001" && (
            <button 
              onClick={() => setActiveMap("Peta Siteplan Awal")}
              className={`whitespace-nowrap md:whitespace-normal text-left text-[10px] md:text-xs tracking-widest px-4 py-3 rounded-full transition-all cursor-pointer ${
                activeMap === ("siteplanawal") ? 'bg-white text-red-900 font-extrabold shadow-md' : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
              >
                PETA SITEPLAN AWAL
            </button>
            )}

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
                  onClick={() => handleDownload('png')}
                  className="flex items-center gap-2 bg-white border border-gray-300 px-3 py-2 rounded-lg text-[9px] font-bold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer shadow-sm"
                >
                  <span className="text-blue-600">↓</span> DOWNLOAD PNG
                </a>

                {/* Download PDF */}
                <a 
                  onClick={() => handleDownload('pdf')}
                  className="flex items-center gap-2 bg-red-800 px-3 py-2 rounded-lg text-[9px] font-bold text-white hover:bg-red-900 transition-all cursor-pointer shadow-sm"
                >
                  <span>📄</span> DOWNLOAD PDF
                </a>
              </div>
            </div>
            
            {/* Map Area */}
            <motion.div 
              key={`${activeWell}-${activeMap}`} 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex items-center justify-center p-4 bg-gray-50flex-1 flex items-center justify-center p-4 bg-gray-50 overflow-hidden">
              <div className="relative inline-block shadow-lg border border-gray-200 rounded-lg overflow-hidden bg-white">
                <img 
                  src={
                    activeMap === "Peta Profil Memanjang dan Melintang"
                      ? `/maps/profil_${activeWell.toLowerCase().split('-')[0]}.png`
                      : activeMap === "Peta Indikatif Areal Perhutanan Sosial (PIAPS)"
                      ? `/maps/piaps_${activeWell.toLowerCase().split('-')[0]}.png`
                      : `/maps/${getFileName(activeMap, activeWell)}.png`
                  }
                  alt="Peta" 
                  draggable="false"
                  className="w-full h-auto max-h-[73vh] object-contain transition-transform duration-500 group-hover:scale-[1.01] block mx-auto"
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x500?text=DATA+BELUM+TERSEDIA"; }} 
                />

                {/* Hyperlink PDF Dinamis */}
                {activeMap === "Peta Profil Memanjang dan Melintang" && currentProfileData.map((s) => (
                  <a
                    key={`${activeWell}-${s.id}`}
                    href={`/documents/${activeWell.toLowerCase().replace("-", "")}/${s.nama}.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute z-50 rounded-full group"
                    style={{
                      top: s.top,
                      left: s.left,
                      width: '2.5%', 
                      height: '2.5%',
                      transform: 'translate(-50%, -50%)'
                    }}
                    title={`Buka Profil ${s.nama.toUpperCase()}`}
                  >
                    {/* Ring Transparan (Hapus bg-blue-500 jika sudah pas) */}
                    <span className="absolute inset-0 bg-transparent group-hover:bg-red-500/20 ring-1 ring-transparent group-hover:ring-red-500 transition-all duration-200 rounded-full" />
                  </a>
                ))}
                {/* Hyperlink PDF Dinamis - HANYA UNTUK SUMUR CLA-001 */}
                  {activeMap === "Peta Profil Memanjang dan Melintang" && activeWell === "CLA-001" && currentProfileData.map((s) => (
                  <a
                    key={`${activeWell}-${s.id}`}
                    href={`/documents/${activeWell.toLowerCase().replace("-", "")}/${s.nama}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute z-50 group"
                    style={{
                      top: s.top,
                      left: s.left,
                    transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Efek Titik Merah Berdenyut */}
                      <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-md group-hover:scale-150 transition-all duration-300 animate-pulse" />
                    {/* Label Nama  Profil (Muncul saat Hover) */}
                      <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded shadow-xl whitespace-nowrap">
                        Buka Profil {s.nama.toUpperCase()}
                      </div>
                  </a>
                ))}
              </div>
            </motion.div>        
          </div>
        </main>
      </div>
    </motion.div>
  );
}