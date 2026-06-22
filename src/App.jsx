import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

const SKILLS = {
  Frontend: ["HTML", "CSS", "JavaScript", "React.js"],
  Backend: ["PHP", "Python", "Java", "ABAP"],
  Mobile: ["C#", "JavaScript"],
  Database: ["MySQL"],
};

const PROJECTS = [
  {
    title: "APtech: Apartment Management System",
    desc: "Developed a full-stack web-based Apartment Management System for Hilario Apartments using React, TypeScript, HTML, CSS, PHP, and MySQL, implementing tenant management, apartment management, authentication, image uploads, and CRUD functionality.",
    tags: ["React", "TypeScript", "PHP", "MySQL"],
    icon: "🏠",
  },
  {
    title: "Coffee Ordering System",
    desc: "Mobile app that lets users browse the menu, place orders, and pay for coffee end to end.",
    tags: ["Mobile", "JavaScript"],
    icon: "☕",
  },
  {
    title: "Weather Application",
    desc: "Live weather dashboard displaying global conditions including temperature, wind speed, and forecasts.",
    tags: ["Web", "API", "JavaScript"],
    icon: "🌤️",
  },
  {
    title: "2D Mario-style Game",
    desc: "Side-scrolling platformer built in Unity with character movement, collision, and a scoring system.",
    tags: ["Unity", "C#", "Game Dev"],
    icon: "🎮",
  },
  {
    title: "Calculator Application",
    desc: "Functional calculator supporting all basic arithmetic operations with a clean responsive UI.",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: "🧮",
  },
  {
    title: "Delivery Report Audit (ABAP)",
    desc: "SAP ABAP List View report for auditing delivery documents from source records at Accenture.",
    tags: ["SAP", "ABAP", "ERP"],
    icon: "📊",
  },
];

const EXPERIENCE = [
  {
    role: "SAP ABAP Intern",
    company: "Accenture",
    period: "December 2025 – March 2026",
    points: [
      "Developed a Delivery Report Audit View from source documents using ABAP List View",
      "Learned Data Processing, OOP, and Methods in ABAP development",
    ],
  },
];

