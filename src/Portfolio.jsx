import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, Phone, ExternalLink, Download, Send, FileDown, Code2, GraduationCap, Briefcase } from "lucide-react";

// ==== CONFIGURABLE DATA (edit these) ====
const PROFILE = {
  name: "Sumit Bothgi",
  title: "Full Stack Java Developer",
  subtitle: "React • Spring Boot • SQL",
  email: "sumitbothgi147@gmail.com",
  phone: "+91 7618790968",
  location: "Pune, Maharashtra, India",
  social: {
    github: "https://github.com/sumitbothgi",
    linkedin: "https://www.linkedin.com/in/sumit-bothgi",
  },
  // Put your hosted PDF link or keep it local and serve from /public
  resumeUrl: "C:\Users\DELL\Desktop\Sumit_Portfolio\sumit-portfolio\public\SUMIT_BOTHGI_RESUME.pdf", // e.g., "/Sumit_Bothgi_Resume.pdf"
};

const ABOUT = {
  intro:
    "I’m a passionate Full Stack Java Developer with a B.SC(CS) in Computer Science from Savitribai Phule Pune University. I enjoy building robust backends with Spring Boot and crafting smooth, responsive UIs with React. I’m analytical, detail‑oriented, and a quick learner who loves solving real‑world problems.",
  highlights: [
    "B.Sc (Computer Science) — Savitribai Phule Pune University",
    "Java • Spring Boot • Hibernate • SQL • PostgreSQL",
    "Frontend: React, HTML, CSS, JavaScript, Tailwind",
    "Tools: Git, Maven, Eclipse, VS Code",
  ],
  timeline: [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "BCS — Computer Science",
      org: "SPPU, Pune",
      period: "2021 – 2024",
      details: "Foundations in CS, OOP, DBMS, and web development.",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Internship (Developer)",
      org: "Winners IT Solutions",
      period: "2024",
      details: "Hands‑on with Java projects and web apps; team collaboration.",
    },
  ],
};

const SKILLS = [
    // Fronted skills 
  { name: "HTML", level: 95, area: "Frontend" },
  { name: "CSS", level: 90, area: "Frontend" },
  { name: "TailwindCSS", level: 80, area: "Frontend" },
  { name: "JavaScript", level: 85, area: "Frontend" },
  { name: "React", level: 80, area: "Frontend" },
  
//   Bakend skills 
  { name: "Java", level: 90, area: "Backend" },
  { name: "Spring Boot", level: 80, area: "Backend" },
  { name: "Hibernate", level: 85, area: "Backend" },
  { name: "PHP", level: 80, area: "Backend" },
  { name: "Laravel", level: 75, area: "Backend" },

//   DataBase skills
  { name: "SQL", level: 85, area: "Database" },
  { name: "PostgreSQL", level: 80, area: "Database" },
  { name: "MySQL", level: 80, area: "Database" },
  { name: "PhpMyAdmin", level: 80, area: "Database" },


  { name: "Git", level: 85, area: "Tools" },
  { name: "Maven", level: 80, area: "Tools" },
  { name: "Eclipse", level: 75, area: "Tools" },
  { name: "VS Code", level: 85, area: "Tools" },
];

const PROJECTS = [
  {
    title: "Jewelry Management System",
    description:
      "Core Java OOP‑based desktop app for managing stock, customers, billing, and payments. Focus on encapsulation, inheritance, polymorphism, and abstraction.",
    stack: ["Java", "OOP", "MySQL"],
    image: "data:image/jpeg;base64,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",
    github: "https://github.com/sumitbothgi/Jwellery_Store_Project/tree/main",
    demo: "#",
  },
  {
    title: "Online Examination System",
    description:
      "Web app with JSP/Servlets and PostgreSQL for creating exams, managing questions, and tracking results. Authentication, sessions, and admin dashboard.",
    stack: ["JSP", "Servlet", "PostgreSQL"],
    image: "https://learningspiral.co.in/wp-content/uploads/2018/12/Online-Examination-System.jpg",
    github: "https://github.com/sumitbothgi/Online-Examination-System",
    demo: "#",
  },
  {
    title: "E‑commerce Website (In Progress)",
    description:
      "Modern e‑commerce stack with React frontend, Spring Boot APIs, and SQL database. Product catalog, cart, and order flow.",
    stack: ["React", "Spring Boot", "SQL"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=60&auto=format&fit=crop",
    github: "https://github.com/sumitbothgi",
    demo: "#",
  },
];

// ===== Reusable components =====
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${className}`}> {children} </section>
);

const Container = ({ children }) => (
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border shadow-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur ${className}`}>{children}</div>
);

