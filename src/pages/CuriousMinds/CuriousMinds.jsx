import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "./CuriousMinds.css";
import {
  COURSE, NAV_LINKS, TOPICS, JOURNEY, PARENT_REASONS, PARENT_SUPPORT,
  STUDENT_OUTCOMES, CLASS_FLOW, CAPSTONE_IDEAS, CURRICULUM, FAQS,
} from "./courseData";
import { useInView, useCountUp, prefersReducedMotion } from "./hooks";
import { Icon, WhatsAppIcon } from "./Icons";
import ClassCard from "./ClassCard";

const inr = (n) => "₹" + n.toLocaleString("en-IN");
const waLink = (text) =>
  `https://wa.me/${COURSE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
const ENROL_MSG = "Hi, I'd like to enrol my child in AI Foundations (Curious Minds).";
const EASE = [0.4, 0, 0.2, 1];

/* ---------- small building blocks ---------- */

/** Fades + lifts its children in once, the first time they scroll into view. */
function Reveal({ as = "div", delay = 0, children, ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: EASE }}
      {...rest}
    >
      {children}
    </M>
  );
}

/** Same as Reveal but plays on page load (for the top section). */
function Rise({ as = "div", delay = 0, children, ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </M>
  );
}

function SectionHead({ kicker, title, intro }) {
  return (
    <Reveal className="cm-head">
      <p className="cm-kicker">{kicker}</p>
      <h2 className="cm-h2">{title}</h2>
      {intro && <p className="cm-intro">{intro}</p>}
    </Reveal>
  );
}

function Button({ href, variant = "fill", children, external = true }) {
  return (
    <a
      className={`cm-btn cm-btn--${variant}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Icon name="arrow" className="cm-btn__arrow" />
    </a>
  );
}

