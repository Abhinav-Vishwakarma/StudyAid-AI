import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

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


{/* <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-600/30" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%238B5CF6'/%3E%3Cstop offset='1' stop-color='%233B82F6'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpath fill='%23444' d='M90 150L0 300 180 300z'/%3E%3Cpath d='M90 150L180 0 0 0z'/%3E%3Cpath fill='%23AAA' d='M270 150L360 0 180 0z'/%3E%3Cpath fill='%23DDD' d='M450 150L360 300 540 300z'/%3E%3Cpath fill='%23999' d='M450 150L540 0 360 0z'/%3E%3Cpath d='M630 150L540 300 720 300z'/%3E%3Cpath fill='%23DDD' d='M630 150L720 0 540 0z'/%3E%3Cpath fill='%23444' d='M810 150L720 300 900 300z'/%3E%3Cpath fill='%23FFF' d='M810 150L900 0 720 0z'/%3E%3Cpath fill='%23DDD' d='M990 150L900 300 1080 300z'/%3E%3Cpath fill='%23444' d='M990 150L1080 0 900 0z'/%3E%3Cpath fill='%23DDD' d='M90 450L0 600 180 600z'/%3E%3Cpath d='M90 450L180 300 0 300z'/%3E%3Cpath fill='%23666' d='M270 450L180 600 360 600z'/%3E%3Cpath fill='%23AAA' d='M270 450L360 300 180 300z'/%3E%3Cpath fill='%23DDD' d='M450 450L360 600 540 600z'/%3E%3Cpath fill='%23999' d='M450 450L540 300 360 300z'/%3E%3Cpath fill='%23999' d='M630 450L540 600 720 600z'/%3E%3Cpath fill='%23FFF' d='M630 450L720 300 540 300z'/%3E%3Cpath d='M810 450L720 600 900 600z'/%3E%3Cpath fill='%23DDD' d='M810 450L900 300 720 300z'/%3E%3Cpath fill='%23AAA' d='M990 450L900 600 1080 600z'/%3E%3Cpath fill='%23444' d='M990 450L1080 300 900 300z'/%3E%3Cpath fill='%23222' d='M90 750L0 900 180 900z'/%3E%3Cpath d='M270 750L180 900 360 900z'/%3E%3Cpath fill='%23DDD' d='M270 750L360 600 180 600z'/%3E%3Cpath d='M450 750L540 600 360 600z'/%3E%3Cpath d='M630 750L540 900 720 900z'/%3E%3Cpath fill='%23444' d='M630 750L720 600 540 600z'/%3E%3Cpath fill='%23AAA' d='M810 750L720 900 900 900z'/%3E%3Cpath fill='%23666' d='M810 750L900 600 720 600z'/%3E%3Cpath fill='%23999' d='M990 750L900 900 1080 900z'/%3E%3Cpath fill='%23999' d='M990 750L1080 600 900 600z'/%3E%3Cpath d='M0 300L-90 450 90 450z'/%3E%3Cpath fill='%23666' d='M0 300L90 150 -90 150z'/%3E%3Cpath fill='%23AAA' d='M180 300L90 450 270 450z'/%3E%3Cpath fill='%23444' d='M180 300L270 150 90 150z'/%3E%3Cpath fill='%23444' d='M360 300L270 450 450 450z'/%3E%3Cpath fill='%23999' d='M360 300L450 150 270 150z'/%3E%3Cpath fill='%23666' d='M540 300L450 450 630 450z'/%3E%3Cpath fill='%23222' d='M540 300L630 150 450 150z'/%3E%3Cpath fill='%23FFF' d='M720 300L630 450 810 450z'/%3E%3Cpath fill='%23222' d='M720 300L810 150 630 150z'/%3E%3Cpath fill='%23DDD' d='M900 300L810 450 990 450z'/%3E%3Cpath fill='%23444' d='M900 300L990 150 810 150z'/%3E%3Cpath fill='%23DDD' d='M0 600L-90 750 90 750z'/%3E%3Cpath fill='%23666' d='M0 600L90 450 -90 450z'/%3E%3Cpath fill='%23AAA' d='M180 600L90 750 270 750z'/%3E%3Cpath fill='%23444' d='M180 600L270 450 90 450z'/%3E%3Cpath fill='%23444' d='M360 600L270 750 450 750z'/%3E%3Cpath fill='%23999' d='M360 600L450 450 270 450z'/%3E%3Cpath fill='%23666' d='M540 600L450 750 630 750z'/%3E%3Cpath fill='%23222' d='M540 600L630 450 450 450z'/%3E%3Cpath fill='%23FFF' d='M720 600L630 750 810 750z'/%3E%3Cpath fill='%23222' d='M720 600L810 450 630 450z'/%3E%3Cpath fill='%23DDD' d='M900 600L810 750 990 750z'/%3E%3Cpath fill='%23444' d='M900 600L990 450 810 450z'/%3E%3Cpath fill='%23FFF' d='M0 900L-90 1050 90 1050z'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}
        />
      </div> */}

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
            style={{ originX: 0 }}
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
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to StudyAid</h1>
        <p className="text-xl text-gray-600">Demistifying The Chaos of Learning</p>
      </motion.div>
    </div>
  );
};

export default StudyPulseLoader;

