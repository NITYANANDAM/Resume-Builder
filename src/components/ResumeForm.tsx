import React, { useState } from 'react';
import { 
  ResumeData, 
  ExperienceItem, 
  EducationItem, 
  SkillCategory, 
  CertificationItem, 
  ProjectItem, 
  LanguageItem 
} from '../types/resume';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Award, 
  FolderGit2, 
  Languages, 
  Plus, 
  Trash2, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Upload,
  Check
} from 'lucide-react';
import { INITIAL_EXECUTIVE_DATA, BLANK_RESUME_DATA } from '../data/sampleProfiles';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onResetSample: () => void;
  onClear: () => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  data,
  onChange,
  onResetSample,
  onClear,
}) => {
  const [activeTab, setActiveTab] = useState<
    'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certs' | 'languages'
  >('personal');

  const { personalInfo, experiences, education, skills, certifications, projects, languages } = data;

  const updatePersonalInfo = (field: keyof typeof personalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...personalInfo,
        [field]: value,
      },
    });
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      location: '',
      employmentType: 'Full-time',
      startDate: '2023',
      endDate: 'Present',
      isCurrent: true,
      achievements: ['Spearheaded strategic initiative delivering measurable 25%+ business impact.'],
      techStack: [],
    };
    onChange({
      ...data,
      experiences: [newExp, ...experiences],
    });
  };

  const updateExperience = (id: string, updates: Partial<ExperienceItem>) => {
    onChange({
      ...data,
      experiences: experiences.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: experiences.filter((exp) => exp.id !== id),
    });
  };

  const addAchievementBullet = (expId: string) => {
    const exp = experiences.find((e) => e.id === expId);
    if (!exp) return;
    updateExperience(expId, {
      achievements: [...exp.achievements, ''],
    });
  };

  const updateAchievementBullet = (expId: string, index: number, val: string) => {
    const exp = experiences.find((e) => e.id === expId);
    if (!exp) return;
    const newAch = [...exp.achievements];
    newAch[index] = val;
    updateExperience(expId, { achievements: newAch });
  };

  const removeAchievementBullet = (expId: string, index: number) => {
    const exp = experiences.find((e) => e.id === expId);
    if (!exp) return;
    updateExperience(expId, {
      achievements: exp.achievements.filter((_, i) => i !== index),
    });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: 'B.S.',
      fieldOfStudy: '',
      gradYear: '2024',
    };
    onChange({
      ...data,
      education: [...education, newEdu],
    });
  };

  const updateEducation = (id: string, updates: Partial<EducationItem>) => {
    onChange({
      ...data,
      education: education.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: education.filter((edu) => edu.id !== id),
    });
  };

  // Skills handlers
  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      id: `skill-${Date.now()}`,
      name: 'Specialized Domain',
      skills: ['New Skill'],
    };
    onChange({
      ...data,
      skills: [...skills, newCat],
    });
  };

  const updateSkillCategory = (id: string, name: string, skillsStr: string) => {
    const skillList = skillsStr.split(',').map((s) => s.trim()).filter(Boolean);
    onChange({
      ...data,
      skills: skills.map((c) => (c.id === id ? { ...c, name, skills: skillList } : c)),
    });
  };

  const removeSkillCategory = (id: string) => {
    onChange({
      ...data,
      skills: skills.filter((c) => c.id !== id),
    });
  };

  // Projects handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Enterprise Initiative',
      role: 'Lead Architect',
      description: 'Engineered high-throughput platform reducing manual turnaround by 60%.',
      impactMetric: 'Scaled to 50k+ active daily users',
      technologies: ['TypeScript', 'Cloud', 'SQL'],
    };
    onChange({
      ...data,
      projects: [...projects, newProj],
    });
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    onChange({
      ...data,
      projects: projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: projects.filter((p) => p.id !== id),
    });
  };

  // Certifications handlers
  const addCert = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: 'Certified Cloud Practitioner / Professional',
      issuer: 'Official Credential Authority',
      issueDate: '2024',
    };
    onChange({
      ...data,
      certifications: [...certifications, newCert],
    });
  };

  const updateCert = (id: string, updates: Partial<CertificationItem>) => {
    onChange({
      ...data,
      certifications: certifications.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    });
  };

  const removeCert = (id: string) => {
    onChange({
      ...data,
      certifications: certifications.filter((c) => c.id !== id),
    });
  };

  // AI-Style Executive Bio Templates
  const applySummaryTemplate = (type: 'growth' | 'architect' | 'product' | 'quant') => {
    let summary = '';
    const role = personalInfo.targetRole || 'Technology Leader';
    const name = personalInfo.fullName || 'Candidate';
    if (type === 'growth') {
      summary = `Dynamic and results-driven ${role} with extensive track record scaling high-performance engineering organizations. Proven ability to bridge technical vision with commercial growth, optimizing infrastructure efficiency while accelerating product delivery cycles by over 40%.`;
    } else if (type === 'architect') {
      summary = `Distinguished ${role} with deep expertise in distributed architectures, high-availability cloud platforms, and mission-critical enterprise systems. Recognized for designing fault-tolerant pipelines handling tens of billions of events monthly with five-nines uptime and stringent SOC-2 security compliance.`;
    } else if (type === 'product') {
      summary = `Customer-centric ${role} combining deep technological acuity with sharp product intuition. Adept at translating complex strategic business objectives into scalable product roadmaps, leading cross-functional teams to deliver enterprise software generating multi-million ARR growth.`;
    } else {
      summary = `Accomplished ${role} characterized by quantitative rigor, rapid execution, and technical excellence. Spearheaded key infrastructure migrations saving $2M+ in annual cloud operating costs while mentoring senior talent and fostering an engineering culture of autonomy and impact.`;
    }
    updatePersonalInfo('bioSummary', summary);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-full overflow-hidden shadow-xl">
      {/* Top Form Controls Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Resume Builder Intake</span>
          <span className="text-slate-600">·</span>
          <span className="text-[11px] text-amber-400 font-medium">All Details Auto-Sync</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onResetSample}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition cursor-pointer"
            title="Load executive profile with sample data"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Sample Profile</span>
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-900/40 rounded-lg border border-rose-900/40 transition cursor-pointer"
            title="Clear all fields"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/90 overflow-x-auto p-1.5 gap-1 text-xs">
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium ${
            activeTab === 'personal'
              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Contact & Info</span>
        </button>

        <button
          onClick={() => setActiveTab('summary')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium ${
            activeTab === 'summary'
              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Summary</span>
        </button>

        <button
          onClick={() => setActiveTab('experience')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium ${
            activeTab === 'experience'
              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Experience ({experiences.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium ${
            activeTab === 'skills'
              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Skills</span>
        </button>

        <button
          onClick={() => setActiveTab('education')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium ${
            activeTab === 'education'
              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Education</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium ${
            activeTab === 'projects'
              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Projects</span>
        </button>

        <button
          onClick={() => setActiveTab('certs')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium ${
            activeTab === 'certs'
              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Certifications</span>
        </button>

        <button
          onClick={() => setActiveTab('languages')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium ${
            activeTab === 'languages'
              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>Languages</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
        {/* TAB 1: Personal & Contact */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Legal / Professional Name *</label>
                <input
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="e.g. Alex Vance, Ph.D."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Role / Executive Title *</label>
                <input
                  type="text"
                  value={personalInfo.targetRole}
                  onChange={(e) => updatePersonalInfo('targetRole', e.target.value)}
                  placeholder="e.g. VP of Engineering / Principal Architect"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="alex.vance@example.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                <input
                  type="text"
                  value={personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 (415) 892-4100"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location / Work Authorization *</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="San Francisco, CA (Open to Remote)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-1">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={personalInfo.linkedinUrl}
                  onChange={(e) => updatePersonalInfo('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/alex-vance"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">GitHub / Code Portfolio URL</label>
                <input
                  type="text"
                  value={personalInfo.githubUrl}
                  onChange={(e) => updatePersonalInfo('githubUrl', e.target.value)}
                  placeholder="https://github.com/alexvance-arch"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Personal Portfolio / Website</label>
                <input
                  type="text"
                  value={personalInfo.portfolioUrl}
                  onChange={(e) => updatePersonalInfo('portfolioUrl', e.target.value)}
                  placeholder="https://alexvance.engineering"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Profile Photo selector */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-slate-300 font-semibold mb-2">Executive Portrait / Headshot</label>
              <div className="flex items-center gap-4">
                {personalInfo.avatarUrl ? (
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700 relative group">
                    <img src={personalInfo.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    <button
                      onClick={() => updatePersonalInfo('avatarUrl', '')}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-300 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl border border-dashed border-slate-700 flex items-center justify-center text-slate-500">
                    <User className="w-6 h-6" />
                  </div>
                )}
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updatePersonalInfo('avatarUrl', '/src/assets/images/job_seeker_success_1793544808166.jpg')}
                      className="px-2.5 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                    >
                      Preset Photo A (Executive)
                    </button>
                    <button
                      type="button"
                      onClick={() => updatePersonalInfo('avatarUrl', '/src/assets/images/hero_recruiter_workspace_1793544808301.jpg')}
                      className="px-2.5 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                    >
                      Preset Photo B (Leadership)
                    </button>
                  </div>
                  <input
                    type="text"
                    value={personalInfo.avatarUrl || ''}
                    onChange={(e) => updatePersonalInfo('avatarUrl', e.target.value)}
                    placeholder="Or paste headshot image URL..."
                    className="w-80 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Executive Summary */}
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Executive Profile & Summary Statement</h3>
                <p className="text-[11px] text-slate-400">
                  Target 3-4 impactful sentences. Summarize career breadth, core domain, and top quantitative wins.
                </p>
              </div>
              <div className="flex gap-1.5 text-[11px]">
                <span className="text-slate-400 self-center mr-1">One-Click Formulas:</span>
                <button
                  onClick={() => applySummaryTemplate('architect')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition cursor-pointer"
                >
                  Architect / Systems
                </button>
                <button
                  onClick={() => applySummaryTemplate('growth')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition cursor-pointer"
                >
                  Scaling & Growth
                </button>
                <button
                  onClick={() => applySummaryTemplate('quant')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition cursor-pointer"
                >
                  Quant Impact ($M+)
                </button>
              </div>
            </div>

            <textarea
              rows={6}
              value={personalInfo.bioSummary}
              onChange={(e) => updatePersonalInfo('bioSummary', e.target.value)}
              placeholder="e.g. Visionary engineering executive with 14+ years spearheading scalable distributed systems, enterprise cloud transformations, and high-performance teams of 80+ engineers..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed text-xs"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Characters: {personalInfo.bioSummary.length} | Words: {personalInfo.bioSummary.split(/\s+/).filter(Boolean).length}</span>
              <span>Recommended: 50–90 words for optimal 1-page fit</span>
            </div>
          </div>
        )}

        {/* TAB 3: Work Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Career Track & Work History</h3>
                <p className="text-[11px] text-slate-400">
                  Highlight quantitative results, promotions, scale metrics, and team leadership.
                </p>
              </div>
              <button
                onClick={addExperience}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Position</span>
              </button>
            </div>

            {experiences.map((exp, idx) => (
              <div key={exp.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="font-semibold text-amber-300 text-xs">
                    Position #{idx + 1}: {exp.role || 'New Role'} at {exp.company || 'Company'}
                  </span>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-950/40 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Company Name</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="e.g. Synthetix Cloud"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Role / Job Title</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                      placeholder="e.g. VP of Engineering"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                      placeholder="e.g. San Francisco, CA"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Start Year / Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                      placeholder="2022"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">End Year / Date</label>
                    <input
                      type="text"
                      disabled={exp.isCurrent}
                      value={exp.isCurrent ? 'Present' : exp.endDate}
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                      placeholder="2024"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.isCurrent}
                      onChange={(e) => updateExperience(exp.id, { isCurrent: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-0 bg-slate-900 border-slate-700"
                    />
                    <label htmlFor={`current-${exp.id}`} className="text-slate-300 font-medium cursor-pointer">
                      Current Position
                    </label>
                  </div>
                </div>

                {/* Achievements list */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-300 font-semibold">Key Achievements (Bullet Points)</label>
                    <button
                      type="button"
                      onClick={() => addAchievementBullet(exp.id)}
                      className="text-amber-400 hover:text-amber-300 text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Add Bullet
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {exp.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-2">
                        <span className="text-slate-500 select-none">•</span>
                        <input
                          type="text"
                          value={ach}
                          onChange={(e) => updateAchievementBullet(exp.id, aIdx, e.target.value)}
                          placeholder="e.g. Slashing compute costs by $2.4M (38%) by migrating to Kubernetes..."
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => removeAchievementBullet(exp.id, aIdx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    Technologies / Tools Used (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={exp.techStack.join(', ')}
                    onChange={(e) =>
                      updateExperience(exp.id, {
                        techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    placeholder="Kubernetes, Go, AWS EKS, Kafka, PostgreSQL"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Skills Matrix & Technical Taxonomy</h3>
                <p className="text-[11px] text-slate-400">
                  Organize skills by domain (e.g. Architecture, Cloud, Languages, AI).
                </p>
              </div>
              <button
                onClick={addSkillCategory}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="space-y-3">
              {skills.map((cat) => (
                <div key={cat.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => updateSkillCategory(cat.id, e.target.value, cat.skills.join(', '))}
                      className="font-semibold text-amber-300 bg-transparent border-b border-transparent hover:border-slate-700 focus:border-amber-400 focus:outline-none px-1"
                    />
                    <button
                      onClick={() => removeSkillCategory(cat.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={cat.skills.join(', ')}
                    onChange={(e) => updateSkillCategory(cat.id, cat.name, e.target.value)}
                    placeholder="Enter skills separated by commas..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-xs"
                  />
                  <div className="flex flex-wrap gap-1 pt-1">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Education */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Academic Credentials & Degrees</h3>
                <p className="text-[11px] text-slate-400">
                  Institutions, degrees, fields of study, GPA, and honors.
                </p>
              </div>
              <button
                onClick={addEducation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Degree</span>
              </button>
            </div>

            {education.map((edu, idx) => (
              <div key={edu.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-300">Degree #{idx + 1}</span>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">University / Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                      placeholder="e.g. Stanford University"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Degree Title</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      placeholder="e.g. Ph.D. & M.S."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Major / Field of Study</label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                      placeholder="Computer Science"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Graduation Year</label>
                    <input
                      type="text"
                      value={edu.gradYear}
                      onChange={(e) => updateEducation(edu.id, { gradYear: e.target.value })}
                      placeholder="2014"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">GPA / Honors</label>
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                      placeholder="3.94 / 4.0"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Signature Projects & Impact Case Studies</h3>
                <p className="text-[11px] text-slate-400">
                  Spotlight high-profile software repositories, architectures, or commercial launches.
                </p>
              </div>
              <button
                onClick={addProject}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {projects.map((proj, idx) => (
              <div key={proj.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-300">Project #{idx + 1}: {proj.title}</span>
                  <button onClick={() => removeProject(proj.id)} className="text-slate-500 hover:text-rose-400 p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Project Name</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                      placeholder="Project Name"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Candidate Role</label>
                    <input
                      type="text"
                      value={proj.role}
                      onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                      placeholder="Lead Architect & Maintainer"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Impact Metric (Quantifiable)</label>
                  <input
                    type="text"
                    value={proj.impactMetric}
                    onChange={(e) => updateProject(proj.id, { impactMetric: e.target.value })}
                    placeholder="e.g. 12,000 GitHub stars and 1.8M container pulls worldwide"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Live Demo / Product URL</label>
                    <input
                      type="text"
                      value={proj.liveUrl || ''}
                      onChange={(e) => updateProject(proj.id, { liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Stack (comma-separated)</label>
                    <input
                      type="text"
                      value={proj.technologies.join(', ')}
                      onChange={(e) => updateProject(proj.id, { technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      placeholder="Go, Kubernetes, Envoy"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 7: Certifications */}
        {activeTab === 'certs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Professional Licenses & Certifications</h3>
                <p className="text-[11px] text-slate-400">AWS, GCP, Azure, CKA, PMP, CISSP credentials.</p>
              </div>
              <button
                onClick={addCert}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </button>
            </div>

            {certifications.map((c) => (
              <div key={c.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-3 gap-3 items-center">
                <div>
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => updateCert(c.id, { name: e.target.value })}
                    placeholder="Certification Name"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-xs"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={c.issuer}
                    onChange={(e) => updateCert(c.id, { issuer: e.target.value })}
                    placeholder="Issuing Organization"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-xs"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={c.issueDate}
                    onChange={(e) => updateCert(c.id, { issueDate: e.target.value })}
                    placeholder="Year / Date"
                    className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs"
                  />
                  <button
                    onClick={() => removeCert(c.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 8: Languages */}
        {activeTab === 'languages' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Spoken & Written Languages</h3>
            <div className="space-y-2">
              {languages.map((l, idx) => (
                <div key={l.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <input
                    type="text"
                    value={l.language}
                    onChange={(e) => {
                      const newL = [...languages];
                      newL[idx].language = e.target.value;
                      onChange({ ...data, languages: newL });
                    }}
                    placeholder="Language (e.g. English)"
                    className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white text-xs w-48"
                  />
                  <select
                    value={l.proficiency}
                    onChange={(e) => {
                      const newL = [...languages];
                      newL[idx].proficiency = e.target.value as any;
                      onChange({ ...data, languages: newL });
                    }}
                    className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 text-xs flex-1"
                  >
                    <option value="Native / Bilingual">Native / Bilingual</option>
                    <option value="Full Professional">Full Professional</option>
                    <option value="Professional Working">Professional Working</option>
                    <option value="Working Knowledge">Working Knowledge</option>
                  </select>
                  <button
                    onClick={() => {
                      onChange({
                        ...data,
                        languages: languages.filter((_, i) => i !== idx),
                      });
                    }}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  onChange({
                    ...data,
                    languages: [...languages, { id: `lang-${Date.now()}`, language: '', proficiency: 'Full Professional' }],
                  });
                }}
                className="text-amber-400 hover:text-amber-300 text-xs flex items-center gap-1 pt-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Language
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
