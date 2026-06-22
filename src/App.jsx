import './App.css'
import { useMemo, useState } from 'react'

const profile = {
  name: 'Sitt Naing',
  title: 'Aspiring UI/UX Designer',
  location: 'Singapore',
  email: 'sittn40@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sitt-naingg',
  github: 'https://github.com/SINING-NEO',
  bio: "Smooth sea doesn't make skillful sailor.",
  availability: 'Open to UI/UX internships, junior product design work, and prototype-heavy freelance projects.',
}

const projects = [
  {
    id: 'air-draw',
    title: 'AirDraw 3D Studio',
    type: 'Gesture Interaction',
    year: '2026',
    summary:
      'A webcam-based drawing experience that turns fingertip gestures into glowing 3D strokes.',
    detail:
      'Built a browser-based creative tool with real-time hand tracking, 3D rendering, a live camera overlay, brush controls, undo/clear actions, and view-aligned drawing so strokes follow the current camera perspective instead of fixed world axes.',
    stack: ['React', 'TypeScript', 'Vite', 'MediaPipe', 'Three.js'],
    role: 'Interaction design, frontend build, camera UX',
    duration: 'Prototype sprint',
    problem:
      'Air drawing is hard to understand because the user cannot see a physical surface or pen.',
    approach:
      'Paired a mirrored camera preview with hand skeleton feedback, clear draw states, brush controls, and view-aligned 3D mapping.',
    outcome:
      'A deployed creative prototype where users can draw in space, rotate the scene, and immediately understand when tracking is active.',
    impact:
      'The key design challenge was making an invisible input feel understandable: the camera preview shows the hand skeleton while the 3D scene gives immediate spatial feedback.',
    liveUrl: 'https://air-draw-3d.vercel.app/',
    accent: '#8bb8a8',
  },
  {
    id: 'ai-social',
    title: 'AI Social Content Pipeline',
    type: 'Automation Backend',
    year: '2026',
    summary:
      'A backend system for planning, generating, approving, publishing, and measuring short-form video content.',
    detail:
      'Implemented an Express API with BullMQ workers for planner, video, publisher, and analytics jobs. The pipeline connects Perplexity for scripts, OpusClip for video clipping, YouTube/Instagram publishing, PostgreSQL records, Redis queues, and a human approval gate before publishing.',
    stack: ['Node.js', 'Express', 'BullMQ', 'PostgreSQL', 'Redis', 'YouTube API'],
    role: 'Backend architecture, workflow design, API structure',
    duration: 'Automation build',
    problem:
      'Short-form content work has many repeated steps: planning, clipping, reviewing, publishing, and checking analytics.',
    approach:
      'Separated the pipeline into queue-backed workers with explicit job states, API routes, validation, and a human approval gate.',
    outcome:
      'A backend foundation for creator automation that makes the content lifecycle traceable instead of hidden in one large script.',
    impact:
      'This project shows system thinking: each creative step became a queue-backed workflow with clear job states from draft to generated, pending approval, approved, and published.',
    accent: '#a8a6d9',
  },
  {
    id: 'still-here',
    title: 'Still Here',
    type: 'Recovery Web Companion',
    year: '2026',
    summary:
      'A private, psychology-informed breakup support site with personalization, progress tracking, and reflective tools.',
    detail:
      'Designed a local-first single-page experience with a multi-step intake survey, eight therapeutic plan types, adaptive journey copy, XP, badges, streaks, daily quests, a win jar, journal prompts, box breathing, and React islands for books, films, plan cards, and quote rotation.',
    stack: ['Vite', 'React Islands', 'localStorage', 'Vanilla JS', 'Express Stub'],
    role: 'Product UX, emotional design, content structure',
    duration: 'Personal product build',
    problem:
      'Breakup support tools can feel either too clinical or too shallow, especially when privacy matters.',
    approach:
      'Designed a local-first experience with survey-based personalization, gentle gamification, reflection prompts, and low-pressure daily actions.',
    outcome:
      'A deployed recovery companion that uses privacy, pacing, and supportive micro-interactions to make return visits easier.',
    impact:
      'The strongest UX idea is privacy by default: sensitive progress stays on the device while the interface uses gentle gamification to support small daily actions.',
    liveUrl: 'https://no-more-broken.vercel.app/',
    accent: '#d7b7a3',
  },
  {
    id: 'forever-yours',
    title: 'Forever Yours',
    type: 'Cinematic Interactive Site',
    year: '2026',
    summary:
      'A romantic interactive proposal experience with playful motion, story moments, and a celebratory ending.',
    detail:
      'Built a dark aurora React experience with marquee intro text, magnetic CTA, bento memory cards, 3D tilt, swipeable love cards, this-or-that interactions, poppable fortune hearts, vibe selection, an SVG love meter, a runaway No button, growing Yes action, confetti, and a revealable love letter.',
    stack: ['React', 'TypeScript', 'Framer Motion', 'Canvas Confetti', 'Vite'],
    role: 'Creative direction, motion UX, frontend build',
    duration: 'Interactive story build',
    problem:
      'A proposal page needs to feel personal and memorable, not like a normal landing page.',
    approach:
      'Structured the experience as a sequence of story moments with playful choices, tactile motion, progressive reveals, and a celebratory finish.',
    outcome:
      'A deployed cinematic microsite that uses interaction design to create anticipation, delight, and emotional payoff.',
    impact:
      'The project turns a simple landing page into a narrative sequence, using interaction design to create emotion, suspense, and delight.',
    liveUrl: 'https://foreveryours-psi.vercel.app/',
    accent: '#c895a5',
  },
  {
    id: 'auto-reply',
    title: 'Telegram Auto-Reply Assistant',
    type: 'Personal Automation Service',
    year: '2026',
    summary:
      'A personal Telegram auto-reply service that responds from a real account with rules, cooldowns, and optional AI.',
    detail:
      'Created a Python service with Telethon that listens for incoming private messages, filters bots and blocked users, respects allow lists and cooldowns, replies from keyword/regex rules first, and falls back to Gemini or OpenAI-compatible AI when configured. It also includes Docker and background-run options.',
    stack: ['Python', 'Telethon', 'Gemini', 'Docker', 'MTProto'],
    role: 'Automation design, safety logic, service setup',
    duration: 'Utility service build',
    problem:
      'Personal auto-replies can easily feel risky if they respond too often or to the wrong people.',
    approach:
      'Added guardrails: private-message filtering, bot checks, allow/block lists, cooldowns, rule-first replies, AI fallback, and Docker background running.',
    outcome:
      'A controlled personal automation service that keeps convenience from becoming spammy or unsafe.',
    impact:
      'The service balances automation with control: cooldowns, allow/block lists, and testing notes reduce the risk of over-replying from a personal account.',
    accent: '#b8c7d9',
  },
]

