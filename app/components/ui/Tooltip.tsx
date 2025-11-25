import { motion } from 'framer-motion';
import { TooltipProps } from '@/app/types';

export default function Tooltip({ label, children, isVisible }: TooltipProps) {
  return (
    <>
      {children}
      {isVisible && (
        <motion.div
          // 1. Agregué z-50 para asegurar que flote sobre el contenido a desenfocar.
          // 2. Usé backdrop-blur-[20px] nativo de Tailwind (o backdrop-blur-xl).
          // 3. ELIMINÉ 'transform -translate-x-1/2' de aquí para evitar conflictos.
          className="absolute top-16 left-1/2 z-50 bg-slate-900/60 text-white px-4 py-2 rounded-full text-sm font-medium shadow-2xl border border-slate-700/30 whitespace-nowrap backdrop-blur-[20px]"
          
          // Movemos el centrado horizontal (x: "-50%") a las props de animación
          // para que conviva pacíficamente con el scale y el y.
          initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
          animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
          exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
          
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.span
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="block"
          >
            {label}
          </motion.span>
        </motion.div>
      )}
    </>
  );
}