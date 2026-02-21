export const NAV_SECTIONS = [
  { id: "s1", label: "The Split", number: "01" },
  { id: "s2", label: "The Handshake", number: "02" },
];

export const mapLegend = [
  {
    title: "Frontend",
    detail: "Shapes interaction and communicates intent through requests.",
  },
  {
    title: "API Contract",
    detail: "Defines shared language, payload shape, and expected response.",
  },
  {
    title: "Backend",
    detail: "Protects rules, checks identity, and persists meaningful state.",
  },
];

export const journeySteps = [
  {
    id: "browser",
    title: "Browser",
    description: "A student clicks Enroll. Intent begins here.",
    whyItMatters:
      "The user gives trust before they get proof. The interface has to respond with clarity.",
  },
  {
    id: "frontend",
    title: "Frontend",
    description: "The interface sends a request and prepares feedback.",
    whyItMatters:
      "People feel speed through feedback. Even small loading and success states shape confidence.",
  },
  {
    id: "api",
    title: "API Contract",
    description: "A shared language carries meaning between both sides.",
    whyItMatters:
      "When request and response contracts are clear, teams move faster with fewer misunderstandings.",
  },
  {
    id: "backend",
    title: "Backend",
    description: "Rules are checked. Permissions are respected.",
    whyItMatters:
      "This is where fairness lives. The backend decides what is valid and what is safe.",
  },
  {
    id: "database",
    title: "Database",
    description: "The decision is saved so memory outlives the moment.",
    whyItMatters:
      "Without durable memory, trust disappears after every refresh and every session.",
  },
  {
    id: "response",
    title: "Response",
    description: "The result returns home and the UI updates.",
    whyItMatters:
      "This closes the loop. A clean response gives the frontend confidence to guide the next action.",
  },
] as const;

export const fullStackPrinciples = [
  "Frontend and backend are not competing specialties. They are one product loop.",
  "A clean contract reduces accidental complexity and supports team trust.",
  "Good full stack work is not only about speed. It is about emotional clarity for users.",
];
