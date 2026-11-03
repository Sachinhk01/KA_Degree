import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { COURSE } from "./courseData";

/*
  Minimal class card: live tag, class timing, a typing Python window, one footer line,
  and small course tags drifting around the card (Framer Motion).
*/

// What the terminal types, in order. ok: true shows the answer in green.
const STEPS = [
  { fn: "print", arg: '"Hi students 👋"', out: "Hi students 👋" },
  { fn: "print", arg: '"Let\'s learn AI"', out: "Let's learn AI" },
  { fn: "learn", arg: '"Python + AI"', out: "✓ Ready in 12 weeks", ok: true },
];

// Tags drifting around the card. Each wanders on its own path and speed.
const ROAMERS = [
  { label: "Python", pos: "r1", x: [0, 22, 8, -16, 0], y: [0, -14, 18, 6, 0], rotate: [0, -4, 3, -2, 0], duration: 16 },
  { label: "AI", pos: "r2", x: [0, -20, 14, 6, 0], y: [0, 16, 22, -10, 0], rotate: [0, 4, -3, 2, 0], duration: 19 },
  { label: "{ }", pos: "r3", x: [0, -14, 12, 0], y: [0, -24, 18, 0], rotate: [0, 0, 0, 0], duration: 17, plain: true },
  { label: "Data", pos: "r4", x: [0, 24, 10, -12, 0], y: [0, 10, -20, -6, 0], rotate: [0, 3, -3, 2, 0], duration: 21 },
  { label: "Projects", pos: "r5", x: [0, 6, 14, -20, 0], y: [0, -10, 22, 16, 0], rotate: [0, 2, -3, 4, 0], duration: 18 },
];
const SPARKS = [
  { pos: "r6", x: [0, -14, 12, 0], y: [0, -24, 18, 0], duration: 14 },
  { pos: "r7", x: [0, 22, 8, -16, 0], y: [0, -14, 18, 6, 0], duration: 15, small: true },
];

const chars = (s) => Array.from(s); // keeps emoji whole while typing
const cmdLength = (st) => chars(st.fn + "(" + st.arg + ")").length;

function Command({ st, n, cursor }) {
  const parts = [[st.fn, "fn"], ["(", "pn"], [st.arg, "st"], [")", "pn"]];
  let left = n;
  return (
    <div>
      <span className="cm-term__pr">&gt;&gt;&gt;</span>
      {parts.map(([text, cls], i) => {
        if (left <= 0) return null;
        const c = chars(text);
        const shown = c.slice(0, left).join("");
        left -= c.length;
        return <span key={i} className={`cm-term__${cls}`}>{shown}</span>;
      })}
      {cursor && <span className="cm-term__cur" />}
    </div>
  );
}

function Terminal() {
  const reduce = useReducedMotion();
  const full = STEPS.flatMap((st) => [{ kind: "cmd", st, n: cmdLength(st) }, { kind: "out", st }]);
  const [lines, setLines] = useState(reduce ? full : []);

  useEffect(() => {
    if (reduce) { setLines(full); return; }
    let alive = true, timer;
    const sleep = (ms) => new Promise((r) => { timer = setTimeout(r, ms); });
    (async () => {
      while (alive) {
        const done = [];
        setLines([]);
        for (const st of STEPS) {
          const total = cmdLength(st);
          await sleep(350); if (!alive) return;
          for (let n = 0; n <= total; n++) {
            setLines([...done, { kind: "cmd", st, n, cursor: true }]);
            await sleep(55 + Math.random() * 55); if (!alive) return;
          }
          await sleep(300); if (!alive) return;
          done.push({ kind: "cmd", st, n: total }, { kind: "out", st });
          setLines([...done]);
          await sleep(700); if (!alive) return;
        }
        setLines([...done, { kind: "prompt" }]);
        await sleep(3200);
      }
    })();
    return () => { alive = false; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <div className="cm-term" aria-label="Python terminal: print Hi students, print Let's learn AI">
      <div className="cm-term__in">
        <div className="cm-term__bar"><i /><i /><i /><span>hello_ai.py</span></div>
        <div className="cm-term__body">
          {lines.map((l, i) =>
            l.kind === "cmd" ? (
              <Command key={i} st={l.st} n={l.n} cursor={l.cursor} />
            ) : l.kind === "out" ? (
              <motion.div
                key={i}
                className={`cm-term__out ${l.st.ok ? "is-ok" : ""}`}
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {l.st.out}
              </motion.div>
            ) : (
              <div key={i}><span className="cm-term__pr">&gt;&gt;&gt;</span><span className="cm-term__cur" /></div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function ClassCard() {
  const reduce = useReducedMotion();
  const roam = (r) =>
    reduce
      ? {}
      : {
          animate: { x: r.x, y: r.y, rotate: r.rotate || 0 },
          transition: { duration: r.duration, repeat: Infinity, ease: "easeInOut" },
        };

  return (
    <div className="cm-cc-stage">
      {ROAMERS.map((r) => (
        <motion.div key={r.label} className={`cm-roam cm-roam--${r.pos}`} aria-hidden="true" {...roam(r)}>
          <span className="cm-roam__tag">{!r.plain && <i />}{r.label}</span>
        </motion.div>
      ))}
      {SPARKS.map((s) => (
        <motion.div key={s.pos} className={`cm-roam cm-roam--front cm-roam--${s.pos}`} aria-hidden="true" {...roam(s)}>
          <span className={`cm-spark ${s.small ? "cm-spark--sm" : ""}`} />
        </motion.div>
      ))}

      <motion.article
        className="cm-cc"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <span className="cm-cc__live"><i />Live classes · Grades 8–11</span>
        <p className="cm-cc__time">
          Classes: {COURSE.timing}
          <br />
          {COURSE.days}
        </p>
        <hr className="cm-cc__rule" />
        <Terminal />
        <div className="cm-cc__foot">
          <span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" /></svg>
            Certificate
          </span>
          <span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /></svg>
            Monthly report for parents
          </span>
        </div>
      </motion.article>
    </div>
  );
}