/** Expand/collapse panel. Height animates with the CSS grid-rows trick. */
function Expandable({ open, id, children }) {
  return (
    <div id={id} className={`cm-expand ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="cm-expand__inner">{children}</div>
    </div>
  );
}

/* ---------- sections ---------- */

function Journey() {
  const [ref, inView] = useInView(0.5);
  const trackRef = useRef(null);
  const stopRefs = useRef([]);
  const [active, setActive] = useState(-1);
  const [x, setX] = useState(0);

  const measure = (i) => {
    const t = trackRef.current?.getBoundingClientRect();
    const s = stopRefs.current[i]?.getBoundingClientRect();
    if (t && s) setX(s.left + s.width / 2 - t.left);
  };

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setActive(JOURNEY.length - 1);
      measure(JOURNEY.length - 1);
      return;
    }
    let i = 0;
    const timers = [];
    const step = () => {
      setActive(i);
      measure(i);
      if (++i < JOURNEY.length) timers.push(setTimeout(step, 650));
    };
    timers.push(setTimeout(step, 300));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  useEffect(() => {
    const onResize = () => active >= 0 && measure(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  return (
    <Reveal className="cm-journey" aria-label="Course path" delay={200}>
      <div className="cm-journey__row" ref={ref}>
        <div className="cm-journey__track" ref={trackRef}>
          <div className="cm-journey__fill" style={{ width: x }} />
          <div className="cm-journey__dot" style={{ left: x, opacity: active >= 0 ? 1 : 0 }} />
        </div>
        {JOURNEY.map((s, i) => (
          <div
            key={s.label}
            className={`cm-stop ${i <= active ? "is-on" : ""} ${
              i === JOURNEY.length - 1 && active === i ? "is-pop" : ""
            }`}
          >
            <div className="cm-stop__ic" ref={(el) => (stopRefs.current[i] = el)}>
              <Icon name={s.icon} />
            </div>
            <div className="cm-stop__lab">{s.label}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="cm-navwrap">
      <motion.nav
        ref={ref}
        className={`cm-nav ${scrolled ? "is-scrolled" : ""}`}
        aria-label="Main"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Swap this SVG for your KA Degree logo image if you prefer: <img src="/logo.png" alt="KA Degree" /> */}
        <a href="#top" className="cm-logo" aria-label="KA Degree Curious Minds home">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" strokeWidth="1.8" aria-hidden="true">
            <path className="cm-logo__cap" d="M17 5 2 12l15 7 15-7-15-7Z" />
            <path d="M8 16v7c3 3 15 3 18 0v-7" />
            <path d="M30 13v8" />
          </svg>
          <span>KA Degree<small>Curious Minds</small></span>
        </a>

        <div className="cm-nav__links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>

        <div className="cm-nav__right">
          <a className="cm-btn cm-btn--fill cm-btn--sm" href={waLink(ENROL_MSG)} target="_blank" rel="noopener noreferrer">
            Apply Now <Icon name="arrow" className="cm-btn__arrow" />
          </a>
          <button
            type="button"
            className="cm-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="cm-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

const wordVariants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: EASE } },
};

function Headline() {
  const reduce = useReducedMotion();
  const plain = ["AI", "Foundations", "for"];
  const accent = ["School", "Students."];
  return (
    <motion.h1
      className="cm-h1"
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
    >
      {plain.map((w) => (
        <motion.span key={w} className="cm-word" variants={wordVariants}>{w}</motion.span>
      ))}
      <span className="cm-hl">
        {accent.map((w) => (
          <motion.span key={w} className="cm-word" variants={wordVariants}>{w}</motion.span>
        ))}
        <svg className="cm-hl__line" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            d="M3 9 C 80 3, 180 3, 297 8"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.85, duration: 0.9, ease: EASE }}
          />
        </svg>
      </span>
    </motion.h1>
  );
}

function Hero() {
  return (
    <header className="cm-hero" id="top">
      <div className="cm-wrap">
        <div className="cm-hero__grid">
          <div>
            <Rise as="p" className="cm-kicker">AI course for school students</Rise>
            <Rise as="p" className="cm-chip" delay={0.05}>
              {COURSE.grades} · {COURSE.duration}
            </Rise>
            <Headline />
            <Rise as="p" className="cm-lead" delay={0.5}>
              Discover how AI really works and start building with it. Python,
              problem-solving and real AI projects, one hour a day, three evenings
              a week. No prior coding needed.
            </Rise>
            <Rise className="cm-pills" delay={0.6}>
              <span>Beginner friendly</span>
              <span>5 projects</span>
              <span>Course certificate</span>
            </Rise>
            <Rise className="cm-cta" delay={0.7}>
              <Button href={waLink(ENROL_MSG)}>Enrol on WhatsApp</Button>
              <Button href="#learn" variant="line" external={false}>See the 12 weeks</Button>
            </Rise>
            <Rise as="p" className="cm-facts" delay={0.8}>
              <span><b>{inr(COURSE.feeMonthly)}</b>/month</span>
              <span>{COURSE.timing}</span>
              <span>{COURSE.days.replace("days", "evenings")}</span>
            </Rise>
          </div>
          <ClassCard />
        </div>
        <Journey />
        <div className="cm-audience">
          <Reveal as="a" href="#parents" className="cm-audience__card" whileHover={{ y: -3 }}>
            <span className="cm-mono cm-accent">I’m a parent</span>
            <strong>Why AI now, and how you’ll track progress</strong>
          </Reveal>
          <Reveal as="a" href="#students" className="cm-audience__card" delay={80} whileHover={{ y: -3 }}>
            <span className="cm-mono cm-accent">I’m a student</span>
            <strong>What you’ll build in 12 weeks</strong>
          </Reveal>
        </div>
      </div>
    </header>
  );
}

/** Topic strip that scrolls slowly from right to left. */
function Marquee() {
  const reduce = useReducedMotion();
  const items = [...TOPICS, ...TOPICS];
  return (
    <div className="cm-marquee" aria-hidden="true">
      <motion.div
        className="cm-marquee__track"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {items.map((t, i) => (
          <span key={i}>{t}<i>✦</i></span>
        ))}
      </motion.div>
    </div>
  );
}

function Parents() {
  return (
    <section className="cm-section cm-section--band" id="parents">
      <div className="cm-wrap">
        <SectionHead
          kicker="For parents"
          title="A fascinating world your child shouldn’t miss."
          intro="Get the fundamentals right now, and your child will be ready to imagine the AI of tomorrow, whichever stream they choose."
        />
        <div className="cm-reasons">
          {PARENT_REASONS.map((r, i) => (
            <Reveal key={r.title} className="cm-reason" delay={i * 90}>
              <h3 className="cm-h3">{r.title}</h3>
              <p className="cm-muted">{r.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="cm-support">
          <p className="cm-mono cm-muted">You stay in the loop</p>
          <ul>
            {PARENT_SUPPORT.map((s) => (
              <li key={s}>
                <Icon name="check" />
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Students() {
  return (
    <section className="cm-section" id="students">
      <div className="cm-wrap">
        <SectionHead
          kicker="For students"
          title="Stop just using AI. Start building it."
          intro="No coding needed before you join. In 12 weeks you go from “what is AI?” to training your own model and presenting a project you made."
        />
        <div className="cm-students">
          <Reveal>
            <p className="cm-mono cm-muted cm-gap-sm">By the end, you can</p>
            <ul className="cm-outcomes">
              {STUDENT_OUTCOMES.map((o) => (
                <li key={o}>
                  <span className="cm-tick"><Icon name="check" /></span>
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="cm-classcard" delay={120}>
            <p className="cm-mono cm-accent cm-gap-sm">Every class · {COURSE.timing}</p>
            <ol className="cm-flow">
              {CLASS_FLOW.map((c) => (
                <li key={c.step}>
                  <span className="cm-mono">{c.step}</span>
                  <p>{c.text}</p>
                </li>
              ))}
            </ol>
            <div className="cm-ideas">
              <h3 className="cm-h3">Capstone ideas</h3>
              <ul>
                {CAPSTONE_IDEAS.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Curriculum() {
  const [open, setOpen] = useState(0);
  return (
    <section className="cm-section cm-section--band" id="learn">
      <div className="cm-wrap">
        <SectionHead
          kicker="What your child will learn"
          title="From “what is AI?” to building with it."
          intro="Three months, twelve weeks. Every class has a warm-up quiz, a live demo and hands-on practice."
        />
        <div className="cm-months">
          {CURRICULUM.map((m, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={m.month} className={`cm-month ${isOpen ? "is-open" : ""}`} delay={i * 80}>
                <button
                  type="button"
                  className="cm-month__head"
                  aria-expanded={isOpen}
                  aria-controls={`cm-month-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="cm-month__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cm-month__text">
                    <span className="cm-mono cm-accent">{m.month} · {m.theme}</span>
                    <span className="cm-month__title">{m.title}</span>
                  </span>
                  <Icon name="plus" className="cm-month__toggle" />
                </button>
                <Expandable open={isOpen} id={`cm-month-${i}`}>
                  <div className="cm-weeks">
                    {m.weeks.map((w) => (
                      <div key={w.n} className="cm-week">
                        <span className="cm-mono cm-muted">Week {w.n}</span>
                        <h4>{w.title}</h4>
                        <p className="cm-muted">{w.text}</p>
                        {w.tag && <span className="cm-tag">{w.tag}</span>}
                      </div>
                    ))}
                  </div>
                </Expandable>
              </Reveal>
            );
          })}
        </div>
        <Reveal as="p" className="cm-cert">
          <strong>Certificate</strong> on scoring 50%+ overall and presenting the
          capstone. Steady effort counts more than one exam.
        </Reveal>
      </div>
    </section>
  );
}

