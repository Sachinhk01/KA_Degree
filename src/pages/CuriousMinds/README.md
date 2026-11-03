# Curious Minds page for kadegree.in

## Files
- `CuriousMinds.jsx`: the page (React)
- `CuriousMinds.css`: all styles; every class starts with `cm-` so it won't affect the rest of the site
- `courseData.js`: all text, fees, timings and the WhatsApp number. Edit this file to change content.
- `hooks.js`: scroll-reveal and count-up helpers (plain JavaScript, no libraries)
- `Icons.jsx`: the line icons

## Add it to the site (kadegree-client)
1. Copy this whole `CuriousMinds` folder into `src/pages/`.
2. Add a route where your other routes are defined (react-router):

```jsx
import CuriousMinds from "./pages/CuriousMinds/CuriousMinds";

<Route path="/curious-minds" element={<CuriousMinds showWhatsApp={false} />} />
```

   Use `showWhatsApp={false}` if your layout already shows the green WhatsApp button; otherwise leave it out.
3. Add a "Curious Minds" link to the site menu pointing to `/curious-minds`.
4. On Vercel, client-side routes need a rewrite so `/curious-minds` doesn't 404 on refresh. If you don't already have one, add `vercel.json` at the project root:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

No new npm packages are needed.

## Animations used
- Sections fade up once as they scroll into view
- The gold dot travels along the course path once
- The ₹4,500 fee counts up once
- Buttons and cards lift slightly on hover
- Month cards and questions open smoothly

All of them switch off automatically on phones set to "reduce motion".
