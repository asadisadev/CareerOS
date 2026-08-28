import React from 'react';
import { dateRange } from '../shared';

export default function Modern({ resume }) {
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
      <div style={{ display: 'grid', gridTemplateColumns: '35% 65%', gap: 16 }}>
        {/* Left sidebar */}
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>{p.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: 12, color: '#4b5563', fontWeight: 500, marginBottom: 12 }}>{p.title || 'Title'}</p>
          <div style={{ borderBottom: '2px solid #d1d5db', marginBottom: 12 }} />

          {summary && (
            <div style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', marginBottom: 4 }}>PROFILE INFO</h3>
              <p style={{ fontSize: 10, lineHeight: 1.5, color: '#374151' }}>{summary}</p>
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', marginBottom: 4 }}>EDUCATION</h3>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 600, fontSize: 10.5 }}>{edu.institution}</div>
                <div style={{ fontSize: 9.5, color: '#6b7280' }}>{dateRange(edu.startDate, edu.endDate, false, 'short')}</div>
                <div style={{ fontSize: 10 }}>{edu.degree}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', marginBottom: 4 }}>SKILLS</h3>
            <ul style={{ margin: 0, paddingLeft: 16, listStyleType: 'disc', fontSize: 10 }}>
              {skills.map(s => <li key={s.id}>{s.name}</li>)}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', marginBottom: 4 }}>LANGUAGES</h3>
            <ul style={{ margin: 0, paddingLeft: 16, listStyleType: 'disc', fontSize: 10 }}>
              {languages.map(l => <li key={l.id}>{l.name}</li>)}
            </ul>
          </div>
        </div>

        {/* Right main */}
        <div>
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', marginBottom: 4 }}>EXPERIENCE</h3>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 10.5 }}>{exp.role}</div>
                <div style={{ fontSize: 10, color: '#4b5563' }}>{exp.company}</div>
                <ul style={{ margin: '2px 0 0', paddingLeft: 16, listStyleType: 'disc', fontSize: 10, color: '#374151' }}>
                  {exp.achievements.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {achievements.length > 0 && (
            <div>
              <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', marginBottom: 4 }}>ACHIEVEMENT</h3>
              <ul style={{ margin: 0, paddingLeft: 16, listStyleType: 'disc', fontSize: 10 }}>
                {achievements.map(a => <li key={a.id}>{a.title}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}