const principles = [
  'Calm interfaces with useful motion',
  'Clear visual hierarchy before decoration',
  'Small interactions that make products feel alive',
  'Design decisions grounded in real user actions',
]

const proofPoints = [
  { value: '5', label: 'Selected projects' },
  { value: '3', label: 'Live demos' },
  { value: 'UI + code', label: 'Main strength' },
]

const profileHighlights = [
  {
    label: 'Design identity',
    value: 'Calm UI, modern minimalism, interaction-first details',
  },
  {
    label: 'Builder mindset',
    value: 'Turns ideas into working prototypes instead of static mockups',
  },
  {
    label: 'Project range',
    value: 'Creative tools, emotional web experiences, automation systems',
  },
]

const processSteps = [
  {
    title: 'Understand the user moment',
    text: 'I start by clarifying what the user is trying to do, what could confuse them, and what feedback they need from the interface.',
  },
  {
    title: 'Prototype the interaction',
    text: 'I build working flows early so decisions are tested through behavior, not only through static screens.',
  },
  {
    title: 'Polish for trust',
    text: 'I refine hierarchy, copy, spacing, states, and accessibility so the product feels calm, intentional, and usable.',
  },
]

const skillGroups = [
  {
    title: 'Design',
    items: ['UI/UX direction', 'Interaction design', 'Responsive layouts', 'Portfolio storytelling'],
  },
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'Three.js'],
  },
  {
    title: 'Systems',
    items: ['Node.js APIs', 'Python automation', 'Queues', 'PostgreSQL', 'Docker'],
  },
]

