import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import boyImage from './assets/boy.png';

export default function App() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const SECRET = import.meta.env.VITE_SECRET_PASSWORD;
  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

  const handleCheck = (e) => {
    e.preventDefault();
    if (password === SECRET) {
      setUnlocked(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#050505] overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,_#050505_70%)]" />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="lock"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: error ? [0, -10, 10, -10, 10, 0] : 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              filter: 'blur(20px)',
              transition: { duration: 0.4 },
            }}
            className="z-10 w-full max-w-sm p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <h2 className="text-white text-center text-xl font-light tracking-[0.2em] mb-8">
              PASSWORD REQUIRED
            </h2>
            <form onSubmit={handleCheck} className="space-y-6">
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white text-center outline-none focus:border-blue-500/50 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="w-full bg-white text-gray-400 font-bold py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                ACCESS
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.6 } },
            }}
            className="z-10 flex flex-col items-center"
          >
            {/* Image Container with Center Scale and Beating Effect */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.2, filter: 'blur(20px)' },
                visible: {
                  opacity: 1,
                  scale: [0.2, 1.05, 1], // Pops slightly large then settles
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.8,
                    ease: 'easeOut',
                  },
                },
              }}
              className="relative group mb-4"
            >
              <motion.div
                // Continuous Beating Animation
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <img
                  src={boyImage}
                  className="rounded-3xl shadow-3xl max-w-[90vw] max-h-[60vh] md:max-w-3xl border border-white/10 object-contain"
                  alt="Boy"
                />
                {/* The Elliptic Shadow Overlay */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.5)_100%)]" />
              </motion.div>
            </motion.div>

            {/* Animated Text */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="text-gray-300 text-4xl md:text-6xl font-black tracking-tighter drop-shadow-lg mb-2"
            >
              Пароль:
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="text-gray-300 text-2xl md:text-4xl tracking-tighter  drop-shadow-lg"
            >
              {SECRET_KEY}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
