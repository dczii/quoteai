import React from 'react';
import { motion } from 'motion/react';
import { UploadCloud, Users, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onBack: () => void;
  onStart: () => void;
}

export function HowItWorks({ onBack, onStart }: HowItWorksProps) {
  const steps = [
    {
      id: "context",
      title: "Upload Context",
      description: "Provide the project details through a description or upload a requirements document.",
      icon: <UploadCloud className="w-8 h-8 text-brand-accent" />
    },
    {
      id: "team",
      title: "Choose Experts",
      description: "Select the AI employee roles needed for your project (e.g., Designer, Developer).",
      icon: <Users className="w-8 h-8 text-brand-accent" />
    },
    {
      id: "quote",
      title: "Generate Quote",
      description: "Our AI generates a comprehensive project quote including estimates, timeline, and strategy.",
      icon: <Sparkles className="w-8 h-8 text-brand-accent" />
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4 tracking-tight">
          How It Works
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Get a professional project estimation powered by specialized AI agents in 3 simple steps.
        </p>
      </motion.div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="flex flex-col items-center text-center p-8 rounded-3xl bg-brand-surface border border-brand-border shadow-xl relative z-10"
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-badge flex items-center justify-center mb-6 shadow-sm border border-brand-border">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-brand-primary mb-3">{step.title}</h3>
            <p className="text-muted leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
        {/* Subtle connecting line for desktop */}
        <div className="hidden md:block absolute top-[5rem] left-[15%] right-[15%] h-px bg-brand-border -z-0 border-dashed border-b-2" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-6"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-brand-border text-brand-primary hover:bg-brand-badge transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onStart}
          className="flex items-center gap-2 px-8 py-3 rounded-full bg-brand-accent text-white hover:bg-brand-accent-dark transition-colors font-bold shadow-lg"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
