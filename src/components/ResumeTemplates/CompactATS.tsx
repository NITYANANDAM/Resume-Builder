import React from 'react';
import { ResumeData, ResumeConfig } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export const CompactATS: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, experiences, education, skills, certifications, projects, languages } = data;
  const accent = config.accentColor || '#0f172a';

  return (
    <div className="w-full bg-white text-slate-900 leading-snug text-[10.5px] p-7 shadow-sm print:shadow-none min-h-[1050px] font-sans">
      {/* ATS-Optimized Header */}
      <div className="border-b-2 border-slate-900 pb-2 mb-3">
        <div className="flex justify-between items-baseline">
          <h1 className="text-xl font-bold uppercase tracking-tight text-slate-950">
            {personalInfo.fullName}
          </h1>
          <span className="text-[11px] font-semibold text-slate-700">
            {personalInfo.targetRole}
          </span>
        </div>
        <div className="text-[10px] text-slate-600 mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.email && <span>| {personalInfo.email}</span>}
          {personalInfo.linkedinUrl && <span>| {personalInfo.linkedinUrl}</span>}
          {personalInfo.githubUrl && <span>| {personalInfo.githubUrl}</span>}
        </div>
      </div>

      <div className="space-y-3">
        {/* Summary */}
        {personalInfo.bioSummary && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1">
              Professional Summary
            </h2>
            <p className="text-slate-800 text-[10px] leading-relaxed text-justify">
              {personalInfo.bioSummary}
            </p>
          </section>
        )}

        {/* Skills Section (Often near top for ATS keyword ranking) */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1">
              Technical & Core Skills
            </h2>
            <div className="text-[10px] space-y-0.5 text-slate-800">
              {skills.map((cat) => (
                <div key={cat.id}>
                  <strong className="text-slate-950">{cat.name}: </strong>
                  <span>{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Professional Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1.5">
              Professional Experience
            </h2>
            <div className="space-y-2.5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-bold text-[10.5px] text-slate-950">
                    <span>{exp.role} — <span className="font-semibold">{exp.company}</span></span>
                    <span className="font-mono-code font-normal text-[9.5px] text-slate-600">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate} | {exp.location}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-slate-800 text-[10px] mt-0.5">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                  {exp.techStack.length > 0 && (
                    <div className="text-[9px] text-slate-600 mt-0.5 ml-3.5">
                      <em>Keywords:</em> {exp.techStack.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1">
              Key Projects
            </h2>
            <div className="space-y-1.5">
              {projects.map((proj) => (
                <div key={proj.id} className="text-[10px]">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{proj.title} ({proj.role})</span>
                    <span className="font-mono-code text-slate-700 text-[9px]">{proj.impactMetric}</span>
                  </div>
                  <div className="text-slate-800">{proj.description}</div>
                  <div className="text-[9px] text-slate-600"><em>Tech:</em> {proj.technologies.join(', ')}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-0.5 mb-1">
            Education & Certifications
          </h2>
          <div className="space-y-1 text-[10px] text-slate-800">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <span>
                  <strong>{edu.institution}</strong> — {edu.degree} in {edu.fieldOfStudy}
                  {edu.gpa && ` (GPA: ${edu.gpa})`}
                </span>
                <span className="font-mono-code text-slate-600 text-[9.5px]">{edu.gradYear}</span>
              </div>
            ))}
            {certifications.length > 0 && (
              <div className="text-[9.5px] pt-0.5">
                <strong>Certifications: </strong>
                {certifications.map(c => `${c.name} (${c.issuer}, ${c.issueDate})`).join('; ')}
              </div>
            )}
            {languages.length > 0 && (
              <div className="text-[9.5px]">
                <strong>Languages: </strong>
                {languages.map(l => `${l.language} [${l.proficiency}]`).join(', ')}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
