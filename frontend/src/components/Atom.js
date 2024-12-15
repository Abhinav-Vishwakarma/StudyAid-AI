import React from 'react';
import { motion } from 'framer-motion';

const Atom = () => {
  return (
    <motion.div
      className="relative w-40 h-40"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {/* Nucleus */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-8 h-8 bg-blue-500 rounded-full"
        style={{ transform: 'translate(-50%, -50%)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Electron Orbits */}
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute top-0 left-0 w-full h-full border-4 border-blue-300 rounded-full"
          style={{ 
            transform: `rotateX(${60 * index}deg)`,
          }}
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            rotate: { duration: 10 - index * 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Electron */}
          <motion.div
            className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full"
            style={{ transform: 'translate(-50%, -50%)' }}
            animate={{ 
              rotate: -360,
            }}
            transition={{ 
              duration: 10 - index * 2, 
              repeat: Infinity, 
              ease: "linear"
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Atom;

