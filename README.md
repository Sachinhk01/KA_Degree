# KA Degree · Curious Minds

Landing page for **AI Foundations for School Students** (Grades 8–11), built with React + Vite, Framer Motion and plain CSS.

## Run it
```bash
npm install
npm run dev      # opens at http://localhost:5173
npm run build    # production build in /dist
```

## Edit content
All text, fees, timings, the curriculum, FAQs and the WhatsApp number are in
`src/pages/CuriousMinds/courseData.js`. You don't need to touch the page code to change them.

## Project layout
```
index.html                        page title + SEO/share tags
src/main.jsx                      mounts the page
src/pages/CuriousMinds/
  CuriousMinds.jsx                the page (all sections)
  NeuralHead.jsx                  neural-network profile (top section, right side)
  ClassCard.jsx                   class card with typing terminal and drifting tags
  CuriousMinds.css                styles (all classes start with cm-)
  courseData.js                   content
  TeachAI.jsx                     the "Teach the AI" game in the top section
  hooks.js                        scroll reveal + count-up
  Icons.jsx                       line icons
vercel.json                       lets refreshes work on Vercel
```

## Option A: deploy on its own
Push this folder to GitHub, import it in Vercel (framework: Vite), and add a domain such as
`curiousminds.kadegree.in`.

## Option B: add it to kadegree.in (kadegree-client)
1. Copy `src/pages/CuriousMinds` into `src/pages/` of the main site.
2. Add a route:
   ```jsx
   import CuriousMinds from "./pages/CuriousMinds/CuriousMinds";
   <Route path="/curious-minds" element={<CuriousMinds showNav={false} showWhatsApp={false} />} />
   ```
   `showNav={false}` hides this page's own top bar (your site already has one); `showWhatsApp={false}` hides the WhatsApp button if your layout already shows it.
   Run `npm install framer-motion` in the main site too.
3. Add a "Curious Minds" link to the menu.
4. If the main site has no `vercel.json` rewrite yet, add the one from this folder so `/curious-minds` doesn't 404 on refresh.

## Top section + class card
- `NeuralHead.jsx` draws the right side of the top section: a student's side profile with a glowing
  neural network inside the head and four floating badges (positions in `courseData.js` → `HERO_BADGES`).
- `ClassCard.jsx` is the minimal card under the top section: live tag, class timing, a Python window that
  types `print("Hi students 👋")` / `print("Let's learn AI")`, and tags drifting around it.
  Change the typed lines in `STEPS` and the drifting tags in `ROAMERS` at the top of that file.

## Animations (Framer Motion, kept light)
- Top bar slides down on load; the mobile menu opens and closes smoothly
- Headline words rise in one by one, then a gold underline draws under "School Students."
- The profile fades in; glowing signals travel through the network inside the head, dots twinkle,
  and the four icon badges pop in and float gently
- The class card rises in; its Python window types on a loop; five small tags drift around it
- Sections fade up once as you scroll; the course-path dot travels once; the fee counts up once

Everything switches off for users with "reduce motion" turned on.
"# KA_Degree" 
