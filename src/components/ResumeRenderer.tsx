import React from 'react';
import { ResumeData, ResumeConfig } from '../types/resume';
import { ModernExecutive } from './ResumeTemplates/ModernExecutive';
import { HarvardClassic } from './ResumeTemplates/HarvardClassic';
import { MinimalNordic } from './ResumeTemplates/MinimalNordic';
import { CreativeLead } from './ResumeTemplates/CreativeLead';
import { CompactATS } from './ResumeTemplates/CompactATS';

interface ResumeRendererProps {
  data: ResumeData;
  config: ResumeConfig;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({ data, config }) => {
  const getTemplateComponent = () => {
    switch (config.template) {
      case 'harvard-classic':
        return <HarvardClassic data={data} config={config} />;
      case 'minimal-nordic':
        return <MinimalNordic data={data} config={config} />;
      case 'creative-lead':
        return <CreativeLead data={data} config={config} />;
      case 'compact-ats':
        return <CompactATS data={data} config={config} />;
      case 'modern-executive':
      default:
        return <ModernExecutive data={data} config={config} />;
    }
  };

  const fontClass = 
    config.fontFamily === 'serif' 
      ? 'font-serif-luxury' 
      : config.fontFamily === 'modern' 
      ? 'font-display' 
      : 'font-sans';

  // Standard dimensions for exact PDF printing
  // A4: 210mm x 297mm (~794px x 1123px at 96 DPI)
  // US Letter: 8.5in x 11in (~816px x 1056px at 96 DPI)
  const isA4 = config.paperSize === 'a4';
  const widthStyle = isA4 ? 'w-[794px]' : 'w-[816px]';

  return (
    <div className="flex justify-center w-full overflow-x-auto p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
      <div 
        id="resume-document-canvas"
        className={`${widthStyle} min-h-[1123px] bg-white text-slate-900 shadow-2xl rounded-sm transition-all duration-200 select-text ${fontClass}`}
        style={{
          boxSizing: 'border-box',
        }}
      >
        {getTemplateComponent()}
      </div>
    </div>
  );
};