const PrimaryButton = ({ children, href, onClick, icon }) => (
  <a
    href={href}
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold shadow-sm hover:shadow transition"
  >
    {icon}
    {children}
  </a>
);

// ===== Main Component =====
export default function Portfolio() {
  const [open, setOpen] = useState(false);
  const nav = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  const groupedSkills = useMemo(() => {
    const groups = {};
    SKILLS.forEach((s) => {
      groups[s.area] = groups[s.area] || [];
      groups[s.area].push(s);
    });
    return groups;
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    // TODO: integrate EmailJS or your backend. For now, open mail client.
    window.location.href = `mailto:${PROFILE.email}?subject=Portfolio%20Contact%20from%20${encodeURIComponent(
      payload.name || "Visitor"
    )}&body=${encodeURIComponent(`${payload.message}\n\nFrom: ${payload.name} (${payload.email})`)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 text-zinc-800 dark:from-zinc-900 dark:to-black dark:text-zinc-100">
      {/* ===== NAVBAR ===== */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border-b">
        <Container>
          <div className="flex items-center justify-between py-4">
            <a href="#home" className="flex items-center gap-2 font-bold text-lg md:text-xl">
              <div className="grid h-9 w-9 place-items-center rounded-2xl border shadow">
                SB
              </div>
              <span> {PROFILE.name} </span>
            </a>
            <nav className="hidden md:flex items-center gap-1">
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} className="rounded-xl px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  {n.label}
                </a>
              ))}
            </nav>
            <button className="md:hidden grid place-items-center rounded-xl border p-2" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {open && (
            <div className="md:hidden pb-4">
              <div className="grid gap-2">
                {nav.map((n) => (
                  <a key={n.id} href={`#${n.id}`} className="rounded-xl px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => setOpen(false)}>
                    {n.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </Container>
      </header>

      {/* ===== HERO ===== */}
      <Section id="home" className="pt-8">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-3xl font-extrabold md:text-5xl">
                Hi, I’m {PROFILE.name} <span className="inline-block">👋</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl font-medium">{PROFILE.title}</p>
              <p className="text-zinc-600 dark:text-zinc-400">{PROFILE.subtitle}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <PrimaryButton href="#contact" icon={<Send className="h-4 w-4" />}>Hire Me</PrimaryButton>
                <PrimaryButton href={PROFILE.resumeUrl} icon={<Download className="h-4 w-4" />}>Download Resume</PrimaryButton>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <a href={PROFILE.social.linkedin} className="rounded-xl border p-2" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={PROFILE.social.github} className="rounded-xl border p-2" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
                <a href={`mailto:${PROFILE.email}`} className="rounded-xl border p-2" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
                <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="rounded-xl border p-2" aria-label="Phone">
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="mx-auto">
              {/* Avatar Card */}
              <Card className="mx-auto w-full max-w-sm overflow-hidden">
                <div className="relative aspect-square w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-fuchsia-200 to-amber-200 dark:from-indigo-500/40 dark:via-fuchsia-500/30 dark:to-amber-400/20" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid h-44 w-44 place-items-center rounded-full border-4 border-white/80 shadow-xl text-4xl font-black bg-white/70 dark:bg-zinc-900/70">
                      SB
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">Full‑stack developer who loves clean code, strong backend design, and delightful UIs.</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ===== ABOUT ===== */}
      <Section id="about">
        <Container>
          <div className="mb-8 flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            <h2 className="text-2xl font-bold md:text-3xl">About Me</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="md:col-span-2 p-6">
              <p className="leading-7">{ABOUT.intro}</p>
              <ul className="mt-6 grid gap-3">
                {ABOUT.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-zinc-800 dark:bg-zinc-100"></span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="space-y-4">
              {ABOUT.timeline.map((t, i) => (
                <Card key={i} className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border">{t.icon}</div>
                    <div>
                      <p className="font-semibold">{t.title}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{t.org} • {t.period}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{t.details}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== SKILLS ===== */}
      <Section id="skills" className="bg-white/60 dark:bg-zinc-900/40">
        <Container>
          <div className="mb-8 flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            <h2 className="text-2xl font-bold md:text-3xl">Skills</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(groupedSkills).map(([area, items]) => (
              <Card key={area} className="p-6">
                <h3 className="mb-4 text-lg font-semibold">{area}</h3>
                <div className="grid gap-4">
                  {items.map((s) => (
                    <div key={s.name}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium">{s.name}</span>
                        <span>{s.level}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <div className="h-full rounded-full bg-zinc-800 dark:bg-zinc-100" style={{ width: `${s.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== PROJECTS ===== */}
      <Section id="projects">
        <Container>
          <div className="mb-8 flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            <h2 className="text-2xl font-bold md:text-3xl">Projects</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.05 }}>
                <Card className="overflow-hidden">
                  <div className="relative h-44 w-full overflow-hidden">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 line-clamp-3">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <PrimaryButton href={p.github} icon={<Github className="h-4 w-4" />}>GitHub</PrimaryButton>
                      <PrimaryButton href={p.demo} icon={<ExternalLink className="h-4 w-4" />}>Live Demo</PrimaryButton>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== RESUME ===== */}
      <Section id="resume" className="bg-white/60 dark:bg-zinc-900/40">
        <Container>
          <div className="mb-8 flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            <h2 className="text-2xl font-bold md:text-3xl">Resume</h2>
          </div>

          <div className="grid items-center gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold">{PROFILE.name}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{PROFILE.title}</p>
              <ul className="mt-4 grid gap-2 text-sm">
                <li>📧 {PROFILE.email}</li>
                <li>📞 {PROFILE.phone}</li>
                <li>📍 {PROFILE.location}</li>
              </ul>
              <div className="mt-4 flex gap-3">
                <PrimaryButton href={PROFILE.resumeUrl} icon={<Download className="h-4 w-4" />}>Download PDF</PrimaryButton>
                <PrimaryButton href="#contact" icon={<Send className="h-4 w-4" />}>Contact Me</PrimaryButton>
              </div>
            </Card>
            <Card className="overflow-hidden">
              <div className="aspect-[7/10] w-full bg-[linear-gradient(135deg,rgba(0,0,0,.05)_0%,rgba(0,0,0,0)_50%),linear-gradient(225deg,rgba(0,0,0,.05)_0%,rgba(0,0,0,0)_50%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,.1)_0%,rgba(255,255,255,0)_50%),linear-gradient(225deg,rgba(255,255,255,.1)_0%,rgba(255,255,255,0)_50%)] grid place-items-center">
                <p className="px-6 text-center text-sm text-zinc-600 dark:text-zinc-300">Add your resume PDF link to <code>PROFILE.resumeUrl</code> above to enable downloads, or drop the PDF in your public folder and update the path.</p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ===== CONTACT ===== */}
      <Section id="contact">
        <Container>
          <div className="mb-8 flex items-center gap-2">
            <Send className="h-5 w-5" />
            <h2 className="text-2xl font-bold md:text-3xl">Contact</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-6">
              <form onSubmit={handleContactSubmit} className="grid gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Name</label>
                  <input name="name" className="w-full rounded-xl border bg-transparent px-3 py-2 outline-none focus:ring-2" placeholder="Your name" required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Email</label>
                  <input type="email" name="email" className="w-full rounded-xl border bg-transparent px-3 py-2 outline-none focus:ring-2" placeholder="you@example.com" required />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Message</label>
                  <textarea name="message" rows={5} className="w-full rounded-xl border bg-transparent px-3 py-2 outline-none focus:ring-2" placeholder="Tell me about your project..." required />
                </div>
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold shadow-sm hover:shadow transition">
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </Card>

            <div className="grid gap-4">
              <Card className="p-5">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Prefer direct contact?</p>
                <div className="mt-3 grid gap-2 text-sm">
                  <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 hover:underline"><Mail className="h-4 w-4" /> {PROFILE.email}</a>
                  <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:underline"><Phone className="h-4 w-4" /> {PROFILE.phone}</a>
                  <a href={PROFILE.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline"><Linkedin className="h-4 w-4" /> LinkedIn</a>
                  <a href={PROFILE.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline"><Github className="h-4 w-4" /> GitHub</a>
                </div>
              </Card>
              <Card className="p-5">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">I’m open to full‑time roles, internships, and freelance projects. Let’s build something great together!</p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t py-10 text-center text-sm">
        <Container>
          <p>© {new Date().getFullYear()} {PROFILE.name} • Built with Sumit Bothgi❤️ using React & Tailwind</p>
        </Container>
      </footer>
    </div>
  );
}



// import React, { useMemo, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   Menu, X, Github, Linkedin, Mail, Phone,
//   ExternalLink, Download, Send, FileDown,
//   Code2, GraduationCap, Briefcase, Moon, Sun
// } from "lucide-react";

// // ======== CONFIG DATA ========
// const PROFILE = {
//   name: "Sumit Bhagat",
//   role: "Full Stack Developer",
//   bio: "I build modern, responsive, and high-performance web applications. Passionate about React, Node.js, and Tailwind CSS.",
//   avatar: "https://avatars.githubusercontent.com/u/000000?v=4", // replace with your image
//   github: "https://github.com/sumit",
//   linkedin: "https://linkedin.com/in/sumit",
//   email: "sumit@example.com",
//   phone: "+91 9876543210",
// };

// const ABOUT = {
//   title: "About Me",
//   description:
//     "I’m a passionate developer with experience in building web apps using React, Node.js, and Tailwind CSS. I love creating clean UI, smooth animations, and scalable backend systems. Always learning and exploring new technologies.",
// };

// const SKILLS = [
//   { name: "JavaScript", level: 90, area: "Frontend" },
//   { name: "React", level: 85, area: "Frontend" },
//   { name: "Tailwind CSS", level: 80, area: "Frontend" },
//   { name: "Node.js", level: 75, area: "Backend" },
//   { name: "Express.js", level: 70, area: "Backend" },
//   { name: "MongoDB", level: 70, area: "Database" },
//   { name: "MySQL", level: 65, area: "Database" },
// ];

// const PROJECTS = [
//   {
//     title: "Portfolio Website",
//     description: "A modern, responsive personal portfolio with dark/light mode and animations.",
//     tech: ["React", "Tailwind", "Framer Motion"],
//     link: "https://github.com/sumit/portfolio",
//   },
//   {
//     title: "E-commerce App",
//     description: "Full-stack e-commerce web app with product listings, cart, and payment gateway.",
//     tech: ["MERN Stack", "Redux", "Stripe"],
//     link: "https://github.com/sumit/ecommerce",
//   },
//   {
//     title: "Chat Application",
//     description: "Real-time chat app with WebSocket & authentication system.",
//     tech: ["React", "Node.js", "Socket.io"],
//     link: "https://github.com/sumit/chat-app",
//   },
// ];

// // ===== Reusable components =====
// const Section = ({ id, children, className = "" }) => (
//   <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${className}`}>
//     {children}
//   </section>
// );

// const Container = ({ children }) => (
//   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
// );

// const Card = ({ children, className = "" }) => (
//   <div
//     className={`rounded-2xl border shadow-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur ${className}`}
//   >
//     {children}
//   </div>
// );

// const PrimaryButton = ({ children, href, onClick, icon }) => (
//   <a
//     href={href}
//     onClick={onClick}
//     className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold shadow-sm hover:shadow transition"
//   >
//     {icon}
//     {children}
//   </a>
// );

// // ===== Main Component =====
// export default function Portfolio() {
//   const [open, setOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   // load theme from localStorage
//   useEffect(() => {
//     if (localStorage.getItem("theme") === "dark") {
//       document.documentElement.classList.add("dark");
//       setDarkMode(true);
//     }
//   }, []);
//   const toggleTheme = () => {
//     if (darkMode) {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//       setDarkMode(false);
//     } else {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//       setDarkMode(true);
//     }
//   };

//   const nav = [
//     { id: "home", label: "Home" },
//     { id: "about", label: "About" },
//     { id: "skills", label: "Skills" },
//     { id: "projects", label: "Projects" },
//     { id: "resume", label: "Resume" },
//     { id: "contact", label: "Contact" },
//   ];

//   // group skills by area
//   const groupedSkills = useMemo(() => {
//     const groups = {};
//     SKILLS.forEach((s) => {
//       groups[s.area] = groups[s.area] || [];
//       groups[s.area].push(s);
//     });
//     return groups;
//   }, []);

//   // ====== RETURN ======
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 text-zinc-800 dark:from-zinc-900 dark:to-black dark:text-zinc-100">
//       {/* ===== NAVBAR ===== */}
//       <header className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur border-b shadow-md">
//         <Container>
//           <div className="flex items-center justify-between py-4">
//             {/* Logo */}
//             <motion.a
//               href="#home"
//               className="flex items-center gap-2 font-bold text-lg md:text-xl text-indigo-600 dark:text-indigo-400"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               <div className="grid h-9 w-9 place-items-center rounded-2xl border shadow bg-white/80 dark:bg-zinc-900/80">
//                 SB
//               </div>
//               {PROFILE.name}
//             </motion.a>

//             {/* Desktop Nav */}
//             <nav className="hidden md:flex items-center gap-6 font-medium">
//               {nav.map((n) => (
//                 <motion.a
//                   key={n.id}
//                   href={`#${n.id}`}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="rounded-xl px-3 py-2 text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
//                 >
//                   {n.label}
//                 </motion.a>
//               ))}

//               {/* Theme toggle inside navbar */}
//               <button
//                 onClick={toggleTheme}
//                 className="ml-3 grid place-items-center rounded-xl border p-2"
//                 aria-label="Toggle Theme"
//               >
//                 {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//               </button>
//             </nav>

//             {/* Mobile menu button */}
//             <button
//               className="md:hidden grid place-items-center rounded-xl border p-2"
//               onClick={() => setOpen(!open)}
//             >
//               {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>

//           {/* Mobile dropdown */}
//           {open && (
//             <motion.div
//               className="md:hidden pb-4 grid gap-2"
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//             >
//               {nav.map((n) => (
//                 <a
//                   key={n.id}
//                   href={`#${n.id}`}
//                   onClick={() => setOpen(false)}
//                   className="rounded-xl px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
//                 >
//                   {n.label}
//                 </a>
//               ))}
//               <button
//                 onClick={() => {
//                   toggleTheme();
//                   setOpen(false);
//                 }}
//                 className="mt-2 flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
//               >
//                 {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//                 {darkMode ? "Light Mode" : "Dark Mode"}
//               </button>
//             </motion.div>
//           )}
//         </Container>
//       </header>

//       {/* ===== HERO ===== */}
//       <Section id="home">
//         <Container>
//           <div className="grid gap-8 md:grid-cols-2 items-center">
//             <div>
//               <h1 className="text-4xl md:text-6xl font-bold mb-4">
//                 Hi, I’m {PROFILE.name}
//               </h1>
//               <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-6">
//                 {PROFILE.role} — {PROFILE.bio}
//               </p>
//               <div className="flex gap-4">
//                 <PrimaryButton href={PROFILE.github} icon={<Github size={18} />}>
//                   GitHub
//                 </PrimaryButton>
//                 <PrimaryButton href={PROFILE.linkedin} icon={<Linkedin size={18} />}>
//                   LinkedIn
//                 </PrimaryButton>
//               </div>
//             </div>
//             <motion.img
//               src={PROFILE.avatar}
//               alt="Profile"
//               className="w-60 h-60 rounded-full mx-auto border-4 border-indigo-500 shadow-lg"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//             />
//           </div>
//         </Container>
//       </Section>

//       {/* ===== ABOUT ===== */}
//       <Section id="about" className="bg-white/60 dark:bg-zinc-900/40">
//         <Container>
//           <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
//             <GraduationCap /> {ABOUT.title}
//           </h2>
//           <p className="text-zinc-700 dark:text-zinc-300">{ABOUT.description}</p>
//         </Container>
//       </Section>

//       {/* ===== SKILLS ===== */}
//       <Section id="skills">
//         <Container>
//           <div className="mb-8 flex items-center gap-2">
//             <Code2 className="h-5 w-5" />
//             <h2 className="text-2xl font-bold md:text-3xl">Skills</h2>
//           </div>
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {Object.entries(groupedSkills).map(([area, items]) => (
//               <Card key={area} className="p-6 hover:shadow-lg transition">
//                 <h3 className="mb-4 text-lg font-semibold text-indigo-600 dark:text-indigo-400">
//                   {area}
//                 </h3>
//                 <div className="grid gap-4">
//                   {items.map((s, i) => (
//                     <motion.div
//                       key={s.name}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: i * 0.05 }}
//                       viewport={{ once: true }}
//                       className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
//                     >
//                       {/* progress ring */}
//                       <div className="relative h-12 w-12">
//                         <svg className="h-12 w-12 transform -rotate-90">
//                           <circle
//                             cx="24"
//                             cy="24"
//                             r="20"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                             className="text-zinc-300 dark:text-zinc-700"
//                             fill="transparent"
//                           />
//                           <circle
//                             cx="24"
//                             cy="24"
//                             r="20"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                             strokeDasharray={2 * Math.PI * 20}
//                             strokeDashoffset={
//                               2 * Math.PI * 20 * (1 - s.level / 100)
//                             }
//                             className="text-indigo-600 dark:text-indigo-400"
//                             fill="transparent"
//                           />
//                         </svg>
//                         <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
//                           {s.level}%
//                         </span>
//                       </div>
//                       <span className="font-medium">{s.name}</span>
//                     </motion.div>
//                   ))}
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </Container>
//       </Section>

//       {/* ===== PROJECTS ===== */}
//       <Section id="projects" className="bg-white/60 dark:bg-zinc-900/40">
//         <Container>
//           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//             <Briefcase /> Projects
//           </h2>
//           <div className="grid gap-6 md:grid-cols-2">
//             {PROJECTS.map((p, i) => (
//               <Card key={i} className="p-6 hover:shadow-lg transition">
//                 <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
//                 <p className="text-zinc-600 dark:text-zinc-300 mb-3">
//                   {p.description}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   {p.tech.map((t, i) => (
//                     <span
//                       key={i}
//                       className="px-2 py-1 text-xs rounded bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200"
//                     >
//                       {t}
//                     </span>
//                   ))}
//                 </div>
//                 <a
//                   href={p.link}
//                   className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium"
//                 >
//                   View Project <ExternalLink size={14} />
//                 </a>
//               </Card>
//             ))}
//           </div>
//         </Container>
//       </Section>

//       {/* ===== RESUME ===== */}
//       <Section id="resume">
//         <Container>
//           <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
//             <FileDown /> Resume
//           </h2>
//           <PrimaryButton
//             href="/resume.pdf"
//             icon={<Download size={18} />}
//           >
//             Download Resume
//           </PrimaryButton>
//         </Container>
//       </Section>

//       {/* ===== CONTACT ===== */}
//       <Section id="contact" className="bg-white/60 dark:bg-zinc-900/40">
//         <Container>
//           <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
//             <Send /> Contact
//           </h2>
//           <p className="mb-6">Feel free to reach out via email or phone:</p>
//           <div className="flex flex-col gap-3">
//             <a
//               href={`mailto:${PROFILE.email}`}
//               className="flex items-center gap-2"
//             >
//               <Mail /> {PROFILE.email}
//             </a>
//             <a href={`tel:${PROFILE.phone}`} className="flex items-center gap-2">
//               <Phone /> {PROFILE.phone}
//             </a>
//           </div>
//         </Container>
//       </Section>

//       {/* ===== FOOTER ===== */}
//       <footer className="border-t py-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
//         © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
//       </footer>
//     </div>
//   );
// }
