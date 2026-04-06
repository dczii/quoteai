import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Users, Clock, CheckCircle2, Code2, ShieldAlert, ArrowLeft, Download, Share2, Layers } from 'lucide-react';
import { cn } from '../lib/utils';
import { ProjectQuote } from '../types';

export const QuoteResult = ({ quote, onBack }: { quote: ProjectQuote, onBack: () => void }) => {
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
