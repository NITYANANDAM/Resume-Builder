import React, { useState } from 'react';
import { ResumeConfig, ResumeTemplate } from '../types/resume';
import { 
  Download, 
  Printer, 
  Sparkles, 
  Palette, 
  Type, 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Check,
  Camera,
  Layers
} from 'lucide-react';
import { downloadResumePDF } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

interface ResumePreviewControlsProps {
  config: ResumeConfig;
  onChangeConfig: (newConfig: ResumeConfig) => void;
  candidateName: string;
}

const TEMPLATES: { id: ResumeTemplate; name: string; tag: string; description: string }[] = [
  { id: 'modern-executive', name: 'Modern Executive', tag: 'Tech & Leadership', description: 'Dual-column with accent banner & metrics.' },
  { id: 'harvard-classic', name: 'Harvard / Ivy Classic', tag: 'Top ATS Standard', description: 'Timeless single-column serif for corporate & finance.' },
  { id: 'minimal-nordic', name: 'Minimalist Nordic', tag: 'Scandinavian Clean', description: 'Grid-based layout with high typographic restraint.' },
  { id: 'creative-lead', name: 'Creative Lead', tag: 'Portfolio & Product', description: 'Distinct accent side rail & signature showcase cards.' },
  { id: 'compact-ats', name: 'Compact 1-Page ATS', tag: 'High-Density Parse', description: 'Precision engineered to fit extensive careers in 1 page.' },
];

const ACCENT_COLORS = [
  { label: 'Slate Navy', value: '#0f172a' },
  { label: 'Oxford Blue', value: '#1e3a8a' },
  { label: 'Executive Gold', value: '#b45309' },
  { label: 'Emerald Forest', value: '#065f46' },
  { label: 'Bordeaux Ruby', value: '#831843' },
  { label: 'Imperial Violet', value: '#6d28d9' },
];

export const ResumePreviewControls: React.FC<ResumePreviewControlsProps> = ({
  config,
  onChangeConfig,
  candidateName,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      const success = await downloadResumePDF('resume-document-canvas', candidateName, config.paperSize);
      if (success) {
        setDownloadSuccess(true);
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
        });
        setTimeout(() => setDownloadSuccess(false), 3500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Advanced Resume Formats & Output
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition cursor-pointer"
            title="Open browser print dialog"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-950 stroke-[3]" />
                <span>PDF Downloaded!</span>
              </>
            ) : isDownloading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Executive PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Format Selector Pills */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Select Advanced Layout Architecture (5 Formats)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onChangeConfig({ ...config, template: t.id })}
              className={`p-2.5 rounded-xl text-left border transition cursor-pointer ${
                config.template === t.id
                  ? 'bg-amber-500/10 border-amber-500 text-white shadow-sm'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold text-xs leading-tight mb-0.5 truncate">{t.name}</div>
              <div className="text-[10px] text-amber-400/90 font-medium truncate">{t.tag}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Styling Controls Grid */}
      <div className="pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        {/* Accent Color */}
        <div>
          <label className="block text-slate-400 font-medium mb-1.5 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Accent Tone</span>
          </label>
          <div className="flex items-center gap-1.5">
            {ACCENT_COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => onChangeConfig({ ...config, accentColor: c.value })}
                title={c.label}
                className={`w-5 h-5 rounded-full transition-transform cursor-pointer border ${
                  config.accentColor === c.value ? 'scale-125 border-white ring-2 ring-amber-400/50' : 'border-transparent hover:scale-110'
                }`}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
        </div>

        {/* Typography */}
        <div>
          <label className="block text-slate-400 font-medium mb-1.5 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-amber-400" />
            <span>Typography</span>
          </label>
          <select
            value={config.fontFamily}
            onChange={(e) => onChangeConfig({ ...config, fontFamily: e.target.value as any })}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 text-xs"
          >
            <option value="sans">Neo-Grotesque Sans</option>
            <option value="serif">Harvard Luxury Serif</option>
            <option value="modern">Modern Display Sans</option>
          </select>
        </div>

        {/* Paper Size */}
        <div>
          <label className="block text-slate-400 font-medium mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Paper Standard</span>
          </label>
          <div className="flex gap-1">
            <button
              onClick={() => onChangeConfig({ ...config, paperSize: 'a4' })}
              className={`flex-1 py-1 rounded text-xs font-medium transition cursor-pointer ${
                config.paperSize === 'a4'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              A4
            </button>
            <button
              onClick={() => onChangeConfig({ ...config, paperSize: 'letter' })}
              className={`flex-1 py-1 rounded text-xs font-medium transition cursor-pointer ${
                config.paperSize === 'letter'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              US Letter
            </button>
          </div>
        </div>

        {/* Photo Toggle */}
        <div>
          <label className="block text-slate-400 font-medium mb-1.5 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Headshot Photo</span>
          </label>
          <button
            onClick={() => onChangeConfig({ ...config, showPhoto: !config.showPhoto })}
            className={`w-full py-1 px-2.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
              config.showPhoto
                ? 'bg-slate-800 border-amber-500/40 text-amber-300'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            {config.showPhoto ? 'Photo Included' : 'No Photo (Pure ATS)'}
          </button>
        </div>
      </div>
    </div>
  );
};
