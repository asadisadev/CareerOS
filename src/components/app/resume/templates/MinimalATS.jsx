import React from 'react';
import { dateRange } from '../shared';

export default function MinimalATS({ resume }) {
  const p = resume.content.personal;
  const style = resume.style;
  const summary = resume.content.summary.summary;
  const experience = resume.content.experience;
  const education = resume.content.education;
  const skills = resume.content.skills;
  const languages = resume.content.languages;
  const achievements = resume.content.achievements;

  return (
    <div style={{ width: 794, minHeight: 1123, backgroundColor: '#fff', fontFamily: style.fontFamily, padding: style.margin }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{p.fullName || 'Your Name'}</h1>
      <p style={{ fontSize: 14, color: '#4b5563', marginBottom: 12 }}>{p.title || 'Professional Title'}</p>
      <div style={{ borderBottom: '2px solid #d1d5db', paddingBottom: 8, marginBottom: 12 }} />

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', marginBottom: 6 }}>ABOUT ME</h2>
          <p style={{ fontSize: 10.5, lineHeight: 1.6, color: '#374151' }}>{summary}</p>
        </div>
      )}

      {/* Area of Expertise (Skills) as table */}
      {skills.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', marginBottom: 6 }}>AREA OF EXPERTISE</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 10 }}>
            {skills.map(s => <div key={s.id} style={{ border: '1px solid #e5e7eb', padding: 8, textAlign: 'center' }}>{s.name}</div>)}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', marginBottom: 6 }}>PROFESSIONAL EXPERIENCE</h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: 11, color: '#111827' }}>{exp.role}</strong>
                <span style={{ fontSize: 9.5, color: '#6b7280' }}>{exp.company}</span>
              </div>
              <ul style={{ margin: '4px 0 0', paddingLeft: 16, listStyleType: 'disc', fontSize: 10, color: '#374151' }}>
                {[...exp.achievements, ...exp.responsibilities].map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', marginBottom: 6 }}>EDUCATION</h2>
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 11, color: '#111827' }}>{edu.institution}</div>
              <div style={{ fontSize: 10, color: '#4b5563' }}>{edu.degree}</div>
            </div>
          ))}
        </div>
      )}

      {/* Additional Information */}
      <div>
        <h2 style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', marginBottom: 6 }}>ADDITIONAL INFORMATION</h2>
        {languages.length > 0 && <div style={{ fontSize: 10, color: '#374151' }}><strong>Languages:</strong> {languages.map(l => l.name).join(', ')}</div>}
        {achievements.length > 0 && <div style={{ fontSize: 10, color: '#374151' }}><strong>Awards/Activities:</strong> {achievements.map(a => a.title).join(', ')}</div>}
      </div>
    </div>
  );
}