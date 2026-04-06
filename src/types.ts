export interface Employee {
  id: string;
  name: string;
  role: string;
  seniority: 'Junior' | 'Mid' | 'Senior' | 'Lead';
  hourlyRate: number;
  skills: string[];
  avatar?: string;
}

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Alex Rivera', role: 'Project Manager', seniority: 'Senior', hourlyRate: 95, skills: ['Agile', 'Scrum', 'Jira'], avatar: 'https://i.pravatar.cc/150?u=alex' },
  { id: '2', name: 'Sarah Chen', role: 'Frontend Developer', seniority: 'Senior', hourlyRate: 85, skills: ['React', 'TypeScript', 'Tailwind'], avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: '3', name: 'James Wilson', role: 'Backend Developer', seniority: 'Senior', hourlyRate: 90, skills: ['Node.js', 'PostgreSQL', 'AWS'], avatar: 'https://i.pravatar.cc/150?u=james' },
  { id: '4', name: 'Elena Rodriguez', role: 'UI/UX Designer', seniority: 'Mid', hourlyRate: 75, skills: ['Figma', 'Adobe XD', 'Prototyping'], avatar: 'https://i.pravatar.cc/150?u=elena' },
  { id: '5', name: 'David Kim', role: 'QA Engineer', seniority: 'Mid', hourlyRate: 65, skills: ['Cypress', 'Jest', 'Automation'], avatar: 'https://i.pravatar.cc/150?u=david' },
  { id: '6', name: 'Maya Patel', role: 'Fullstack Developer', seniority: 'Lead', hourlyRate: 110, skills: ['Next.js', 'GraphQL', 'Docker'], avatar: 'https://i.pravatar.cc/150?u=maya' },
  { id: '7', name: 'Tom Baker', role: 'DevOps Engineer', seniority: 'Senior', hourlyRate: 100, skills: ['Kubernetes', 'Terraform', 'CI/CD'], avatar: 'https://i.pravatar.cc/150?u=tom' },
  { id: '8', name: 'Lisa Wong', role: 'Frontend Developer', seniority: 'Junior', hourlyRate: 50, skills: ['HTML', 'CSS', 'JavaScript'], avatar: 'https://i.pravatar.cc/150?u=lisa' },
];

export interface TeamMember {
  role: string;
  seniority: 'Junior' | 'Mid' | 'Senior' | 'Lead';
  count: number;
  hourlyRate: number;
  monthlyCost: number;
  description?: string;
}

export interface TimelinePhase {
  phase: string;
  duration: string;
  milestones: string[];
}

export interface DeliverableGroup {
  phase: string;
  items: string[];
}

export interface TechStackItem {
  category: string;
  technologies: string[];
}

export interface RiskItem {
  risk: string;
  impact: 'Low' | 'Medium' | 'High';
  mitigation: string;
}

export interface ProjectQuote {
  projectName: string;
  summary: string;
  team: TeamMember[];
  timeline: TimelinePhase[];
  deliverables: DeliverableGroup[];
  techStack: TechStackItem[];
  riskAssessment: RiskItem[];
  totalEstimatedCost: number;
}
