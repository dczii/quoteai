import React, { useState } from "react";
import { CheckCircle2, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import { Employee, MOCK_EMPLOYEES } from "../types";
import { motion } from "motion/react";
import { Panel } from "./Panel";

export const TeamSelection = ({
  onGenerate,
  onBack,
  isLoading,
}: {
  onGenerate: (employees: Employee[]) => void;
  onBack: () => void;
  isLoading: boolean;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleEmployee = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const selectedEmployees = MOCK_EMPLOYEES.filter((e) => selectedIds.includes(e.id));

  return (
    <div className='max-w-6xl mx-auto px-4'>
      <Panel initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12'>
          <div>
            <h2 className='text-3xl font-bold text-brand-primary mb-2'>Select Your Team</h2>
            <p className='text-muted'>
              Choose experts from your pool or let AI recommend the best fit later.
            </p>
          </div>
          <div className='bg-brand-badge px-4 py-2 rounded-xl border border-brand-border'>
            <span className='text-brand-primary font-bold'>{selectedIds.length}</span>
            <span className='text-muted ml-1'>selected</span>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12'>
          {MOCK_EMPLOYEES.map((employee) => (
            <div
              key={employee.id}
              onClick={() => toggleEmployee(employee.id)}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all cursor-pointer relative group",
                selectedIds.includes(employee.id)
                  ? "border-brand-accent bg-brand-badge/50"
                  : "border-brand-border hover:border-brand-accent bg-brand-surface",
              )}
            >
              <div className='flex items-center gap-3 mb-3'>
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className='w-12 h-12 rounded-full border-2 border-white shadow-sm'
                />
                <div>
                  <div className='font-bold text-brand-primary text-sm'>{employee.name}</div>
                  <div className='text-xs text-muted'>{employee.role}</div>
                </div>
              </div>
              <div className='flex flex-wrap gap-1 mb-3'>
                {employee.skills.slice(0, 2).map((skill, i) => (
                  <span
                    key={i}
                    className='text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-brand-border text-muted'
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-xs font-bold text-brand-primary'>
                  ${employee.hourlyRate}/hr
                </span>
                <span className='text-[10px] text-muted uppercase tracking-wider'>
                  {employee.seniority}
                </span>
              </div>

              {selectedIds.includes(employee.id) && (
                <div className='absolute top-2 right-2 bg-brand-accent text-white p-1 rounded-full'>
                  <CheckCircle2 className='w-3 h-3' />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-brand-border'>
          <div className='flex items-center gap-6'>
            <button
              onClick={onBack}
              className='text-muted font-bold hover:text-brand-primary transition-colors flex items-center gap-2 cursor-pointer'
            >
              <ArrowLeft className='w-4 h-4' />
              Back
            </button>
            <button
              onClick={() => onGenerate([])}
              className='text-muted font-bold hover:text-brand-accent transition-colors cursor-pointer'
            >
              Skip and let AI suggest team
            </button>
          </div>

          <button
            onClick={() => onGenerate(selectedEmployees)}
            disabled={isLoading}
            className={cn(
              "w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 cursor-pointer",
              isLoading
                ? "bg-brand-badge text-muted cursor-not-allowed"
                : "bg-brand-accent text-white hover:bg-brand-accent-dark shadow-lg shadow-brand-accent/20",
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className='w-6 h-6 animate-spin' />
                Generating Quote...
              </>
            ) : (
              <>
                Generate Quote
                <Sparkles className='w-5 h-5' />
              </>
            )}
          </button>
        </div>
      </Panel>
    </div>
  );
};
