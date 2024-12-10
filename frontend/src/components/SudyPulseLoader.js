import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const StudyPulseLoader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          onLoadingComplete();
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  useEffect(() => {
    controls.start({ scaleY: progress / 100 });
  }, [progress, controls]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative w-64 mb-8">
        {/* Pulsing circle */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-200"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Stack of books */}
        <div className="relative w-40 h-40 mx-auto">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute bottom-0 left-0 right-0 h-8 bg-blue-500 rounded"
              style={{
                bottom: `${index * 2}rem`,
                left: `${index * 0.5}rem`,
                right: `${index * 0.5}rem`,
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-300 rounded-full mt-8 overflow-hidden">
          <motion.div
            className="h-full bg-red-400"
            animate={controls}
            initial={{ scaleX: 0 }}
            style={{ originX: 0, transformOrigin: "left" }}
          />
        </div>

        {/* Progress text */}
        <motion.p
          className="mt-2 text-xl font-bold text-blue-600 text-center"
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading Knowledge... {progress}%
        </motion.p>
      </div>

      {/* Welcome message */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to StudyAid
        </h1>
        <p className="text-xl text-gray-600">
          Demistifying The Chaos of Learning
        </p>
      </motion.div>
    </div>
  );
};

export default StudyPulseLoader;
