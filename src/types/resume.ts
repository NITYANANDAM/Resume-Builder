export interface PersonalInfo {
  fullName: string;
  targetRole: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  bioSummary: string;
  avatarUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Remote' | 'Part-time';
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  achievements: string[];
  techStack: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  gradYear: string;
  gpa?: string;
  honors?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  description: string;
  impactMetric: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native / Bilingual' | 'Full Professional' | 'Professional Working' | 'Working Knowledge';
}

export type ResumeTemplate = 
  | 'modern-executive' 
  | 'harvard-classic' 
  | 'minimal-nordic' 
  | 'creative-lead' 
  | 'compact-ats';

export interface ResumeConfig {
  template: ResumeTemplate;
  accentColor: string;
  fontFamily: 'sans' | 'serif' | 'modern';
  spacing: 'compact' | 'comfortable' | 'spacious';
  paperSize: 'a4' | 'letter';
  showPhoto: boolean;
  twoColumnLayout: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  languages: LanguageItem[];
}
