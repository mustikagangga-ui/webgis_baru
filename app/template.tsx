'use client';
import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // Keadaan awal (muncul dari transparan)
      initial={{ opacity: 0, y: 10 }}
      // Keadaan saat halaman aktif
      animate={{ opacity: 1, y: 0 }}
      // Durasi dan jenis animasi
      transition={{ ease: 'easeInOut', duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}