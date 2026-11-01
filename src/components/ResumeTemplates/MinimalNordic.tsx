import React from 'react';
import { ResumeData, ResumeConfig } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export const MinimalNordic: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, experiences, education, skills, certifications, projects, languages } = data;
  const accent = config.accentColor || '#0284c7';

  return (
    <div className="w-full bg-white text-slate-800 leading-normal text-[11px] p-10 shadow-sm print:shadow-none min-h-[1050px] font-sans">
      {/* Header */}
      <div className="flex justify-between items-end pb-6 border-b border-slate-200 mb-8">
        <div>
          <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 block mb-1">
            Curriculum Vitae
          </span>
          <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-1">
            <span className="font-bold">{personalInfo.fullName.split(' ')[0]}</span>{' '}
            <span>{personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-xs font-medium tracking-wide" style={{ color: accent }}>
            {personalInfo.targetRole}
          </p>
        </div>

        <div className="text-right text-[10px] text-slate-500 space-y-0.5">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedinUrl && (
            <div className="text-slate-700 font-mono-code">{personalInfo.linkedinUrl.replace('https://www.', '')}</div>
          )}
        </div>
      </div>

      <div className="space-y-7">
        {/* Profile */}
        {personalInfo.bioSummary && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-0.5">
              Profile
            </div>
            <div className="col-span-9 text-slate-600 leading-relaxed text-[11px]">
              {personalInfo.bioSummary}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-0.5">
              Experience
            </div>
            <div className="col-span-9 space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-slate-900 text-[11.5px]">{exp.role}</span>
                    <span className="text-[10px] text-slate-400 font-mono-code">
                      {exp.startDate} — {exp.isCurrent ? 'Current' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[10.5px] font-medium mb-2" style={{ color: accent }}>
                    {exp.company} <span className="text-slate-400">· {exp.location}</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 text-[10.5px]">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-300 select-none mt-1">—</span>
                        <span className="flex-1 leading-snug">{ach}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.techStack.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {exp.techStack.map((t, idx) => (
                        <span key={idx} className="text-[9px] bg-slate-50 border border-slate-200 px-1.5 py-0.2 rounded text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-0.5">
              Selected Works
            </div>
            <div className="col-span-9 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="pb-2 border-b border-slate-100 last:border-b-0">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-900">{proj.title}</span>
                    <span className="text-[10px] text-slate-400">{proj.role}</span>
                  </div>
                  <p className="text-slate-600 text-[10.5px] my-1 leading-snug">{proj.description}</p>
                  <div className="flex justify-between items-center text-[9.5px]">
                    <span className="font-mono-code font-medium text-slate-800">{proj.impactMetric}</span>
                    <span className="text-slate-400">{proj.technologies.join(' · ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-0.5">
              Capabilities
            </div>
            <div className="col-span-9 grid grid-cols-2 gap-4">
              {skills.map((cat) => (
                <div key={cat.id}>
                  <div className="text-[10px] font-bold text-slate-700 mb-1">{cat.name}</div>
                  <div className="text-[10px] text-slate-600 leading-relaxed">
                    {cat.skills.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Credentials */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-0.5">
            Education
          </div>
          <div className="col-span-9 space-y-2.5">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <div className="font-semibold text-slate-900">{edu.degree} · {edu.fieldOfStudy}</div>
                  <div className="text-slate-500 text-[10px]">{edu.institution} {edu.honors && `(${edu.honors})`}</div>
                </div>
                <div className="text-[10px] text-slate-400 font-mono-code">{edu.gradYear}</div>
              </div>
            ))}
            {certifications.length > 0 && (
              <div className="pt-2 text-[10px] text-slate-600">
                <span className="font-bold text-slate-700">Certifications: </span>
                {certifications.map(c => `${c.name} (${c.issuer})`).join(' · ')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
