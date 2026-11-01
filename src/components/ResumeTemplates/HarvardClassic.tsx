import React from 'react';
import { ResumeData, ResumeConfig } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export const HarvardClassic: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, experiences, education, skills, certifications, projects, languages } = data;
  const accent = config.accentColor || '#1e293b';

  return (
    <div className="w-full bg-white text-slate-900 leading-normal text-[11px] p-10 font-serif-luxury shadow-sm print:shadow-none min-h-[1050px]">
      {/* Centered Classic Header */}
      <div className="text-center pb-3 border-b-2 border-slate-900 mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase mb-1">
          {personalInfo.fullName || 'Candidate Full Name'}
        </h1>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
          {personalInfo.targetRole || 'Executive Candidate'}
        </p>

        {/* Inline contact row separated by mid-dots */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10.5px] text-slate-700 font-sans">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && (
            <span>• <a href={`mailto:${personalInfo.email}`} className="text-slate-900 underline">{personalInfo.email}</a></span>
          )}
          {personalInfo.linkedinUrl && (
            <span>• <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="text-slate-900 underline">LinkedIn</a></span>
          )}
          {personalInfo.githubUrl && (
            <span>• <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="text-slate-900 underline">GitHub</a></span>
          )}
          {personalInfo.portfolioUrl && (
            <span>• <a href={personalInfo.portfolioUrl} target="_blank" rel="noreferrer" className="text-slate-900 underline">Portfolio</a></span>
          )}
        </div>
      </div>

      <div className="space-y-4 font-sans text-[11px]">
        {/* Executive Summary */}
        {personalInfo.bioSummary && (
          <section>
            <h2 className="font-serif-luxury text-xs font-bold uppercase tracking-wider text-slate-950 pb-0.5 border-b border-slate-400 mb-1.5">
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify">
              {personalInfo.bioSummary}
            </p>
          </section>
        )}

        {/* Education (Often top for Harvard/Ivy format) */}
        {education.length > 0 && (
          <section>
            <h2 className="font-serif-luxury text-xs font-bold uppercase tracking-wider text-slate-950 pb-0.5 border-b border-slate-400 mb-2">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline font-bold text-slate-950">
                    <span>{edu.institution}</span>
                    <span className="font-normal text-[10px] text-slate-600">{edu.gradYear}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-slate-800 text-[10.5px]">
                    <span className="italic">{edu.degree} in {edu.fieldOfStudy}</span>
                    {edu.gpa && <span className="text-[10px] text-slate-600 font-mono-code">GPA: {edu.gpa}</span>}
                  </div>
                  {edu.honors && (
                    <p className="text-[10px] text-slate-600 italic mt-0.5">{edu.honors}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Professional Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="font-serif-luxury text-xs font-bold uppercase tracking-wider text-slate-950 pb-0.5 border-b border-slate-400 mb-2.5">
              Professional Experience
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-950 text-[11.5px]">{exp.company}</span>
                    <span className="text-[10.5px] text-slate-700 italic">{exp.location}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[11px] mb-1">
                    <span className="italic font-semibold text-slate-800">{exp.role}</span>
                    <span className="text-[10px] text-slate-600 font-mono-code">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 leading-snug">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                  {exp.techStack.length > 0 && (
                    <div className="mt-1 text-[9.5px] text-slate-600">
                      <span className="font-semibold text-slate-700">Key Technologies: </span>
                      {exp.techStack.join(' · ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects / Leadership */}
        {projects.length > 0 && (
          <section>
            <h2 className="font-serif-luxury text-xs font-bold uppercase tracking-wider text-slate-950 pb-0.5 border-b border-slate-400 mb-2">
              Key Projects & Publications
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-950">{proj.title}</span>
                    <span className="text-[10px] text-slate-600 italic">{proj.role}</span>
                  </div>
                  <p className="text-slate-700 text-[10.5px] my-0.5 leading-snug">
                    {proj.description} <span className="font-semibold text-slate-900 font-mono-code">— {proj.impactMetric}</span>
                  </p>
                  <div className="text-[9.5px] text-slate-500">
                    <span className="font-medium text-slate-600">Stack: </span>
                    {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Certifications */}
        <section>
          <h2 className="font-serif-luxury text-xs font-bold uppercase tracking-wider text-slate-950 pb-0.5 border-b border-slate-400 mb-2">
            Skills, Certifications & Languages
          </h2>
          <div className="space-y-1.5 text-[10.5px] text-slate-800">
            {skills.map((cat) => (
              <div key={cat.id}>
                <strong className="text-slate-950">{cat.name}: </strong>
                <span>{cat.skills.join(', ')}</span>
              </div>
            ))}
            {certifications.length > 0 && (
              <div>
                <strong className="text-slate-950">Certifications: </strong>
                <span>
                  {certifications.map(c => `${c.name} (${c.issuer}, ${c.issueDate})`).join('; ')}
                </span>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <strong className="text-slate-950">Languages: </strong>
                <span>
                  {languages.map(l => `${l.language} (${l.proficiency})`).join(', ')}
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
