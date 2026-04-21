import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calculator } from "lucide-react";

import { ProjectQuote, Employee } from "./types";
import { generateQuote } from "./lib/gemini";

// Components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { InputSystem } from "./components/InputSystem";
import { TeamSelection } from "./components/TeamSelection";
import { QuoteResult } from "./components/QuoteResult";
import { GeneratingQuote } from "./components/Generating";
import { HowItWorks } from "./components/HowItWorks";

export default function App() {
  const [step, setStep] = useState<"landing" | "how-it-works" | "input" | "team" | "result">("landing");
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState<ProjectQuote | null>(null);
  const [projectDescription, setProjectDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleInputNext = (text: string, file?: File) => {
    setProjectDescription(text);
    if (file) setUploadedFile(file);
    setStep("team");
  };

  const handleGenerate = async (selectedEmployees: Employee[]) => {
    setIsLoading(true);
    try {
      // In a real app, we'd extract text from the file if uploaded
      const description = uploadedFile
        ? `[Analyzed Document: ${uploadedFile.name}] ${projectDescription}`
        : projectDescription;

      const result = await generateQuote(description, selectedEmployees);
      setQuote(result);
      setStep("result");
    } catch (error) {
      console.error("Failed to generate quote:", error);
      alert("Something went wrong while generating your quote. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-brand-canvas font-sans text-brand-primary selection:bg-brand-badge selection:text-brand-primary flex flex-col'>
      <Navbar onHowItWorks={() => setStep("how-it-works")} />

      <main className='flex-1 flex justify-center items-center'>
        <AnimatePresence mode='wait'>
          {step === "landing" && (
            <motion.div
              key='landing'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Hero onStart={() => setStep("input")} onHowItWorks={() => setStep("how-it-works")} />
            </motion.div>
          )}

          {step === "how-it-works" && (
            <motion.div
              key='how-it-works'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='w-full max-w-7xl mx-auto px-4'
            >
              <HowItWorks onBack={() => setStep("landing")} onStart={() => setStep("input")} />
            </motion.div>
          )}

          {step === "input" && (
            <motion.div
              key='input'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <InputSystem
                onNext={handleInputNext}
                onBack={() => setStep("landing")}
                isLoading={isLoading}
              />
            </motion.div>
          )}

          {step === "team" && !isLoading && (
            <motion.div
              key='team'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <TeamSelection
                onGenerate={handleGenerate}
                onBack={() => setStep("input")}
                isLoading={isLoading}
              />
            </motion.div>
          )}

          {step === "team" && isLoading && (
            <motion.div
              key='generating'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='w-full'
            >
              <GeneratingQuote />
            </motion.div>
          )}

          {step === "result" && quote && (
            <motion.div key='result' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <QuoteResult quote={quote} onBack={() => setStep("team")} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className='bottom-0 left-0 right-0 z-50 bg-brand-surface border-t border-brand-border py-4'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <Calculator className='w-5 h-5 text-brand-accent' />
            <span className='text-lg font-bold tracking-tight text-brand-primary'>
              QuoteCraft AI
            </span>
          </div>
          <p className='text-muted text-xs'>
            © 2026 QuoteCraft AI. All rights reserved. Built for professional agencies.
          </p>
        </div>
      </footer>
    </div>
  );
}