const CERTS = [
  {
    name: "Salesforce Supported Virtual Internship Program",
    org: "Salesforce",
    year: "2025",
  },
  {
    name: "Introduction to Cybersecurity",
    org: "CISCO Networking Academy",
    year: "Sep 2025",
  },
  {
    name: "SAP ABAP Internship Certificate",
    org: "Accenture",
    year: "Mar 2026",
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observers = {};
    NAV_LINKS.forEach((sec) => {
      const el = sectionRefs.current[sec];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sec);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers[sec] = obs;
    });
    return () => Object.values(observers).forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const obsAnim = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((prev) => ({
              ...prev,
              [e.target.dataset.animId]: true,
            }));
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll("[data-anim-id]")
      .forEach((el) => obsAnim.observe(el));
    return () => obsAnim.disconnect();
  }, []);

  const scrollTo = (section) => {
    sectionRefs.current[section]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const anim = (id, delay = 0) => ({
    "data-anim-id": id,
    style: {
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    },
  });

  const newLocal = "subject";
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <span className="logo">
            Ken<span className="orange">rae</span>
          </span>
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <span
                key={l}
                className={`nav-link ${activeSection === l ? "active" : ""}`}
                onClick={() => scrollTo(l)}
              >
                {l}
              </span>
            ))}
          </div>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {NAV_LINKS.map((l) => (
              <span
                key={l}
                className={`nav-link ${activeSection === l ? "active" : ""}`}
                onClick={() => scrollTo(l)}
              >
                {l}
              </span>
            ))}
          </div>
        )}
      </nav>

      <section
        className="hero"
        ref={(el) => (sectionRefs.current["Home"] = el)}
      >
        <div className="container hero-grid">
          <div className="hero-text">
            <p className="eyebrow">Hello, I'm</p>
            <h1 className="hero-name">
              Kenrae
              <br />
              <span className="orange">Peroche</span>
            </h1>
            <h2 className="hero-role">Full-Stack Developer & IT Graduate</h2>
            <p className="hero-desc">
              BS Information Technology graduate from Bulacan State University with practical experience in full-stack web development, mobile application development. Proficient in React, JavaScript, TypeScript, PHP, MySQL, HTML, and CSS, with the ability to design and develop complete web applications from frontend interfaces to backend systems. Passionate about continuous learning, writing clean code, and building software that delivers real-world value.
            </p>
            <div className="hero-btns">
              <button
                className="btn-primary"
                onClick={() => scrollTo("Projects")}
              >
                View Projects
              </button>
              <button className="btn-ghost" onClick={() => scrollTo("Contact")}>
                Contact Me
              </button>
            </div>
            <div className="socials">
              <a
                href="https://www.linkedin.com/in/kenrae-peroche-b595a136b"
                className="social-icon"
                target="_blank"
                rel="noreferrer"
              >
                in
              </a>
              <a
                href="https://github.com/kenrae12"
                className="social-icon"
                target="_blank"
                rel="noreferrer"
              >
                gh
              </a>
              <a href="mailto:kenperoche@gmail.com" className="social-icon">
                @
              </a>
            </div>
          </div>
          <div className="hero-card-col">
            <div className="hero-avatar">
              <img
                src="/kenrae-picture.png"
                alt="Kenrae Peroche"
                className="avatar-img"
              />
              <div className="available-badge">Available for Work</div>
            </div>
            <div className="hero-stats">
              {[
                ["5+", "Projects"],
                ["1", "Internship"],
                ["10+", "Skills"],
              ].map(([num, label]) => (
                <div key={label} className="stat-card">
                  <span className="stat-num">{num}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="section bg-dark"
        ref={(el) => (sectionRefs.current["About"] = el)}
      >
        <div className="container">
          <div {...anim("about-title")}>
            <p className="eyebrow">Who I Am</p>
            <h2 className="section-title">About Me</h2>
            <div className="divider" />
          </div>
          <div className="about-grid">
            <div {...anim("about-text", 0.1)} className="about-text">
              <p className="body-text">
                I'm a fresh IT graduate from Bulacan State University with a
                strong foundation in both frontend and backend development. My
                journey includes an internship at Accenture where I worked on
                SAP ABAP, alongside several academic and personal projects
                spanning web, mobile, and game development.
              </p>
              <p className="body-text">
                I love turning ideas into working products — whether it's a
                clean web interface, a mobile app, or an ERP report. I'm eager
                to grow in a team environment and contribute to meaningful
                software.
              </p>
              <div className="info-grid">
                {[
                  ["Name", "Kenrae Peroche"],
                  ["Email", "kenperoche@gmail.com"],
                  ["Phone", "+63 966 325 3842"],
                  ["Location", "Plaridel, Bulacan"],
                  ["Degree", "BS Information Technology"],
                  ["School", "Bulacan State University"],
                ].map(([k, v]) => (
                  <div key={k} className="info-item">
                    <p className="info-label">{k}</p>
                    <p className="info-value">{v}</p>
                  </div>
                ))}
              </div>
            </div>
            <div {...anim("about-certs", 0.2)} className="certs-col">
              <h3 className="col-heading">Certifications</h3>
              {CERTS.map((c, i) => (
                <div key={i} className="cert-item">
                  <div className="cert-dot" />
                  <div>
                    <p className="cert-name">{c.name}</p>
                    <p className="cert-org">
                      {c.org} · {c.year}
                    </p>
                  </div>
                </div>
              ))}
              <a
                href="/kenrae-cv.pdf"
                download
                className="btn-primary"
                style={{
                  marginTop: "24px",
                  fontSize: "13px",
                  padding: "10px 20px",
                  display: "inline-block",
                }}
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section bg-main"
        ref={(el) => (sectionRefs.current["Skills"] = el)}
      >
        <div className="container">
          <div {...anim("skills-title")}>
            <p className="eyebrow">What I Know</p>
            <h2 className="section-title">Skills</h2>
            <div className="divider" />
          </div>
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([cat, techs], ci) => (
              <div
                key={cat}
                {...anim(`skill-${ci}`, ci * 0.1)}
                className="card"
              >
                <p className="card-eyebrow">{cat}</p>
                {techs.map((t) => (
                  <div key={t} className="skill-row">
                    <span className="skill-name">{t}</span>
                    <div className="skill-bar-bg">
                      <div className="skill-bar-fill" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div {...anim("langs", 0.3)} className="languages-row">
            <span className="lang-label">Languages:</span>
            {["English", "Tagalog"].map((l) => (
              <span key={l} className="lang-tag">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section bg-dark"
        ref={(el) => (sectionRefs.current["Projects"] = el)}
      >
        <div className="container">
          <div {...anim("proj-title")}>
            <p className="eyebrow">What I've Built</p>
            <h2 className="section-title">Projects</h2>
            <div className="divider" />
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                {...anim(`proj-${i}`, (i % 3) * 0.1)}
                className="card project-card"
              >
                <div className="project-icon">{p.icon}</div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section bg-main"
        ref={(el) => (sectionRefs.current["Experience"] = el)}
      >
        <div className="container">
          <div {...anim("exp-title")}>
            <p className="eyebrow">My Background</p>
            <h2 className="section-title">Experience</h2>
            <div className="divider" />
          </div>
          <div className="timeline">
            {EXPERIENCE.map((e, i) => (
              <div key={i} {...anim(`exp-${i}`, 0.1)} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot" />
                  <div className="timeline-line" />
                </div>
                <div className="timeline-content">
                  <p className="tl-period">{e.period}</p>
                  <h3 className="tl-role">{e.role}</h3>
                  <p className="tl-company">{e.company}</p>
                  <ul className="tl-points">
                    {e.points.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <div {...anim("edu", 0.2)} className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-dot" />
              </div>
              <div className="timeline-content">
                <p className="tl-period">2022 – 2026</p>
                <h3 className="tl-role">BS Information Technology</h3>
                <p className="tl-company">Bulacan State University</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section bg-dark"
        ref={(el) => (sectionRefs.current["Contact"] = el)}
      >
        <div className="container">
          <div {...anim("contact-title")}>
            <p className="eyebrow">Get In Touch</p>
            <h2 className="section-title">Contact Me</h2>
            <div className="divider" />
          </div>
          <div className="contact-grid">
            <div {...anim("contact-info", 0.1)} className="contact-info">
              <p className="body-text">
                Currently open to new opportunities. Whether it's a full-time
                role, freelance project, or just a conversation — feel free to
                reach out.
              </p>
              {[
                ["Email", "kenperoche@gmail.com"],
                ["Phone", "+63 966 325 3842"],
                ["Location", "Plaridel, Bulacan PH"],
              ].map(([label, val]) => (
                <div key={label} className="info-item">
                  <p className="info-label">{label}</p>
                  <p className="info-value">{val}</p>
                </div>
              ))}
            </div>
            <form
              {...anim("contact-form", 0.2)}
              className="contact-form"
              action="https://formspree.io/f/mbdvrvvw"
              method="POST"
            >
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="form-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="form-input"
                />
              </div>
              <input
                type="text"
                name={newLocal}
                placeholder="Subject"
                className="form-input"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                className="form-textarea form-input"
              />
              <button className="btn-primary" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>
          © 2026 <span className="orange">Kenrae Peroche</span>. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
