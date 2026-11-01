import React from 'react';
import { ResumeData, ResumeConfig } from '../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, CheckCircle } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  config: ResumeConfig;
}

export const ModernExecutive: React.FC<TemplateProps> = ({ data, config }) => {
  const { personalInfo, experiences, education, skills, certifications, projects, languages } = data;
  const accent = config.accentColor || '#0f172a';

  return (
    <div className="w-full bg-white text-slate-800 leading-normal text-[11px] p-8 shadow-sm print:shadow-none min-h-[1050px]">
      {/* Header Banner */}
      <div 
        className="rounded-xl p-6 text-white mb-6 relative overflow-hidden"
        style={{ backgroundColor: accent }}
      >
        <div className="flex items-start justify-between gap-6 relative z-10">
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
              {personalInfo.fullName || 'Candidate Name'}
            </h1>
            <p className="text-sm font-medium text-amber-300 mb-3 tracking-wide">
              {personalInfo.targetRole || 'Target Professional Role'}
            </p>
            
            {/* Contact details */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-slate-200">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-amber-400" />
                  <span>{personalInfo.email}</span>
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.linkedinUrl && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3 text-amber-400" />
                  <span>{personalInfo.linkedinUrl.replace('https://', '')}</span>
                </span>
              )}
              {personalInfo.githubUrl && (
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3 text-amber-400" />
                  <span>{personalInfo.githubUrl.replace('https://', '')}</span>
                </span>
              )}
              {personalInfo.portfolioUrl && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-amber-400" />
                  <span>{personalInfo.portfolioUrl.replace('https://', '')}</span>
                </span>
              )}
            </div>
          </div>

          {config.showPhoto && personalInfo.avatarUrl && (
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/30 shrink-0 shadow-md">
              <img 
                src={personalInfo.avatarUrl} 
                alt={personalInfo.fullName} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Primary Column (7 cols): Summary, Experience, Projects */}
        <div className="col-span-8 space-y-5">
          {/* Executive Summary */}
          {personalInfo.bioSummary && (
            <section>
              <h2 
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b flex items-center justify-between"
                style={{ borderColor: `${accent}40`, color: accent }}
              >
                Executive Summary
              </h2>
              <p className="text-slate-600 text-justify leading-relaxed">
                {personalInfo.bioSummary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {experiences.length > 0 && (
            <section>
              <h2 
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b"
                style={{ borderColor: `${accent}40`, color: accent }}
              >
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-bold text-slate-900 text-[12px]">{exp.role}</h3>
                      <span className="text-[10px] font-medium text-slate-500 font-mono-code">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10.5px] text-slate-600 mb-1.5 font-medium">
                      <span style={{ color: accent }} className="font-semibold">{exp.company}</span>
                      <span>·</span>
                      <span>{exp.location}</span>
                      <span>·</span>
                      <span className="text-slate-400">{exp.employmentType}</span>
                    </div>

                    <ul className="list-disc list-outside ml-4 space-y-1 text-slate-600">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="leading-snug">{ach}</li>
                      ))}
                    </ul>

                    {exp.techStack.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1 items-center text-[9.5px]">
                        <span className="text-slate-400 font-medium">Technologies:</span>
                        {exp.techStack.map((tech, i) => (
                          <span 
                            key={i} 
                            className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[9px] font-mono-code"
                          >
                            {tech}
                          </span>
                        ))}
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
              <h2 
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
                style={{ borderColor: `${accent}40`, color: accent }}
              >
                Featured Engineering & Venture Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-slate-900">{proj.title}</h3>
                        {proj.liveUrl && (
                          <a 
                            href={proj.liveUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-amber-600 hover:underline text-[9.5px]"
                          >
                            [Live]
                          </a>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">{proj.role}</span>
                    </div>
                    <p className="text-slate-600 text-[10px] my-1 leading-snug">{proj.description}</p>
                    <div className="flex items-center justify-between text-[9.5px]">
                      <span className="text-emerald-700 font-medium font-mono-code">{proj.impactMetric}</span>
                      <div className="flex gap-1">
                        {proj.technologies.slice(0, 4).map((t, idx) => (
                          <span key={idx} className="bg-white border border-slate-200 text-slate-600 px-1 rounded text-[8.5px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar Column (4 cols): Skills, Education, Certifications, Languages */}
        <div className="col-span-4 space-y-5">
          {/* Core Competencies & Skills */}
          {skills.length > 0 && (
            <section>
              <h2 
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
                style={{ borderColor: `${accent}40`, color: accent }}
              >
                Core Competencies
              </h2>
              <div className="space-y-2.5">
                {skills.map((cat) => (
                  <div key={cat.id}>
                    <h4 className="text-[10px] font-semibold text-slate-700 mb-1">{cat.name}</h4>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[9.5px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
                style={{ borderColor: `${accent}40`, color: accent }}
              >
                Education
              </h2>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900 text-[10.5px]">{edu.degree}</div>
                    <div className="text-slate-700 font-medium text-[10px]" style={{ color: accent }}>
                      {edu.institution}
                    </div>
                    <div className="text-slate-500 text-[9.5px] font-mono-code">
                      {edu.fieldOfStudy} · {edu.gradYear}
                    </div>
                    {edu.gpa && (
                      <div className="text-slate-500 text-[9px]">GPA: {edu.gpa}</div>
                    )}
                    {edu.honors && (
                      <div className="text-amber-700 text-[9px] font-medium">{edu.honors}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
                style={{ borderColor: `${accent}40`, color: accent }}
              >
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-[10px]">
                    <div className="font-semibold text-slate-800 flex items-start gap-1">
                      <Award className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                      <span>{cert.name}</span>
                    </div>
                    <div className="text-slate-500 text-[9px] ml-4 font-mono-code">
                      {cert.issuer} · {cert.issueDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
                style={{ borderColor: `${accent}40`, color: accent }}
              >
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-center text-[10px]">
                    <span className="font-medium text-slate-700">{l.language}</span>
                    <span className="text-slate-500 text-[9px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
