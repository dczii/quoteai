import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Code2, Users, Calculator, Sparkles } from "lucide-react";

const loadingSteps = [
  { icon: Search, text: "Analyzing project requirements..." },
  { icon: Code2, text: "Evaluating technical complexity..." },
  { icon: Users, text: "Assembling the optimal team..." },
  { icon: Calculator, text: "Calculating timelines and costs..." },
  { icon: Sparkles, text: "Finalizing your quotation..." },
];

export const GeneratingQuote = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => Math.min(prev + 1, loadingSteps.length - 1));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = loadingSteps[currentIndex].icon;

  return (
    <div className='flex flex-col items-center justify-center py-32 px-4 w-full'>
      <div className='relative w-32 h-32 mb-12'>
        {/* Outer spinning ring */}
        <motion.div
          className='absolute inset-0 rounded-full border-4 border-brand-badge border-t-brand-accent'
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner pulsing icon */}
        <div className='absolute inset-2 flex items-center justify-center bg-brand-surface rounded-full shadow-inner'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <CurrentIcon className='w-10 h-10 text-brand-accent' />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className='h-16 relative w-full max-w-md text-center'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className='absolute inset-0 flex items-center justify-center'
          >
            <h3 className='text-2xl font-bold text-brand-primary'>
              {loadingSteps[currentIndex].text}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className='w-full max-w-xs mt-8 bg-brand-badge rounded-full h-2 overflow-hidden'>
        <motion.div
          className='h-full bg-brand-accent rounded-full'
          initial={{ width: "0%" }}
          animate={{ width: `${((currentIndex + 1) / loadingSteps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};
