import React from 'react';
import { ResumeData, ResumeConfig } from '../../types/resume';
import { Sparkles, ExternalLink, Briefcase, GraduationCap, Award, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export const CreativeLead: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, experiences, education, skills, certifications, projects, languages } = data;
  const accent = config.accentColor || '#7c3aed';

  return (
    <div className="w-full bg-white text-slate-900 leading-normal text-[11px] min-h-[1050px] shadow-sm print:shadow-none font-sans flex">
      {/* Accent Left Rail */}
      <div 
        className="w-[32%] text-white p-7 flex flex-col justify-between shrink-0"
        style={{ backgroundColor: accent }}
      >
        <div className="space-y-6">
          {/* Avatar / Brand Photo */}
          {config.showPhoto && personalInfo.avatarUrl ? (
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg mx-auto">
              <img 
                src={personalInfo.avatarUrl} 
                alt={personalInfo.fullName} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-xl font-bold tracking-wider">
              {personalInfo.fullName.slice(0, 2).toUpperCase()}
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-2 text-[10px] text-white/90">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300 border-b border-white/20 pb-1">
              Contact
            </h3>
            {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.linkedinUrl && (
              <div className="break-all text-white/80 hover:text-white">
                {personalInfo.linkedinUrl.replace('https://', '')}
              </div>
            )}
            {personalInfo.portfolioUrl && (
              <div className="break-all text-amber-300 font-medium">
                {personalInfo.portfolioUrl.replace('https://', '')}
              </div>
            )}
          </div>

          {/* Skills Breakdown */}
          {skills.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300 border-b border-white/20 pb-1">
                Expertise
              </h3>
              {skills.map((cat) => (
                <div key={cat.id}>
                  <div className="text-[10px] font-semibold text-white/90 mb-1">{cat.name}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="bg-white/15 px-1.5 py-0.5 rounded text-[9px] text-white">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300 border-b border-white/20 pb-1">
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="text-[10px]">
                  <div className="font-bold text-white">{edu.degree}</div>
                  <div className="text-white/80">{edu.institution}</div>
                  <div className="text-white/60 text-[9px]">{edu.gradYear}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Languages */}
        {languages.length > 0 && (
          <div className="pt-4 border-t border-white/20 text-[9.5px]">
            <span className="font-bold text-amber-300">Languages: </span>
            {languages.map(l => `${l.language} (${l.proficiency})`).join(', ')}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
            {personalInfo.fullName || 'Candidate Full Name'}
          </h1>
          <p className="text-xs font-bold tracking-wider uppercase mt-0.5" style={{ color: accent }}>
            {personalInfo.targetRole || 'Creative Director'}
          </p>
        </div>

        {/* Bio */}
        {personalInfo.bioSummary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-200 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: accent }} />
              Executive Profile & Vision
            </h2>
            <p className="text-slate-600 text-justify leading-relaxed">
              {personalInfo.bioSummary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-200 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" style={{ color: accent }} />
              Career Track & Leadership
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: `${accent}60` }}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-[11.5px]">{exp.role}</h3>
                    <span className="text-[10px] font-mono-code text-slate-500">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[10.5px] font-medium text-slate-700 mb-1">
                    {exp.company} · <span className="text-slate-500">{exp.location}</span>
                  </div>
                  <ul className="list-disc list-outside ml-3.5 space-y-1 text-slate-600 text-[10.5px]">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlighted Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-200 mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" style={{ color: accent }} />
              Signature Projects & Case Studies
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-[11px] mb-0.5">{proj.title}</div>
                    <p className="text-[10px] text-slate-600 leading-snug">{proj.description}</p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200/60">
                    <div className="font-mono-code text-[9.5px] font-semibold text-emerald-700">
                      {proj.impactMetric}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-200 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" style={{ color: accent }} />
              Accreditations & Honors
            </h2>
            <div className="flex flex-wrap gap-2 text-[10px]">
              {certifications.map((c) => (
                <div key={c.id} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
                  <span className="font-semibold">{c.name}</span> · {c.issuer} ({c.issueDate})
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
