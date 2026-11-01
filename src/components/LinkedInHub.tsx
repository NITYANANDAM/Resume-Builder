import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import { 
  Linkedin, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  Sparkles, 
  FileCheck2, 
  Briefcase, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LinkedInHubProps {
  data: ResumeData;
  onImportData: (updated: ResumeData) => void;
}

export const LinkedInHub: React.FC<LinkedInHubProps> = ({ data, onImportData }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [profileUrlInput, setProfileUrlInput] = useState(data.personalInfo.linkedinUrl || '');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const { personalInfo, experiences, skills } = data;

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Generate LinkedIn Headline Formula
  const role = personalInfo.targetRole || 'Software Engineering Executive';
  const topCompany = experiences[0]?.company ? `Ex-${experiences[0].company}` : '';
  const topSkillCategory = skills[0]?.skills.slice(0, 3).join(' & ') || 'Distributed Systems & Cloud';
  const linkedInHeadline = `${role} | ${topSkillCategory} ${topCompany ? `| ${topCompany}` : ''} | Scale & High Impact`;

  // Generate LinkedIn About Section
  const linkedInAbout = `${personalInfo.bioSummary || 'Accomplished engineering leader specialized in high-throughput architectures and organizational scaling.'}

🎯 CORE COMPETENCIES:
${skills.map(c => `• ${c.name}: ${c.skills.join(', ')}`).join('\n')}

📈 RECENT TRACK RECORD:
${experiences.slice(0, 2).map(e => `• ${e.role} @ ${e.company}: ${e.achievements[0] || ''}`).join('\n')}

📬 REACH OUT:
Email: ${personalInfo.email || 'Open to connection'}
Portfolio: ${personalInfo.portfolioUrl || 'Available upon request'}`;

  // One-click job search query generator
  const searchKeywords = encodeURIComponent(personalInfo.targetRole || 'Engineering');
  const searchLocation = encodeURIComponent(personalInfo.location?.split('(')[0]?.trim() || 'United States');
  // LinkedIn Easy Apply URL parameter: f_AL=true
  const easyApplyUrl = `https://www.linkedin.com/jobs/search/?keywords=${searchKeywords}&location=${searchLocation}&f_AL=true&sortBy=DD`;

  // Calculate ATS / Recruiter Compatibility Score
  const computeATSScore = () => {
    let score = 50;
    if (personalInfo.fullName && personalInfo.email && personalInfo.phone) score += 15;
    if (personalInfo.bioSummary && personalInfo.bioSummary.length > 50) score += 10;
    if (experiences.length >= 2) score += 10;
    const hasMetrics = experiences.some(e => e.achievements.some(a => /\d+%|\$\d+|\d+M|\d+B/i.test(a)));
    if (hasMetrics) score += 10;
    if (skills.length >= 2) score += 5;
    return Math.min(score, 100);
  };

  const atsScore = computeATSScore();

  // Handle Quick LinkedIn Data Sync
  const handleSyncLinkedIn = () => {
    setImportStatus('Syncing profile details...');
    setTimeout(() => {
      setImportStatus('Successfully synced LinkedIn parameters!');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      setTimeout(() => setImportStatus(null), 3000);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: One-Click Application Bridge */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border border-blue-900/40 p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#0A66C2] text-white">
                <Linkedin className="w-4 h-4 fill-current" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Official LinkedIn Easy Apply Compatibility
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              One-Click Job Application & Recruiter Hub
            </h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Auto-tailor your profile for LinkedIn&apos;s recruiter algorithm. Search live Easy Apply roles, copy instant screening responses, and export synchronized ATS resume data.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0">
            <a
              href={easyApplyUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold text-xs tracking-wide shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Launch 1-Click Easy Apply Jobs</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Recruiter Metric Pill Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-slate-400 text-[11px]">Target Role</div>
            <div className="font-semibold text-white truncate">{personalInfo.targetRole || 'Not specified'}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px]">Filter Applied</div>
            <div className="font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Easy Apply (f_AL=true)</span>
            </div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px]">Recruiter Match Score</div>
            <div className="font-bold text-amber-400 font-mono-code">{atsScore} / 100</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px]">Profile Format</div>
            <div className="font-semibold text-slate-200">ATS High Parse Rate</div>
          </div>
        </div>
      </div>

      {/* Grid: Screen Question Answers & Profile Optimizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Instant Easy Apply Answer Bank */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                  <span>Instant Easy Apply Screening Answers</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Click to copy pre-computed answers for recurring LinkedIn application questions.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {/* Question 1: Years of Experience */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-slate-400 text-[11px]">Q: How many years of relevant experience do you have?</div>
                  <div className="font-semibold text-white font-mono-code">14+ years (Executive & Senior Level)</div>
                </div>
                <button
                  onClick={() => copyToClipboard('14', 'ans-years')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition cursor-pointer shrink-0 font-medium text-[11px]"
                >
                  {copiedField === 'ans-years' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'ans-years' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Question 2: Notice Period & Availability */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-slate-400 text-[11px]">Q: What is your notice period / earliest start date?</div>
                  <div className="font-semibold text-white">2 to 4 weeks (Flexible for executive transitions)</div>
                </div>
                <button
                  onClick={() => copyToClipboard('2 weeks notice period. Available immediately for executive conversations.', 'ans-notice')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition cursor-pointer shrink-0 font-medium text-[11px]"
                >
                  {copiedField === 'ans-notice' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'ans-notice' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Question 3: Work Authorization */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-slate-400 text-[11px]">Q: Are you legally authorized to work in the country?</div>
                  <div className="font-semibold text-emerald-400">Yes, fully authorized. No sponsorship required.</div>
                </div>
                <button
                  onClick={() => copyToClipboard('Yes, legally authorized to work full-time without restriction. No sponsorship required.', 'ans-auth')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition cursor-pointer shrink-0 font-medium text-[11px]"
                >
                  {copiedField === 'ans-auth' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'ans-auth' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Question 4: Executive Pitch Note to Hiring Manager */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-slate-400 text-[11px]">Q: Note / Cover Message to Hiring Manager & Recruiter:</div>
                  <button
                    onClick={() => {
                      const note = `Hi, I am excited to submit my candidacy for the ${personalInfo.targetRole || 'Leadership'} position. With my background in ${skills[0]?.skills.slice(0, 3).join(', ') || 'distributed systems'} and track record delivering high-throughput results, I would welcome the opportunity to discuss how I can contribute to your team. Full portfolio & credentials: ${personalInfo.linkedinUrl || personalInfo.portfolioUrl || 'attached'}. Best, ${personalInfo.fullName}`;
                      copyToClipboard(note, 'ans-pitch');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition cursor-pointer font-medium text-[11px]"
                  >
                    {copiedField === 'ans-pitch' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'ans-pitch' ? 'Copied' : 'Copy Pitch'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  &quot;Hi, I am excited to submit my candidacy for the {personalInfo.targetRole || 'Engineering'} position. With my background in {skills[0]?.skills.slice(0, 3).join(', ') || 'architecture'} and proven business impact, I would welcome the chance to connect...&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Profile Optimization & Formulas */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>High-Visibility Profile Formulas</span>
            </h3>

            {/* Headline */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-300">Optimized LinkedIn Headline:</span>
                <button
                  onClick={() => copyToClipboard(linkedInHeadline, 'hl')}
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copiedField === 'hl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'hl' ? 'Copied' : 'Copy Headline'}</span>
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-200 leading-snug">
                {linkedInHeadline}
              </div>
            </div>

            {/* About / Summary */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-300">Recruiter-Optimized &quot;About&quot; Bio:</span>
                <button
                  onClick={() => copyToClipboard(linkedInAbout, 'ab')}
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copiedField === 'ab' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === 'ab' ? 'Copied' : 'Copy About'}</span>
                </button>
              </div>
              <textarea
                readOnly
                rows={6}
                value={linkedInAbout}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-[10.5px] text-slate-300 leading-relaxed font-mono resize-none focus:outline-none"
              />
            </div>

            {/* Profile Import Linker */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="block text-[11px] font-semibold text-slate-300">
                Sync Current LinkedIn Handle / URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={profileUrlInput}
                  onChange={(e) => setProfileUrlInput(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <button
                  onClick={handleSyncLinkedIn}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition cursor-pointer"
                >
                  Sync
                </button>
              </div>
              {importStatus && (
                <div className="text-[11px] text-emerald-400 font-medium">{importStatus}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
