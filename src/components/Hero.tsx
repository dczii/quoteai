import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, FileText, Calculator } from "lucide-react";

export const Hero = ({ onStart }: { onStart: () => void }) => (
  <div className='relative pb-20 lg:pb-32 overflow-hidden'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center max-w-3xl mx-auto'
      >
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-badge text-brand-primary text-sm font-medium mb-6'>
          <Sparkles className='w-4 h-4' />
          <span>Powered by Gemini AI</span>
        </div>
        <h1 className='text-5xl lg:text-7xl font-bold text-brand-primary tracking-tight mb-6 leading-[1.1]'>
          Professional project quotes in <span className='text-brand-accent'>minutes</span>, not
          days.
        </h1>
        <p className='text-xl text-muted mb-10 leading-relaxed'>
          Describe your software project in plain language. Get a complete, professional quotation
          with team structures, costs, and timelines instantly.
        </p>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <button
            onClick={onStart}
            className='w-full sm:w-auto bg-brand-accent text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-brand-accent-dark transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20 cursor-pointer'
          >
            Start New Quote
            <ArrowRight className='w-5 h-5' />
          </button>
          <button className='w-full sm:w-auto bg-brand-surface text-brand-primary border border-brand-border px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-brand-badge transition-all flex items-center justify-center gap-2 cursor-pointer'>
            View Sample Quote
          </button>
        </div>

        <div className='mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
          {[
            {
              icon: FileText,
              title: "Describe",
              desc: "Tell us about your project in plain English. No technical jargon required.",
            },
            {
              icon: Sparkles,
              title: "Analyze",
              desc: "Our AI analyzes your requirements, mapping them to real-world team structures.",
            },
            {
              icon: Calculator,
              title: "Estimate",
              desc: "Get a detailed breakdown of costs, timelines, and deliverables instantly.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className='p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-sm'
            >
              <div className='w-12 h-12 bg-brand-badge rounded-xl flex items-center justify-center mb-4'>
                <item.icon className='w-6 h-6 text-brand-accent' />
              </div>
              <h3 className='text-xl font-bold text-brand-primary mb-2'>{item.title}</h3>
              <p className='text-muted leading-relaxed'>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Background Decorations */}
    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none'>
      <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50' />
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50' />
    </div>
  </div>
);
