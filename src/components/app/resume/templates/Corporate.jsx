import React from 'react';
import { dateRange } from '../shared';

export default function Corporate({ resume }) {
  const p = resume.content.personal;
  const style = resume.style;
  const educations = resume.content.education;
  const skills = resume.content.skills;
  const languages = resume.content.languages;
  const summary = resume.content.summary.summary;
  const experiences = resume.content.experience;
  // References (custom section)
  const refs = resume.content.custom?.references?.blocks || [];

  return (
    <div style={{ width: 794, minHeight: 1123, backgroundColor: '#fff', fontFamily: style.fontFamily, padding: style.margin }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #d1d5db', paddingBottom: 12, marginBottom: 16 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', marginBottom: 2 }}>
          {p.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: 13, color: '#4b5563', fontWeight: 500, marginBottom: 6 }}>
          {p.title || 'Professional Title'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 16px', fontSize: 10.5, color: '#4b5563' }}>
          {p.location && <span>{p.location}</span>}
          {p.location && p.email && <span style={{ color: '#d1d5db' }}>|</span>}
          {p.email && <span>{p.email}</span>}
          {p.email && p.website && <span style={{ color: '#d1d5db' }}>|</span>}
          {p.website && <span>{p.website}</span>}
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '34% 66%', gap: 0 }}>
        {/* Left Column - Dark */}
        <div style={{ backgroundColor: '#1a2a3a', color: '#fff', padding: '20px 24px' }}>
          {/* Education */}
          {educations.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 6, marginBottom: 8 }}>
                EDUCATION
              </h3>
              {educations.map(edu => (
                <div key={edu.id} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 10.5, color: '#fff' }}>{edu.institution}</div>
                  <div style={{ fontSize: 9.5, color: '#cbd5e1' }}>{dateRange(edu.startDate, edu.endDate, false, 'short')}</div>
                  <div style={{ fontSize: 10, color: '#e5e7eb' }}>{edu.degree}</div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 6, marginBottom: 8 }}>
                SKILLS
              </h3>
              <ul style={{ margin: 0, paddingLeft: 16, listStyleType: 'disc', fontSize: 10, color: '#e5e7eb' }}>
                {skills.map(s => <li key={s.id}>{s.name}</li>)}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 6, marginBottom: 8 }}>
                LANGUAGE
              </h3>
              <ul style={{ margin: 0, paddingLeft: 16, listStyleType: 'disc', fontSize: 10, color: '#e5e7eb' }}>
                {languages.map(l => <li key={l.id}>{l.name}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column - White */}
        <div style={{ backgroundColor: '#fff', padding: '20px 24px' }}>
          {/* Summary */}
          {summary && (
            <div style={{ marginBottom: 14 }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '2px solid #d1d5db', paddingBottom: 4, marginBottom: 8 }}>
                SUMMARY
              </h3>
              <p style={{ fontSize: 10.5, lineHeight: 1.6, color: '#374151' }}>{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '2px solid #d1d5db', paddingBottom: 4, marginBottom: 8 }}>
                EXPERIENCE
              </h3>
              {experiences.map(exp => (
                <div key={exp.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: 11, textTransform: 'uppercase', color: '#111827' }}>{exp.role}</strong>
                    <span style={{ fontSize: 9.5, color: '#6b7280' }}>{dateRange(exp.startDate, exp.endDate, exp.current, 'short')}</span>
                  </div>
                  {exp.company && <div style={{ fontSize: 10.5, color: '#4b5563', fontWeight: 500, marginBottom: 2 }}>{exp.company}</div>}
                  <ul style={{ margin: '2px 0 0', paddingLeft: 16, listStyleType: 'disc', fontSize: 10, color: '#374151' }}>
                    {[...exp.achievements, ...exp.responsibilities].map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* References */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '2px solid #d1d5db', paddingBottom: 4, marginBottom: 8 }}>
              REFERENCES
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 10 }}>
              {refs.length > 0 ? refs.map((ref, idx) => (
                <div key={ref.id || idx}>
                  <div style={{ fontWeight: 600, color: '#111827' }}>{ref.heading}</div>
                  <div style={{ color: '#4b5563' }}>{ref.subheading}</div>
                  {ref.body && ref.body.split('\n').map((line, i) => (
                    <div key={i} style={{ color: '#6b7280', fontSize: 9.5 }}>{line}</div>
                  ))}
                </div>
              )) : (
                <>
                  <div>
                    <div style={{ fontWeight: 600, color: '#111827' }}>HARUMI KOBAYASHI</div>
                    <div style={{ color: '#4b5563' }}>Wardlere Inc. / CEO</div>
                    <div style={{ color: '#6b7280', fontSize: 9.5 }}>Phone: 123-456-7890</div>
                    <div style={{ color: '#6b7280', fontSize: 9.5 }}>Email: hello@reallygreatsite.com</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#111827' }}>BAILEY DUPONT</div>
                    <div style={{ color: '#4b5563' }}>Wardlere Inc. / CEO</div>
                    <div style={{ color: '#6b7280', fontSize: 9.5 }}>Phone: 123-456-7890</div>
                    <div style={{ color: '#6b7280', fontSize: 9.5 }}>Email: hello@reallygreatsite.com</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}