function Fees() {
  const [ref, inView] = useInView(0.5);
  const total = useCountUp(COURSE.feeTotal, inView);
  return (
    <section className="cm-section" id="fees">
      <div className="cm-wrap">
        <SectionHead
          kicker="Schedule & fees"
          title="One hour. Prime time. Three evenings a week."
        />
        <div className="cm-fees">
          <Reveal className="cm-timecard">
            <div>
              <p className="cm-mono">Every class</p>
              <p className="cm-timecard__big">7 – 8 PM</p>
            </div>
            <ul>
              <li>{COURSE.days} · 1 hour</li>
              <li>{COURSE.duration} · {COURSE.sessions} live sessions</li>
              <li>5 projects · certificate</li>
              <li>{COURSE.grades}</li>
            </ul>
          </Reveal>
          <Reveal className="cm-pricecard" delay={120}>
            <p className="cm-mono cm-muted">Total course fee</p>
            <p className="cm-pricecard__total" ref={ref}>{inr(total)}</p>
            <p className="cm-muted">
              Complete {COURSE.duration} · {inr(COURSE.perSession)} per session · no hidden charges
            </p>
            <div className="cm-installments">
              {Array.from({ length: COURSE.months }, (_, i) => (
                <div key={i}>
                  <strong>{inr(COURSE.feeMonthly)}</strong>
                  <span className="cm-mono cm-muted">Month {i + 1}</span>
                </div>
              ))}
            </div>
            <Button href={waLink(ENROL_MSG)}>Enrol on WhatsApp</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="cm-section cm-section--band" id="faq">
      <div className="cm-wrap">
        <SectionHead kicker="Questions parents ask" title="Before you enrol" />
        <div className="cm-faq">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} className={`cm-faq__item ${isOpen ? "is-open" : ""}`} delay={i * 60}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`cm-faq-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {f.q}
                  <Icon name="plus" className="cm-month__toggle" />
                </button>
                <Expandable open={isOpen} id={`cm-faq-${i}`}>
                  <p className="cm-muted cm-faq__a">{f.a}</p>
                </Expandable>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="cm-section cm-final">
      <div className="cm-wrap">
        <Reveal>
          <p className="cm-kicker">Give your child a head start</p>
          <h2 className="cm-h2">Enrol today. Seats are limited.</h2>
          <p className="cm-intro">
            {COURSE.grades} · {COURSE.timing} · {COURSE.days} · {inr(COURSE.feeMonthly)} a month
          </p>
          <div className="cm-cta cm-cta--center">
            <Button href={waLink(ENROL_MSG)}>WhatsApp {COURSE.whatsappLabel}</Button>
            <Button href={COURSE.site} variant="line">kadegree.in</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Curious Minds course page.
 * showNav: set to false when this page sits inside kadegree.in, whose layout already has the top bar.
 * showWhatsApp: set to false if your site layout already shows the floating WhatsApp button.
 */
export default function CuriousMinds({ showNav = true, showWhatsApp = true }) {
  useEffect(() => {
    document.title = "Curious Minds · AI Foundations for School Students | KA Degree";
  }, []);

  return (
    <div className="cm-page">
      {showNav && <Nav />}
      <Hero />
      <main>
        <Parents />
        <Students />
        <Curriculum />
        <Fees />
        <Faq />
        <FinalCta />
      </main>
      <footer className="cm-footer">
        <div className="cm-wrap">
          <span>KA Degree · Bengaluru</span>
          <span>1st Sector, HSR Layout, Bengaluru 560102 · kadegree.in</span>
        </div>
      </footer>
      {showWhatsApp && (
        <motion.a
          className="cm-wa"
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 16 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          <WhatsAppIcon />
        </motion.a>
      )}
    </div>
  );
}
