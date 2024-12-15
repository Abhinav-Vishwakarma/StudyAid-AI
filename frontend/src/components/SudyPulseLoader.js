import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

export default function StudyPulseLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          setTimeout(() => onLoadingComplete(), 500) // Call onLoadingComplete when done
          return 100
        }
        return prevProgress + 1
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onLoadingComplete])


  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-purple-900 to-black overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 bg-blue-500 rounded-full"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="text-center space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Pyramid Icon */}
              <motion.div
                className="mx-auto w-32 h-32 relative"
                animate={{
                  rotateY: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotateY: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="w-32 h-32 bg-blue-500/20 rounded-full absolute blur-xl animate-pulse" />
                <motion.div
                  className="w-0 h-0 border-l-[60px] border-r-[60px] border-b-[104px] border-l-transparent border-r-transparent border-b-blue-500"
                  style={{ margin: "0 auto" }}
                />
              </motion.div>

              {/* Loading Text */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl text-blue-400 font-medium">
                  Loading Knowledge... {progress}%
                </h2>
                <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <h1 className="text-4xl font-bold text-white">
                  Welcome to StudyAid
                </h1>
                <p className="text-gray-400">
                  Demistifying The Chaos of Learning
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              className="text-center space-y-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <h1 className="text-5xl font-bold text-white">
                Welcome to StudyAid
              </h1>
              <p className="text-xl text-gray-300">
                Your learning journey begins here
              </p>
              <Link to="/dashboard">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Get Started
              </motion.button>
              </Link>
            </motion.div>

          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
