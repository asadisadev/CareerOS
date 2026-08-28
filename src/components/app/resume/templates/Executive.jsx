import React from "react";

export default function ExecutiveResume() {
  return (
    <div
      style={{
        width: 794,
        minHeight: 1123,
        backgroundColor: "#fff",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        display: "flex",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        margin: "0 auto",
      }}
    >
      {/* ===== LEFT SIDEBAR – DARK ===== */}
      <div
        style={{
          width: "30%",
          backgroundColor: "#1a2a3a",
          padding: "32px 22px",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* PHOTO / AVATAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              backgroundColor: "#3a4a5a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 300,
              color: "#a0b0c0",
              border: "3px solid #ffffff",
            }}
          >
            {/* Initials or user icon */}
            DW
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#ffffff",
              borderBottom: "2px solid rgba(255,255,255,0.25)",
              paddingBottom: 6,
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            CONTACT
          </h3>
          <div style={{ fontSize: 10.5, lineHeight: 1.7, color: "#e5e7eb" }}>
            <div>123-456-7890</div>
            <div>hello@reallygreatsite.com</div>
            <div>123 Anywhere St., Any City</div>
          </div>
        </div>

        {/* SKILLS */}
        <div>
          <h3
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#ffffff",
              borderBottom: "2px solid rgba(255,255,255,0.25)",
              paddingBottom: 6,
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            SKILLS
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: 16,
              listStyleType: "disc",
              fontSize: 10.5,
              color: "#e5e7eb",
              lineHeight: 1.8,
            }}
          >
            <li>Agenda management</li>
            <li>Email management</li>
            <li>Meeting organization</li>
            <li>Communication</li>
            <li>Problem solving</li>
          </ul>
        </div>

        {/* SOFTWARE */}
        <div>
          <h3
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#ffffff",
              borderBottom: "2px solid rgba(255,255,255,0.25)",
              paddingBottom: 6,
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            SOFTWARE
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: 16,
              listStyleType: "disc",
              fontSize: 10.5,
              color: "#e5e7eb",
              lineHeight: 1.8,
            }}
          >
            <li>Digital Toolbox</li>
            <li>Cloud Collaborator</li>
            <li>Task Orchestrator</li>
            <li>Virtual Gathering Spaces</li>
          </ul>
        </div>

        {/* LANGUAGES */}
        <div>
          <h3
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#ffffff",
              borderBottom: "2px solid rgba(255,255,255,0.25)",
              paddingBottom: 6,
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            LANGUAGES
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: 16,
              listStyleType: "disc",
              fontSize: 10.5,
              color: "#e5e7eb",
              lineHeight: 1.8,
            }}
          >
            <li>English – Native</li>
            <li>German – Advanced (C1)</li>
            <li>Spanish – Basic (A2)</li>
          </ul>
        </div>

        {/* REFERENCE */}
        <div style={{ marginTop: "auto" }}>
          <h3
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#ffffff",
              borderBottom: "2px solid rgba(255,255,255,0.25)",
              paddingBottom: 6,
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            REFERENCE
          </h3>
          <div style={{ fontSize: 10.5, lineHeight: 1.7, color: "#e5e7eb" }}>
            <div style={{ fontWeight: 600, color: "#ffffff" }}>
              Estelle Darcy
            </div>
            <div>Wardiere Inc. / CTO</div>
            <div>Phone: 123-456-7890</div>
            <div>Email: hello@reallygreatsite.com</div>
          </div>
        </div>
      </div>

      {/* ===== RIGHT CONTENT – WHITE ===== */}
      <div
        style={{
          width: "70%",
          padding: "32px 32px 32px 28px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* NAME & TITLE */}
        <div style={{ marginBottom: 4 }}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "#1a2a3a",
              lineHeight: 1.2,
            }}
          >
            DANIEL WOODLEY
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: "#4b5563",
              marginTop: 2,
            }}
          >
            EXECUTIVE ASSISTANT
          </div>
        </div>

        {/* PROFESSIONAL PROFILE */}
        <div>
          <h3
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#111827",
              borderBottom: "2px solid #d1d5db",
              paddingBottom: 4,
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            PROFESSIONAL PROFILE
          </h3>
          <p
            style={{
              fontSize: 10.5,
              lineHeight: 1.7,
              color: "#374151",
              margin: 0,
            }}
          >
            Executive assistant with strong organizational skills and attention to
            detail. Provides daily support to management in handling strategic and
            operational activities.
          </p>
        </div>

        {/* WORK EXPERIENCE */}
        <div>
          <h3
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#111827",
              borderBottom: "2px solid #d1d5db",
              paddingBottom: 4,
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            WORK EXPERIENCE
          </h3>

          {/* Exp 1 */}
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{ fontWeight: 600, fontSize: 10.5, color: "#111827" }}
              >
                Executive Assistant – Elliot&amp;Mater Insurance, Any City
              </span>
              <span
                style={{ fontSize: 9.5, color: "#6b7280", fontWeight: 400 }}
              >
                February 2020 – Present
              </span>
            </div>
            <ul
              style={{
                margin: "4px 0 0",
                paddingLeft: 16,
                listStyleType: "disc",
                fontSize: 10,
                color: "#374151",
                lineHeight: 1.7,
              }}
            >
              <li>Management of complex schedules and meetings</li>
              <li>Organization of travel and business trips</li>
              <li>Preparation of reports and presentations</li>
              <li>Coordination between departments</li>
            </ul>
          </div>

          {/* Exp 2 */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{ fontWeight: 600, fontSize: 10.5, color: "#111827" }}
              >
                Executive Assistant – Dynamic Network, Any City
              </span>
              <span
                style={{ fontSize: 9.5, color: "#6b7280", fontWeight: 400 }}
              >
                March 2018 – January 2020
              </span>
            </div>
            <ul
              style={{
                margin: "4px 0 0",
                paddingLeft: 16,
                listStyleType: "disc",
                fontSize: 10,
                color: "#374151",
                lineHeight: 1.7,
              }}
            >
              <li>Support to management and team</li>
              <li>Correspondence and document management</li>
              <li>Organization of corporate events</li>
            </ul>
          </div>
        </div>

        {/* TRAINING */}
        <div style={{ marginTop: "auto" }}>
          <h3
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#111827",
              borderBottom: "2px solid #d1d5db",
              paddingBottom: 4,
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            TRAINING
          </h3>
          <div style={{ marginBottom: 4 }}>
            <div style={{ fontWeight: 600, fontSize: 10.5, color: "#111827" }}>
              Master's Degree at University of Brookminster – 2017
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}