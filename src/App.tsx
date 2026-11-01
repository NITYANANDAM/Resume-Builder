import React, { useState } from 'react';
import { 
  ResumeData, 
  ResumeConfig, 
  ResumeTemplate 
} from './types/resume';
import { INITIAL_EXECUTIVE_DATA, BLANK_RESUME_DATA } from './data/sampleProfiles';
import { ResumeForm } from './components/ResumeForm';
import { ResumeRenderer } from './components/ResumeRenderer';
import { ResumePreviewControls } from './components/ResumePreviewControls';
import { LinkedInHub } from './components/LinkedInHub';
import { AppStoreCenter } from './components/AppStoreCenter';
import { PWAInstallButton, OfflineIndicator } from './components/PWAInstallButton';
import { downloadResumePDF } from './utils/pdfGenerator';
import { 
  FileText, 
  Linkedin, 
  Smartphone, 
  Layout, 
  Download, 
  Check, 
  Sparkles,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [data, setData] = useState<ResumeData>(INITIAL_EXECUTIVE_DATA);
  const [config, setConfig] = useState<ResumeConfig>({
    template: 'modern-executive',
    accentColor: '#0f172a',
    fontFamily: 'sans',
    spacing: 'comfortable',
    paperSize: 'a4',
    showPhoto: true,
    twoColumnLayout: true,
  });

  const [activeTab, setActiveTab] = useState<'builder' | 'formats' | 'linkedin' | 'store'>('builder');
  const [mobileViewMode, setMobileViewMode] = useState<'form' | 'preview'>('form');

  const handleResetSample = () => {
    setData(INITIAL_EXECUTIVE_DATA);
  };

  const handleClear = () => {
    setData(BLANK_RESUME_DATA);
  };

  const handleHeaderDownload = async () => {
    await downloadResumePDF('resume-document-canvas', data.personalInfo.fullName, config.paperSize);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Offline Indicator */}
      <OfflineIndicator />

      {/* Top Bar Contract: [Brand title] — [4-5 single-line nav links] — [1 primary action] */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <img 
              src="/src/assets/images/app_logo_recruiter_1793544806092.jpg" 
              alt="ExecutiveResume Pro" 
              className="w-7 h-7 rounded-lg border border-amber-500/40 object-cover shadow-sm"
            />
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              ExecutiveResume<span className="text-amber-400">Pro</span>
            </span>
          </div>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <button
              onClick={() => setActiveTab('builder')}
              className={`hover:text-white transition whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'builder' ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5' : ''
              }`}
            >
              Resume Studio
            </button>
            <button
              onClick={() => setActiveTab('formats')}
              className={`hover:text-white transition whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'formats' ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5' : ''
              }`}
            >
              Executive Formats
            </button>
            <button
              onClick={() => setActiveTab('linkedin')}
              className={`hover:text-white transition whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'linkedin' ? 'text-blue-400 border-b-2 border-blue-400 pb-0.5' : ''
              }`}
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn Easy Apply</span>
            </button>
            <button
              onClick={() => setActiveTab('store')}
              className={`hover:text-white transition whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'store' ? 'text-emerald-400 border-b-2 border-emerald-400 pb-0.5' : ''
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>App Store & ASO</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <PWAInstallButton />
            <button
              onClick={handleHeaderDownload}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm transition whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex border-b border-slate-800 bg-slate-900 px-4 py-2 gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('builder')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            activeTab === 'builder' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400'
          }`}
        >
          Studio
        </button>
        <button
          onClick={() => setActiveTab('formats')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            activeTab === 'formats' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400'
          }`}
        >
          Formats
        </button>
        <button
          onClick={() => setActiveTab('linkedin')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            activeTab === 'linkedin' ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40' : 'text-slate-400'
          }`}
        >
          LinkedIn
        </button>
        <button
          onClick={() => setActiveTab('store')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            activeTab === 'store' ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400'
          }`}
        >
          Store & ASO
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {/* VIEW 1: Resume Studio Builder */}
        {activeTab === 'builder' && (
          <div className="space-y-6">
            {/* Top Preview & Controls Bar */}
            <ResumePreviewControls
              config={config}
              onChangeConfig={setConfig}
              candidateName={data.personalInfo.fullName}
            />

            {/* Mobile Form vs Preview Switcher */}
            <div className="lg:hidden flex items-center justify-center p-1 bg-slate-900 rounded-xl border border-slate-800">
              <button
                onClick={() => setMobileViewMode('form')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                  mobileViewMode === 'form' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Edit Resume Details
              </button>
              <button
                onClick={() => setMobileViewMode('preview')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                  mobileViewMode === 'preview' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                View Live Preview
              </button>
            </div>

            {/* Split Screen Workspace on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (5 cols): Resume Intake Form */}
              <div className={`lg:col-span-5 h-[850px] ${mobileViewMode === 'preview' ? 'hidden lg:block' : 'block'}`}>
                <ResumeForm
                  data={data}
                  onChange={setData}
                  onResetSample={handleResetSample}
                  onClear={handleClear}
                />
              </div>

              {/* Right Column (7 cols): Document Canvas Viewport */}
              <div className={`lg:col-span-7 ${mobileViewMode === 'form' ? 'hidden lg:block' : 'block'}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Live High-DPI Document Canvas ({config.paperSize.toUpperCase()})</span>
                    </span>
                    <span className="text-slate-500">Auto-Reflects Intake Form Updates</span>
                  </div>

                  <ResumeRenderer data={data} config={config} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Executive Formats Showcase */}
        {activeTab === 'formats' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-2">5 Advanced Executive Resume Architectures</h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Engineered for maximum recruiter recall and rigorous Applicant Tracking System (ATS) parsing. Each layout follows strict typography scales, content hierarchy, and proven executive placement standards.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                {[
                  {
                    id: 'modern-executive' as ResumeTemplate,
                    name: 'Modern Executive',
                    audience: 'VP, Director, Senior Tech Lead',
                    perks: ['Dual-column balance', 'Prominent impact banner', 'High ATS compliance'],
                  },
                  {
                    id: 'harvard-classic' as ResumeTemplate,
                    name: 'Harvard / Ivy Classic',
                    audience: 'Fortune 500, Finance, Legal',
                    perks: ['100% ATS parser accuracy', 'Understated serif type', 'Single-column purity'],
                  },
                  {
                    id: 'minimal-nordic' as ResumeTemplate,
                    name: 'Minimalist Nordic',
                    audience: 'Architecture, Clean Tech, Startups',
                    perks: ['Ample whitespace rhythm', 'Hairline dividing rules', 'Modern scannability'],
                  },
                  {
                    id: 'creative-lead' as ResumeTemplate,
                    name: 'Creative Lead',
                    audience: 'Design, Product, Portfolio Leads',
                    perks: ['Accent rail with photo', 'Featured project cards', 'Signature visual presence'],
                  },
                  {
                    id: 'compact-ats' as ResumeTemplate,
                    name: 'Compact 1-Page ATS',
                    audience: 'High-Density Executive Records',
                    perks: ['Fits 14+ years on 1 sheet', 'Dense keyword scanning', 'Zero overflow risk'],
                  },
                ].map((fmt) => (
                  <div
                    key={fmt.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between transition cursor-pointer ${
                      config.template === fmt.id
                        ? 'bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                    onClick={() => {
                      setConfig({ ...config, template: fmt.id });
                      setActiveTab('builder');
                    }}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-sm text-white">{fmt.name}</h3>
                        {config.template === fmt.id && (
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                        )}
                      </div>
                      <div className="text-[11px] text-amber-400/90 font-medium mb-3">{fmt.audience}</div>
                      <ul className="space-y-1 text-[10.5px] text-slate-400">
                        {fmt.perks.map((p, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      className="mt-4 w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                    >
                      {config.template === fmt.id ? 'Currently Active' : 'Apply & Preview'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Review Visual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Talent Recruiter Intelligence
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Designed for 6-Second Recruiter Screenings
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Recruiters spend an average of 6 to 7.4 seconds on an initial resume pass. ExecutiveResume Pro positions your quantifiable achievements ($ saved, % speed gains, teams scaled) directly along the natural F-shaped reading eye path.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('builder')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
                  >
                    <span>Configure My Resume in Studio</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl max-h-[300px]">
                <img
                  src="/src/assets/images/hero_recruiter_workspace_1793544808301.jpg"
                  alt="Recruiter in Executive Office"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: LinkedIn 1-Click Job Application Hub */}
        {activeTab === 'linkedin' && (
          <LinkedInHub data={data} onImportData={setData} />
        )}

        {/* VIEW 4: App Store & Google Play Publishing + ASO */}
        {activeTab === 'store' && (
          <AppStoreCenter />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-6 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">ExecutiveResume Pro</span>
            <span>·</span>
            <span>Automated High-DPI PDF & ATS CV Engine</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>PWA Standalone Ready</span>
            <span>·</span>
            <span>Google Play & Apple App Store Publishing Kit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
