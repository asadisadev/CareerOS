// import { Resume, emptyPersonal, defaultSections, defaultStyle, uid, emptyContent } from './resume';

// // Developer resume
// export const MOCK_RESUME_DEVELOPER: Resume = {
//   id: 'dev_resume',
//   name: 'Developer Resume',
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
//   sections: defaultSections(),
//   style: { ...defaultStyle(), templateId: 'developer', accent: '#0ea5e9', sectionStyle: 'bar' },
//   versions: [],
//   share: { visibility: 'private', url: '' },
//   content: {
//     ...emptyContent(),
//     personal: {
//       ...emptyPersonal(),
//       fullName: 'Alex Rivera',
//       title: 'Senior Full Stack Engineer',
//       email: 'alex@example.com',
//       phone: '+1 (555) 123-4567',
//       location: 'Austin, TX',
//       linkedin: 'linkedin.com/in/alexrivera',
//       github: 'github.com/alexrivera',
//     },
//     summary: {
//       summary: 'Full stack engineer with 8 years of experience building scalable web applications. Specializing in React, Node.js, and cloud architecture.',
//       objective: 'Seeking a lead engineering role where I can drive technical strategy and mentor junior developers.',
//     },
//     experience: [
//       {
//         id: uid(),
//         role: 'Lead Full Stack Engineer',
//         company: 'TechVentures Inc.',
//         location: 'Austin, TX',
//         employmentType: 'Full-time',
//         startDate: '2022-01',
//         endDate: '',
//         current: true,
//         description: 'Leading a team of 8 engineers on a microservices platform handling 2M+ daily requests.',
//         responsibilities: ['Architected the migration from monolith to microservices', 'Implemented CI/CD pipelines with GitHub Actions'],
//         achievements: ['Reduced average response time by 40%', 'Led the adoption of TypeScript across 4 teams'],
//       },
//       // more experience...
//     ],
//     skills: [
//       { id: uid(), name: 'TypeScript', category: 'Technical Skills', level: 5 },
//       { id: uid(), name: 'React', category: 'Frameworks', level: 5 },
//       { id: uid(), name: 'Node.js', category: 'Frameworks', level: 4 },
//       { id: uid(), name: 'AWS', category: 'Cloud', level: 4 },
//       { id: uid(), name: 'Docker', category: 'Tools', level: 4 },
//     ],
//     education: [
//       {
//         id: uid(),
//         degree: 'B.S. Computer Science',
//         institution: 'University of Texas',
//         location: 'Austin, TX',
//         startDate: '2012-09',
//         endDate: '2016-06',
//         grade: '3.9 GPA',
//         description: 'Focus on distributed systems and algorithms.',
//         coursework: ['Distributed Systems', 'Algorithms', 'Machine Learning'],
//       },
//     ],
//     projects: [],
//     certifications: [],
//     achievements: [],
//     languages: [],
//     volunteer: [],
//     publications: [],
//     awards: [],
//     custom: {},
//   },
// };

// // Designer resume
// export const MOCK_RESUME_DESIGNER: Resume = {
//   // similar structure but different content, with creative style
//   // ... (we'll provide a full version in the final code)
// };

// // Manager resume
// export const MOCK_RESUME_MANAGER: Resume = {
//   // ...
// };

// // Executive resume
// export const MOCK_RESUME_EXECUTIVE: Resume = {
//   // ...
// };

// // Academic resume
// export const MOCK_RESUME_ACADEMIC: Resume = {
//   // ...
// };