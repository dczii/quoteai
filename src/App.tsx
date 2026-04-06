import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Clock, 
  Users, 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  FileText, 
  CheckCircle2,
  Download,
  Share2,
  ShieldAlert,
  Layers,
  Code2,
  Loader2,
  Upload,
  UserPlus,
  X,
  FileUp
} from 'lucide-react';
import { generateQuote } from './lib/gemini';
import { ProjectQuote, Employee, MOCK_EMPLOYEES } from './types';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center gap-2">
          <div className="bg-brand-primary p-1.5 rounded-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-primary">QuoteCraft <span className="text-brand-accent">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          <a href="#" className="hover:text-brand-accent transition-colors">How it works</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Pricing</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Templates</a>
          <button className="bg-brand-primary text-white px-4 py-2 rounded-full hover:bg-brand-accent transition-colors cursor-pointer">
            Agency Login
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ onStart }: { onStart: () => void }) => (
  <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-badge text-brand-primary text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Powered by Gemini AI</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold text-brand-primary tracking-tight mb-6 leading-[1.1]">
          Professional project quotes in <span className="text-brand-accent">minutes</span>, not days.
        </h1>
        <p className="text-xl text-muted mb-10 leading-relaxed">
          Describe your software project in plain language. Get a complete, professional quotation with team structures, costs, and timelines instantly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto bg-brand-accent text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-brand-accent-dark transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20 cursor-pointer"
          >
            Start New Quote
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto bg-brand-surface text-brand-primary border border-brand-border px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-brand-badge transition-all flex items-center justify-center gap-2 cursor-pointer">
            View Sample Quote
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { icon: FileText, title: "Describe", desc: "Tell us about your project in plain English. No technical jargon required." },
            { icon: Sparkles, title: "Analyze", desc: "Our AI analyzes your requirements, mapping them to real-world team structures." },
            { icon: Calculator, title: "Estimate", desc: "Get a detailed breakdown of costs, timelines, and deliverables instantly." }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-sm">
              <div className="w-12 h-12 bg-brand-badge rounded-xl flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">{item.title}</h3>
              <p className="text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
    
    {/* Background Decorations */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />
    </div>
  </div>
);

const InputSystem = ({ onNext, onBack, isLoading }: { onNext: (text: string, file?: File) => void, onBack: () => void, isLoading: boolean }) => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'text' | 'document'>('text');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-surface rounded-3xl shadow-xl border border-brand-border p-8 md:p-12"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-brand-primary mb-4">Project Requirements</h2>
          <p className="text-muted mb-6">
            How would you like to provide your project details?
          </p>
          
          <div className="flex p-1 bg-brand-badge rounded-xl w-fit mb-8">
            <button 
              onClick={() => setMode('text')}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer",
                mode === 'text' ? "bg-white text-brand-accent shadow-sm" : "text-muted hover:text-brand-primary"
              )}
            >
              <FileText className="w-4 h-4" />
              Describe Project
            </button>
            <button 
              onClick={() => setMode('document')}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer",
                mode === 'document' ? "bg-white text-brand-accent shadow-sm" : "text-muted hover:text-brand-primary"
              )}
            >
              <FileUp className="w-4 h-4" />
              Attach Document
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'text' ? (
            <motion.div
              key="text-input"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="relative"
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g., I want to build a multi-vendor e-commerce platform for sustainable fashion..."
                className="w-full h-64 p-6 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none text-lg text-gray-800 placeholder:text-gray-400"
                disabled={isLoading}
              />
              <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                {text.length} characters
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="doc-input"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,.doc,.docx,.txt"
              />
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              {file ? (
                <div>
                  <p className="text-lg font-bold text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="mt-4 text-red-500 text-sm font-bold hover:underline"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-lg font-bold text-gray-900 mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, DOCX, or TXT (max. 10MB)</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-muted font-bold hover:text-brand-primary transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={() => onNext(text, file || undefined)}
            disabled={isLoading || (mode === 'text' && !text.trim()) || (mode === 'document' && !file)}
            className={cn(
              "px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 cursor-pointer",
              (mode === 'text' && !text.trim()) || (mode === 'document' && !file)
                ? "bg-brand-badge text-muted cursor-not-allowed" 
                : "bg-brand-accent text-white hover:bg-brand-accent-dark shadow-lg shadow-brand-accent/20"
            )}
          >
            Next: Select Team
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const TeamSelection = ({ onGenerate, onBack, isLoading }: { onGenerate: (employees: Employee[]) => void, onBack: () => void, isLoading: boolean }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleEmployee = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedEmployees = MOCK_EMPLOYEES.filter(e => selectedIds.includes(e.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-surface rounded-3xl shadow-xl border border-brand-border p-8 md:p-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-brand-primary mb-2">Select Your Team</h2>
            <p className="text-muted">Choose experts from your pool or let AI recommend the best fit later.</p>
          </div>
          <div className="bg-brand-badge px-4 py-2 rounded-xl border border-brand-border">
            <span className="text-brand-primary font-bold">{selectedIds.length}</span>
            <span className="text-muted ml-1">selected</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {MOCK_EMPLOYEES.map((employee) => (
            <div 
              key={employee.id}
              onClick={() => toggleEmployee(employee.id)}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all cursor-pointer relative group",
                selectedIds.includes(employee.id) 
                  ? "border-brand-accent bg-brand-badge/50" 
                  : "border-brand-border hover:border-brand-accent bg-brand-surface"
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={employee.avatar} alt={employee.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <div>
                  <div className="font-bold text-brand-primary text-sm">{employee.name}</div>
                  <div className="text-xs text-muted">{employee.role}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {employee.skills.slice(0, 2).map((skill, i) => (
                  <span key={i} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-brand-border text-muted">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-brand-primary">${employee.hourlyRate}/hr</span>
                <span className="text-[10px] text-muted uppercase tracking-wider">{employee.seniority}</span>
              </div>
              
              {selectedIds.includes(employee.id) && (
                <div className="absolute top-2 right-2 bg-brand-accent text-white p-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-brand-border">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="text-muted font-bold hover:text-brand-primary transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button 
              onClick={() => onGenerate([])}
              className="text-muted font-bold hover:text-brand-accent transition-colors cursor-pointer"
            >
              Skip and let AI suggest team
            </button>
          </div>
          
          <button
            onClick={() => onGenerate(selectedEmployees)}
            disabled={isLoading}
            className={cn(
              "w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 cursor-pointer",
              isLoading ? "bg-brand-badge text-muted cursor-not-allowed" : "bg-brand-accent text-white hover:bg-brand-accent-dark shadow-lg shadow-brand-accent/20"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Generating Quote...
              </>
            ) : (
              <>
                Generate Quote
                <Sparkles className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const QuoteResult = ({ quote, onBack }: { quote: ProjectQuote, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'deliverables', label: 'Deliverables', icon: CheckCircle2 },
    { id: 'tech', label: 'Tech Stack', icon: Code2 },
    { id: 'risks', label: 'Risks', icon: ShieldAlert },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-muted hover:text-brand-primary transition-colors mb-6 font-bold cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Edit
      </button>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer",
                  activeTab === tab.id 
                    ? "bg-brand-accent text-white shadow-md" 
                    : "text-muted hover:bg-brand-badge"
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
            
            <div className="pt-8 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-primary text-white text-sm font-bold hover:bg-brand-primary/90 transition-all cursor-pointer">
                <Download className="w-4 h-4" />
                Export Excel
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-brand-border text-brand-primary text-sm font-bold hover:bg-brand-surface transition-all cursor-pointer">
                <Share2 className="w-4 h-4" />
                Share Link
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-surface rounded-3xl border border-brand-border shadow-sm p-8 min-h-[600px]"
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-brand-primary mb-2">{quote.projectName}</h2>
                  <p className="text-xl text-muted leading-relaxed">{quote.summary}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-brand-badge border border-brand-border">
                    <div className="text-brand-accent font-bold text-sm uppercase tracking-wider mb-1">Total Estimate</div>
                    <div className="text-3xl font-bold text-brand-primary">${quote.totalEstimatedCost.toLocaleString()}</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border">
                    <div className="text-brand-primary font-bold text-sm uppercase tracking-wider mb-1 opacity-60">Team Size</div>
                    <div className="text-3xl font-bold text-brand-primary">{quote.team.reduce((acc, curr) => acc + curr.count, 0)} Experts</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border">
                    <div className="text-brand-primary font-bold text-sm uppercase tracking-wider mb-1 opacity-60">Duration</div>
                    <div className="text-3xl font-bold text-brand-primary">{quote.timeline.length} Phases</div>
                  </div>
                </div>

                <div className="pt-8">
                  <h3 className="text-xl font-bold text-brand-primary mb-4">Project Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quote.deliverables.slice(0, 4).map((d, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-brand-border">
                        <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                        <div>
                          <div className="font-bold text-brand-primary">{d.phase}</div>
                          <div className="text-sm text-muted">{d.items[0]} & more</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-brand-primary">Recommended Team Composition</h2>
                <div className="overflow-hidden rounded-2xl border border-brand-border">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-badge">
                      <tr>
                        <th className="px-6 py-4 text-sm font-bold text-brand-primary">Role</th>
                        <th className="px-6 py-4 text-sm font-bold text-brand-primary">Seniority</th>
                        <th className="px-6 py-4 text-sm font-bold text-brand-primary">Count</th>
                        <th className="px-6 py-4 text-sm font-bold text-brand-primary text-right">Hourly Rate</th>
                        <th className="px-6 py-4 text-sm font-bold text-brand-primary text-right">Monthly</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border">
                      {quote.team.map((member, i) => (
                        <tr key={i} className="hover:bg-brand-badge/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-brand-primary">{member.role}</div>
                            <div className="text-xs text-muted">{member.description}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 rounded-md bg-brand-badge text-brand-primary text-xs font-bold">
                              {member.seniority}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted">{member.count}</td>
                          <td className="px-6 py-4 text-right text-muted">${member.hourlyRate}</td>
                          <td className="px-6 py-4 text-right font-bold text-brand-primary">${member.monthlyCost.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-brand-primary">Project Timeline & Phases</h2>
                <div className="space-y-6">
                  {quote.timeline.map((phase, i) => (
                    <div key={i} className="relative pl-8 border-l-2 border-brand-border pb-8 last:pb-0">
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-brand-accent border-4 border-brand-canvas shadow-sm" />
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                        <h3 className="text-xl font-bold text-brand-primary">{phase.phase}</h3>
                        <span className="px-3 py-1 rounded-full bg-brand-badge text-brand-primary text-sm font-bold">
                          {phase.duration}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {phase.milestones.map((m, j) => (
                          <div key={j} className="flex items-center gap-2 text-muted text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-border" />
                            {m}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'deliverables' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-brand-primary">Key Deliverables</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quote.deliverables.map((group, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-brand-border bg-brand-badge/20">
                      <h3 className="font-bold text-brand-primary mb-4 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-brand-accent" />
                        {group.phase}
                      </h3>
                      <ul className="space-y-3">
                        {group.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted">
                            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-brand-primary">Recommended Tech Stack</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quote.techStack.map((stack, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-brand-border bg-brand-surface">
                      <div className="text-sm font-bold text-brand-accent uppercase tracking-wider mb-4">{stack.category}</div>
                      <div className="flex flex-wrap gap-2">
                        {stack.technologies.map((tech, j) => (
                          <span key={j} className="px-3 py-1.5 rounded-lg bg-brand-badge text-brand-primary text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'risks' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-brand-primary">Risk Assessment & Mitigation</h2>
                <div className="space-y-4">
                  {quote.riskAssessment.map((risk, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-brand-border bg-brand-surface flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-2",
                          risk.impact === 'High' ? "bg-error/10 text-error" :
                          risk.impact === 'Medium' ? "bg-warning/10 text-warning" :
                          "bg-info/10 text-info"
                        )}>
                          <ShieldAlert className="w-3.5 h-3.5" />
                          {risk.impact} Impact
                        </div>
                        <h3 className="font-bold text-brand-primary">{risk.risk}</h3>
                      </div>
                      <div className="md:w-2/3">
                        <div className="text-sm font-bold text-muted uppercase tracking-wider mb-1">Mitigation Strategy</div>
                        <p className="text-muted">{risk.mitigation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [step, setStep] = useState<'landing' | 'input' | 'team' | 'result'>('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState<ProjectQuote | null>(null);
  const [projectDescription, setProjectDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleInputNext = (text: string, file?: File) => {
    setProjectDescription(text);
    if (file) setUploadedFile(file);
    setStep('team');
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
      setStep('result');
    } catch (error) {
      console.error("Failed to generate quote:", error);
      alert("Something went wrong while generating your quote. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-canvas font-sans text-brand-primary selection:bg-brand-badge selection:text-brand-primary">
      <Navbar />
      
      <main>
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Hero onStart={() => setStep('input')} />
            </motion.div>
          )}

          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="pt-24">
                <InputSystem onNext={handleInputNext} onBack={() => setStep('landing')} isLoading={isLoading} />
              </div>
            </motion.div>
          )}

          {step === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="pt-24">
                <TeamSelection onGenerate={handleGenerate} onBack={() => setStep('input')} isLoading={isLoading} />
              </div>
            </motion.div>
          )}

          {step === 'result' && quote && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="pt-24">
                <QuoteResult quote={quote} onBack={() => setStep('team')} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-brand-surface border-t border-brand-border py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="w-6 h-6 text-brand-accent" />
            <span className="text-xl font-bold tracking-tight text-brand-primary">QuoteCraft AI</span>
          </div>
          <p className="text-muted text-sm">
            © 2026 QuoteCraft AI. All rights reserved. Built for professional agencies.
          </p>
        </div>
      </footer>
    </div>
  );
}
