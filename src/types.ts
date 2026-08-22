export type PageRoute = 'home' | 'services' | 'projects' | 'ai-demos' | 'team' | 'roi-calculator' | 'about' | 'contact';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  specialties: string[];
  technologies: string[];
  experienceYears: number;
  featuredQuote?: string;
  image: string;
  socials?: { linkedin?: string; github?: string; email?: string };
}

export interface AgencyValue { id: string; title: string; tagline: string; description: string; iconName: string; }
export interface AgencyStat { label: string; value: string; detail: string; }
export interface ServiceItem {
  id: string; title: string; category: 'development' | 'design' | 'ai-automation' | 'infrastructure'; shortDesc: string; fullDesc: string; iconName: string; deliverables: string[]; techStack: string[]; businessImpact: string; avgTimeline: string; featured?: boolean;
}
export interface ProjectCapabilitySection { title: string; items: string[]; }
export interface CategorizedTech { name: string; category: 'CRM' | 'AI / LLM' | 'Integration' | 'Messaging' | 'Storage & Docs' | 'Media & APIs' | 'E-commerce'; }
export interface WorkflowDiagramNode { id: string; stepNumber: number; title: string; tool: string; category: 'trigger' | 'ai' | 'engine' | 'storage' | 'crm' | 'dispatch'; description: string; dataPayload: string; protocol?: string; latency?: string; inputData?: string; outputData?: string; targetTool?: string; errorPolicy?: string; }
export interface ProjectItem {
  id: string; projectNumber: string; title: string; client?: string; industry?: string; category: string; categoryTags: string[]; shortDesc: string; fullDesc: string; businessProblem: string; solutionArchitecture: string; keyCapabilities: string[]; capabilitySections?: ProjectCapabilitySection[]; businessImpact: string; technologyStack: string[]; categorizedTechStack?: CategorizedTech[]; workflowSteps?: string[]; diagramNodes?: WorkflowDiagramNode[]; aiComponents?: string[]; integrations?: string[]; image?: string; gallery?: string[]; metrics?: { label: string; value: string }[]; challenge?: string; solution?: string; result?: string; testimonial?: { quote: string; author: string; role: string };
}
export interface TestimonialItem { id: string; name: string; role: string; company: string; avatar: string; industry: string; rating: number; content: string; impactMetric: string; serviceProvided: string; }
export interface TechStackItem { name: string; category: 'frontend' | 'backend' | 'mobile' | 'cloud' | 'ai' | 'database'; icon: string; description: string; proficiencyLevel: string; }
export interface ContactFormData { name: string; email: string; phone: string; company: string; selectedServices: string[]; budgetRange: string; timeline: string; message: string; }
