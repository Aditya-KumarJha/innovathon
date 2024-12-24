'use client'

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">
      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(88, 28, 135, 0.15), transparent 70%)",
            top: "20%",
            left: "15%",
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)",
            top: "30%",
            right: "15%",
            transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.05}px)`,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Code, Collaborate, and Create on a Single Platform
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Join the world's most powerful online coding environment with AI-powered features.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full backdrop-blur-sm bg-white/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            onClick={() => navigate('/home')} // Navigate to the /home route
          >
            Try Code Editor
          </Button>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button variant="outline" className="mt-4 backdrop-blur-sm bg-white/10">
            Explore AI Features
          </Button>
        </motion.div>
      </motion.div>

      {/* Code snippets floating effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/5 backdrop-blur-lg rounded-lg p-4 text-sm font-mono"
            initial={{
              x: i % 2 === 0 ? -100 : 100,
              y: 100 + i * 100,
              opacity: 0,
              rotate: i % 2 === 0 ? -5 : 5,
            }}
            animate={{
              x: i % 2 === 0 ? -50 : 50,
              y: 50 + i * 100,
              opacity: 0.7,
              rotate: i % 2 === 0 ? 5 : -5,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 25}%`,
            }}
          >
            <pre className="text-green-400">{`function code() {\n  return amazing;\n}`}</pre>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
