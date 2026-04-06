import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, FileUp, Upload, ArrowLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { Panel } from "./Panel";

export const InputSystem = ({
  onNext,
  onBack,
  isLoading,
}: {
  onNext: (text: string, file?: File) => void;
  onBack: () => void;
  isLoading: boolean;
}) => {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"text" | "document">("text");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className='max-w-4xl mx-auto px-4'>
      <Panel initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-brand-primary mb-4'>Project Requirements</h2>
          <p className='text-muted mb-6'>How would you like to provide your project details?</p>

          <div className='flex p-1 bg-brand-badge rounded-xl w-fit mb-8'>
            <button
              onClick={() => setMode("text")}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer",
                mode === "text"
                  ? "bg-white text-brand-accent shadow-sm"
                  : "text-muted hover:text-brand-primary",
              )}
            >
              <FileText className='w-4 h-4' />
              Describe Project
            </button>
            <button
              onClick={() => setMode("document")}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer",
                mode === "document"
                  ? "bg-white text-brand-accent shadow-sm"
                  : "text-muted hover:text-brand-primary",
              )}
            >
              <FileUp className='w-4 h-4' />
              Attach Document
            </button>
          </div>
        </div>

        <AnimatePresence mode='wait'>
          {mode === "text" ? (
            <motion.div
              key='text-input'
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className='relative'
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='e.g., I want to build a multi-vendor e-commerce platform for sustainable fashion...'
                className='w-full h-64 p-6 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-100 transition-all resize-none text-lg text-gray-800 placeholder:text-gray-400 bg-white'
                disabled={isLoading}
              />
              <div className='absolute bottom-4 right-4 text-sm text-gray-400'>
                {text.length} characters
              </div>
            </motion.div>
          ) : (
            <motion.div
              key='doc-input'
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className='border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer group'
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
                accept='.pdf,.doc,.docx,.txt'
              />
              <div className='bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform'>
                <Upload className='w-8 h-8 text-blue-600' />
              </div>
              {file ? (
                <div>
                  <p className='text-lg font-bold text-gray-900'>{file.name}</p>
                  <p className='text-sm text-gray-500'>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className='mt-4 text-red-500 text-sm font-bold hover:underline'
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <>
                  <p className='text-lg font-bold text-gray-900 mb-1'>
                    Click to upload or drag and drop
                  </p>
                  <p className='text-sm text-gray-500'>PDF, DOCX, or TXT (max. 10MB)</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className='mt-8 flex justify-between items-center'>
          <button
            onClick={onBack}
            className='text-muted font-bold hover:text-brand-primary transition-colors flex items-center gap-2 cursor-pointer'
          >
            <ArrowLeft className='w-4 h-4' />
            Back
          </button>
          <button
            onClick={() => onNext(text, file || undefined)}
            disabled={
              isLoading || (mode === "text" && !text.trim()) || (mode === "document" && !file)
            }
            className={cn(
              "px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 cursor-pointer",
              (mode === "text" && !text.trim()) || (mode === "document" && !file)
                ? "bg-brand-badge text-muted cursor-not-allowed"
                : "bg-brand-accent text-white hover:bg-brand-accent-dark shadow-lg shadow-brand-accent/20",
            )}
          >
            Next: Select Team
            <ChevronRight className='w-5 h-5' />
          </button>
        </div>
      </Panel>
    </div>
  );
};
