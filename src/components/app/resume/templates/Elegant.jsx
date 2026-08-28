import React from "react";

/**
 * Elegant Resume Component – now styled exactly like the executive image.
 * Features a dark sidebar with avatar, contact, skills, languages, reference,
 * and a clean white right panel with profile, work experience, and education.
 *
 * @param {Object} props.data - Optional data to override defaults.
 * @returns {JSX.Element}
 */
const Elegant = ({ data = {} }) => {
  // Default resume data – matches the elegant description
  const defaultData = {
    contact: {
      phone: "+123-456-7890",
      email: "hello@reallygreatsite.com",
      address: "123 Anywhere St., Any City",
      website: "www.reallygreatsite.com",
    },
    skills: [
      "Project Management",
      "Public Relations",
      "Teamwork",
      "Time Management",
      "Leadership",
      "Effective Communication",
      "Critical Thinking",
      "Digital Marketing",
    ],
    languages: [
      { name: "English", level: "Fluent" },
      { name: "French", level: "Fluent" },
      { name: "German", level: "Basic" },
      { name: "Spanish", level: "Intermediate" },
    ],
    reference: {
      name: "Estelle Darcy",
      title: "Wardiere Inc. / CTO",
      phone: "123-456-7890",
      email: "hello@reallygreatsite.com",
    },
    profile: {
      name: "FRANCISCO ANDRADE",
      title: "CREATIVE HEAD",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing.",
    },
    experience: [
      {
        company: "Barcelle Studio",
        role: "Marketing Manager & Specialist",
        date: "2030 – PRESENT",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        company: "Fauget Studio",
        role: "Marketing Manager & Specialist",
        date: "2025 – 2029",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        company: "Studio Shodwe",
        role: "Marketing Manager & Specialist",
        date: "2024 – 2025",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
    education: [
      {
        degree: "Master of Business Management",
        school: "School of Business | Wardiere University",
        gpa: "GPA: 3.8 / 4.0",
        date: "2029 – 2031",
      },
      {
        degree: "Bachelor of Business Management",
        school: "School of Business | Wardiere University",
        gpa: "GPA: 3.8 / 4.0",
        date: "2025 – 2029",
      },
    ],
  };

  // Merge with provided data
  const resume = { ...defaultData, ...data };
  const { contact, skills, languages, reference, profile, experience, education } = resume;

  return (
    <div className="flex justify-center items-center min-h-screen font-sans">
      <div className="max-w-5xl w-full rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* ----- LEFT SIDEBAR – DARK ----- */}
        <div
          className="w-full md:w-[30%] p-6 md:p-8 flex flex-col gap-6"
          style={{ backgroundColor: "#1a2a3a" }}
        >
          {/* Avatar / Photo */}
          <div className="flex justify-center">
            <div
              className="w-28 h-28 rounded-full bg-gray-600 border-4 border-white flex items-center justify-center"
              style={{ backgroundColor: "#3a4a5a" }}
            >
              {/* User icon SVG (person) */}
              <svg
                viewBox="0 0 24 24"
                width="50"
                height="50"
                fill="#c0d0e0"
                style={{ marginTop: 4 }}
              >
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
              </svg>
            </div>
          </div>

          {/* CONTACT */}
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-500 pb-2 mb-3"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              CONTACT
            </h2>
            <div className="space-y-1 text-sm text-gray-300">
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
              <p>{contact.address}</p>
              <p>{contact.website}</p>
            </div>
          </section>

          {/* SKILLS */}
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-500 pb-2 mb-3"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              SKILLS
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-0.5">
              {skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </section>

          {/* LANGUAGES */}
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-500 pb-2 mb-3"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              LANGUAGES
            </h2>
            <ul className="text-sm text-gray-300 space-y-0.5">
              {languages.map((lang, idx) => (
                <li key={idx}>
                  {lang.name} <span className="text-gray-400">({lang.level})</span>
                </li>
              ))}
            </ul>
          </section>

          {/* REFERENCE */}
          <section>
            <h2
              className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-500 pb-2 mb-3"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              REFERENCE
            </h2>
            <div className="text-sm text-gray-300 space-y-1">
              <p className="font-semibold text-white">{reference.name}</p>
              <p>{reference.title}</p>
              <p>Phone: {reference.phone}</p>
              <p>Email: {reference.email}</p>
            </div>
          </section>
        </div>

        {/* ----- RIGHT CONTENT – WHITE ----- */}
        <div className="w-full md:w-[70%] p-6 md:p-8 space-y-6 bg-white">
          {/* Name & Title */}
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              {profile.name}
            </h1>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 mt-1">
              {profile.title}
            </p>
          </div>

          {/* PROFILE */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b-2 border-indigo-400 pb-2 mb-3">
              PROFILE
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{profile.summary}</p>
          </section>

          {/* WORK EXPERIENCE */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b-2 border-indigo-400 pb-2 mb-3">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-800">
                      {exp.company} <span className="font-normal text-gray-600">– {exp.role}</span>
                    </h3>
                    <span className="text-xs text-gray-500 font-medium">{exp.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b-2 border-indigo-400 pb-2 mb-3">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <span className="text-xs text-gray-500 font-medium">{edu.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.gpa}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Elegant;