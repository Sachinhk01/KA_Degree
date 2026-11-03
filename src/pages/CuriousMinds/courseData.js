// All page content lives here. Change fees, timings or text in this one file.

export const COURSE = {
  name: "AI Foundations for School Students",
  grades: "Grades 8, 9, 10 & 11",
  duration: "12 weeks",
  timing: "7 PM – 8 PM",
  days: "3 days a week",
  sessions: 36,
  feeTotal: 4500,
  feeMonthly: 1500,
  months: 3,
  perSession: 125,
  whatsapp: "917975902348",
  whatsappLabel: "79759 02348",
  site: "https://kadegree.in",
};

export const NAV_LINKS = [
  { label: "Parents", href: "#parents" },
  { label: "Students", href: "#students" },
  { label: "12 weeks", href: "#learn" },
  { label: "Fees", href: "#fees" },
  { label: "FAQ", href: "#faq" },
];

// Scrolling strip under the top section
export const TOPICS = [
  "Python", "Machine learning", "Chatbots", "Data stories", "Image recognition",
  "Prompt writing", "Algorithms", "Generative AI", "Responsible AI", "Capstone project",
];

export const JOURNEY = [
  { label: "Meet AI", icon: "chip" },
  { label: "Python", icon: "code" },
  { label: "Data", icon: "bars" },
  { label: "Machine learning", icon: "nodes" },
  { label: "5 projects", icon: "layers" },
  { label: "Certificate", icon: "medal" },
];

export const PARENT_REASONS = [
  {
    title: "Useful in every stream",
    text: "Science, Commerce or Arts. Doctor, designer, banker or entrepreneur, AI is becoming part of how every field works.",
  },
  {
    title: "Fundamentals, not just apps",
    text: "Apps change every year; the ideas underneath don’t. Your child learns how AI learns, thinks and gets things wrong.",
  },
  {
    title: "Better use of screen time",
    text: "7 to 8 PM is the hour most children lose to their phones. Here it turns into Python skills and real projects.",
  },
];

export const PARENT_SUPPORT = [
  "Monthly progress report",
  "Recorded demos after every class",
  "Doubt-clearing window",
  "Extra practice problems",
];

export const STUDENT_OUTCOMES = [
  "Explain AI, ML and generative AI with real examples",
  "Write Python programs and solve problems with algorithms",
  "Clean, chart and make sense of data",
  "Train a simple ML model and check how good it is",
  "Write strong prompts and use AI honestly for study",
  "Dream up your own AI idea and plan how to build it",
];

export const CLASS_FLOW = [
  { step: "Warm-up", text: "A quick quiz to wake your brain up." },
  { step: "Live demo", text: "See the idea working before you learn how." },
  { step: "Hands-on", text: "Build it yourself in the browser, with help on hand." },
];

export const CAPSTONE_IDEAS = [
  "A study helper that quizzes you from your notes",
  "A predictor for marks, sports scores or weather",
  "A no-code chatbot for school or a hobby",
  "A classifier for a problem in your community",
];

export const CURRICULUM = [
  {
    month: "Month 1",
    theme: "Foundation",
    title: "Meet AI and learn Python from zero",
    weeks: [
      { n: 1, title: "Meet AI", text: "AI vs ML vs deep learning vs generative AI; AI across industries; tool tour." },
      { n: 2, title: "Python I", text: "Variables, data types, input, operators, decisions." },
      { n: 3, title: "Python II", text: "Loops, lists, strings, functions.", tag: "Mini Project 1 · quiz game or tracker" },
      { n: 4, title: "Python III", text: "Dictionaries, files, debugging, flowcharts.", tag: "Checkpoint 1" },
    ],
  },
  {
    month: "Month 2",
    theme: "Problem-solving & data",
    title: "Think like a programmer, understand data",
    weeks: [
      { n: 5, title: "Searching", text: "Algorithms, Big-O intuition, linear and binary search." },
      { n: 6, title: "Sorting, stacks & queues", text: "Undo buttons, ticket counters, token-queue simulator." },
      { n: 7, title: "Hash maps, recursion, graphs", text: "Route finding, trees, and how AI uses them." },
      { n: 8, title: "Data foundations", text: "Spreadsheets, charts, statistics, bias.", tag: "Mini Project 2 · data story" },
    ],
  },
  {
    month: "Month 3",
    theme: "AI in action",
    title: "Build, test and present real AI ideas",
    weeks: [
      { n: 9, title: "Machine learning", text: "Regression, classification, accuracy.", tag: "Mini Project 3 · simple predictor" },
      { n: 10, title: "Vision & language", text: "Neural nets, image recognition, sentiment.", tag: "Mini Project 4 · classifier demo" },
      { n: 11, title: "Generative AI", text: "How LLMs work, prompt writing, agents, a simple chatbot." },
      { n: 12, title: "Responsible AI & Capstone", text: "Bias, privacy, deepfakes, what’s next.", tag: "Capstone showcase & certificate" },
    ],
  },
];

export const FAQS = [
  {
    q: "My child has never coded. Is that a problem?",
    a: "Not at all. We start from zero. Everything runs in the browser, so all your child needs is a laptop or desktop with internet.",
  },
  {
    q: "Will it clash with school and tuition?",
    a: "It’s one hour, three evenings a week, for three months. Recorded demos cover any class your child misses.",
  },
  {
    q: "How will I know my child is progressing?",
    a: "You get a monthly progress report. Marks come from weekly quizzes, assignments, 4 mini projects, 3 checkpoints and the capstone.",
  },
  {
    q: "Does my child get a certificate?",
    a: "Yes. Students who score 50% or more overall and present their capstone receive the KA Degree course certificate.",
  },
];