function App() {
  const [activeProject, setActiveProject] = useState(projects[0])
  const [designMood, setDesignMood] = useState(62)
  const liveProjectCount = projects.filter((project) => project.liveUrl).length

  const moodLabel = useMemo(() => {
    if (designMood < 35) return 'Quiet'
    if (designMood < 70) return 'Balanced'
    return 'Expressive'
  }, [designMood])

  return (
    <main
      className="portfolio-shell"
      style={{
        '--active-accent': activeProject.accent,
        '--mood': `${designMood}%`,
      }}
    >
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <nav className="nav" aria-label="Primary navigation">
        <a href="#top" className="wordmark">
          SN
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{profile.location} based UI/UX portfolio</p>
          <h1>
            Designing calm digital experiences with interactive, modern details.
          </h1>
          <p className="hero-bio">
            {profile.name} is an {profile.title.toLowerCase()} exploring the
            space between clean visual systems, interactive prototypes,
            automation ideas, and small moments of motion.
          </p>
          <blockquote>{profile.bio}</blockquote>
          <div className="hero-actions">
            <a className="primary-action" href="#work">
              View selected work
            </a>
            <a className="secondary-action" href={`mailto:${profile.email}`}>
              Start a conversation
            </a>
          </div>
          <div className="proof-strip" aria-label="Portfolio highlights">
            {proofPoints.map((point) => (
              <div key={point.label}>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero-card" aria-label="Portfolio snapshot">
          <div className="orbital-card">
            <span className="orbit orbit-one"></span>
            <span className="orbit orbit-two"></span>
            <span className="core-dot">UI</span>
          </div>
          <div className="snapshot-grid">
            <div>
              <span>Focus</span>
              <strong>UI/UX + prototypes</strong>
            </div>
            <div>
              <span>Style</span>
              <strong>Calm minimalism</strong>
            </div>
            <div>
              <span>Availability</span>
              <strong>Open now</strong>
            </div>
            <div>
              <span>Live demos</span>
              <strong>{liveProjectCount} available</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="section about-section" id="about">
        <div className="section-heading">
          <p className="eyebrow">About Sitt</p>
          <h2>Learning by building things that can actually be used.</h2>
          <p>
            I am based in Singapore and building my path as an aspiring UI/UX
            designer. My strongest work sits where design meets behavior:
            interfaces that react to gestures, guide people through emotional
            journeys, or quietly automate repetitive tasks.
          </p>
        </div>

        <div className="profile-grid">
          <article className="profile-card large">
            <span>Current direction</span>
            <p>
              I am studying AI tools, keeping up with new technology, and
              building from the academic foundation I am developing at
              Singapore Polytechnic. My projects show how I connect basic
              fundamentals with modern tools, practical prototypes, and working
              deployments.
            </p>
          </article>

          {profileHighlights.map((item) => (
            <article className="profile-card" key={item.label}>
              <span>{item.label}</span>
              <p>{item.value}</p>
            </article>
          ))}
        </div>

        <div className="skill-grid" aria-label="Skills and tools">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skill-list">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2>Projects</h2>
          <p>
            These case studies focus only on the main projects I built.
          </p>
        </div>

        <div className="project-showcase">
          <div className="project-list" aria-label="Project selector">
            {projects.map((project) => (
              <button
                className={`project-tab ${
                  activeProject.id === project.id ? 'active' : ''
                }`}
                key={project.id}
                onClick={() => setActiveProject(project)}
                aria-pressed={activeProject.id === project.id}
                type="button"
              >
                <span>{project.type}</span>
                <strong>{project.title}</strong>
                {project.liveUrl && <small>Live demo</small>}
              </button>
            ))}
          </div>

          <article className="project-preview">
            <div className="preview-topline">
              <span>{activeProject.year}</span>
              <span>{activeProject.type}</span>
            </div>
            <h3>{activeProject.title}</h3>
            <p className="project-summary">{activeProject.summary}</p>
            <p>{activeProject.detail}</p>
            <div className="case-meta" aria-label="Project metadata">
              <div>
                <span>Role</span>
                <strong>{activeProject.role}</strong>
              </div>
              <div>
                <span>Timeline</span>
                <strong>{activeProject.duration}</strong>
              </div>
            </div>
            <div className="case-study-grid">
              <div>
                <span>Problem</span>
                <p>{activeProject.problem}</p>
              </div>
              <div>
                <span>Approach</span>
                <p>{activeProject.approach}</p>
              </div>
              <div>
                <span>Outcome</span>
                <p>{activeProject.outcome}</p>
              </div>
            </div>
            {activeProject.liveUrl && (
              <a
                className="live-project-link"
                href={activeProject.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open live project
              </a>
            )}
            <div className="tag-row">
              {activeProject.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="impact-card">
              <span>Project insight</span>
              <p>{activeProject.impact}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section split-section" id="process">
        <div>
          <p className="eyebrow">Design Direction</p>
          <h2>A practical UI/UX process, not just decoration.</h2>
          <p>
            The visual system uses soft borders, generous space, muted color,
            and motion that responds gently instead of shouting for attention.
          </p>
          <ul className="principles">
            {principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </div>

        <div className="process-stack">
          {processSteps.map((step, index) => (
            <article className="process-card" key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">Interaction Quality</p>
          <h2>Motion should support meaning.</h2>
          <p>
            This portfolio uses interaction as a signal: selected states,
            deployed-project badges, readable cards, and gentle motion that
            keeps attention on the work.
          </p>
        </div>

        <div className="interaction-panel">
          <div className="panel-header">
            <span>Interaction Tuning</span>
            <strong>{moodLabel}</strong>
          </div>
          <label htmlFor="mood">
            Motion energy
            <input
              id="mood"
              max="100"
              min="0"
              onChange={(event) => setDesignMood(Number(event.target.value))}
              type="range"
              value={designMood}
            />
          </label>
          <div className="mood-visual" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>
            This small control changes the visual rhythm of the card, showing
            how simple interaction can make a portfolio feel more personal.
          </p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="eyebrow">Contact</p>
        <h2>{profile.availability}</h2>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
