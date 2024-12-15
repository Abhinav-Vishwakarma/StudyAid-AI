import React, { useState } from "react";
import { NavLink } from "react-router";
import Button from "@mui/material/Button";
import {motion} from 'framer-motion';

export default function Subject() {
  const [sub, setSub] = useState("");
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
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 bg-opacity-25 backdrop-filter backdrop-blur-lg">
        <div className=" space-y-8 px-24 py-20 bg-white/10 backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-2xl border border-white/20 shadow-xl">
          <h1 className="text-2xl md:text-5xl font-bold text-white text-center mb-8">
            WHAT&apos;S THE SUBJECT?
          </h1>
          <div className="w-full border-none flex flex-col gap-9 ">
            <input
              value={sub}
              onChange={(e) => setSub(e.target.value)}
              type="text"
              placeholder="Enter your Subject...."
              className="bg-white/10  text-white placeholder:text-white/50 w-full rounded-3xl outline-none p-4"
            />
            <div className="flex justify-around w-full">
              <NavLink to={"/main"}>
                <Button
                  variant="contained"
                  className="bg-white/20 hover:bg-white/30 text-white w-full"
                >
                  LET'S GO →
                </Button>
              </NavLink>
              <NavLink to={"/"}>
                <Button
                  variant="contained"
                  className="bg-white/20 hover:bg-white/30 text-white w-full"
                >
                  GO BACK
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
