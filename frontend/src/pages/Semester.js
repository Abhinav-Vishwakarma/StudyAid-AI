import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import  StudyPulseLoader from "../components/SudyPulseLoader"
import { motion } from 'framer-motion'

export default function Semester() {
  const [sem, setSem] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <StudyPulseLoader onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen relative bg-[#1a1a2e] overflow-hidden">
      {/* Animated wave background */}
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
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="space-y-8 px-24 py-20 bg-white/10 backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-2xl border border-white/20 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            WHAT&apos;S YOUR SEMESTER?
          </h1>
          <div className="w-full border-none flex flex-col gap-9">
            <select 
              value={sem} 
              onChange={(e) => setSem(e.target.value)} 
              className="bg-white/20 text-white placeholder:text-white/50 w-full rounded-3xl outline-none p-4 backdrop-blur-sm"
            >
              <option value="" disabled>Select your semester....</option>
              <option value="1st semester" className="text-black">1st semester</option>
              <option value="2nd semester" className="text-black">2nd semester</option>
              <option value="3rd semester" className="text-black">3rd semester</option>
              <option value="4th semester" className="text-black">4th semester</option>
            </select>
            <NavLink to="/sub">
              <Button
                variant="contained"
                className="w-full bg-white/30 hover:bg-white/40 text-white backdrop-blur-sm"
              >
                LET&apos;S GO →
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}