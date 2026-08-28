import React from 'react';
import { dateRange } from '../shared';

export default function Professional({ resume }) {
  const p = resume.content.personal;
  const style = resume.style;
  const summary = resume.content.summary.summary;
  const experience = resume.content.experience;
  const education = resume.content.education;
  const skills = resume.content.skills;
  const languages = resume.content.languages;
  // Reference (use first achievement or custom)
  const refs = resume.content.custom?.references?.blocks || [];

  return (
    <div style={{ width: 794, minHeight: 1123, backgroundColor: '#fff', fontFamily: style.fontFamily, padding: style.margin, display: 'grid', gridTemplateColumns: '30% 70%', gap: 24 }}>
      {/* Left */}
      <div>
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', borderBottom: '2px solid #d1d5db', paddingBottom: 4, marginBottom: 8 }}>CONTACT</h3>
          <div style={{ fontSize: 10, color: '#4b5563' }}>
            <div>{p.phone}</div>
            <div>{p.email}</div>
            <div>{p.location}</div>
            <div>{p.website}</div>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', borderBottom: '2px solid #d1d5db', paddingBottom: 4, marginBottom: 8 }}>SKILLS</h3>
          <ul style={{ margin: 0, paddingLeft: 16, listStyleType: 'disc', fontSize: 10 }}>
            {skills.map(s => <li key={s.id}>{s.name}</li>)}
          </ul>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', borderBottom: '2px solid #d1d5db', paddingBottom: 4, marginBottom: 8 }}>LANGUAGES</h3>
          <ul style={{ margin: 0, paddingLeft: 16, listStyleType: 'disc', fontSize: 10 }}>
            {languages.map(l => <li key={l.id}>{l.name}</li>)}
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', borderBottom: '2px solid #d1d5db', paddingBottom: 4, marginBottom: 8 }}>REFERENCE</h3>
          {refs.length > 0 ? refs.map((ref, i) => (
            <div key={i} style={{ fontSize: 10, color: '#374151' }}>
              <div style={{ fontWeight: 600 }}>{ref.heading}</div>
              <div>{ref.subheading}</div>
              <div>{ref.body}</div>
            </div>
          )) : (
            <div style={{ fontSize: 10, color: '#374151' }}>
              <div style={{ fontWeight: 600 }}>Estelle Darcy</div>
              <div>Wardiere Inc. / CTO</div>
              <div>Phone: 123-456-7890</div>
              <div>Email: hello@reallygreatsite.com</div>
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div>
        {summary && (
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', borderBottom: '2px solid #d1d5db', paddingBottom: 4, marginBottom: 8 }}>PROFILE</h3>
            <p style={{ fontSize: 10.5, lineHeight: 1.6, color: '#374151' }}>{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', borderBottom: '2px solid #d1d5db', paddingBottom: 4, marginBottom: 8 }}>WORK EXPERIENCE</h3>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 10.5 }}>{exp.role}</div>
                <div style={{ fontSize: 10, color: '#4b5563' }}>{exp.company}</div>
                <ul style={{ margin: '2px 0 0', paddingLeft: 16, listStyleType: 'disc', fontSize: 10, color: '#374151' }}>
                  {[...exp.achievements, ...exp.responsibilities].map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', color: '#111827', borderBottom: '2px solid #d1d5db', paddingBottom: 4, marginBottom: 8 }}>EDUCATION</h3>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 6 }}>
                <div style={{ fontWeight: 600, fontSize: 10.5 }}>{edu.degree}</div>
                <div style={{ fontSize: 10, color: '#4b5563' }}>{edu.institution}</div>
                <div style={{ fontSize: 9.5, color: '#6b7280' }}>{edu.grade}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}