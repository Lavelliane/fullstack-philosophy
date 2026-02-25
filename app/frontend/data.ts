// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_SECTIONS = [
  { id: "s1", label: "The Three Roles", number: "01" },
  { id: "s2", label: "Components", number: "02" },
  { id: "s3", label: "State", number: "03" },
  { id: "s4", label: "Fetching Data", number: "04" },
  { id: "s5", label: "Routing", number: "05" },
  { id: "s6", label: "The Checklist", number: "06" },
];

// ─── Section 1: The Three Roles ──────────────────────────────────────────────

export const threeRolesCode = `<!-- HTML: the skeleton (what exists) -->
<button class="btn-primary" id="enroll-btn">
  Enroll in Course
</button>

/* CSS: the skin (how it looks) */
.btn-primary {
  background: #0f172a;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}

// JavaScript: the nervous system (what it does)
document.getElementById('enroll-btn')
  .addEventListener('click', () => {
    enroll(student.id, courseId);
  });`;

export const threeRolesHtmlCode = `<!-- HTML: the skeleton (what exists) -->
<button class="btn-primary" id="enroll-btn">
  Enroll in Course
</button>`;

export const threeRolesCssCode = `/* CSS: the skin (how it looks) */
.btn-primary {
  background: #0f172a;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}`;

export const threeRolesJsCode = `// JavaScript: the nervous system (what it does)
document.getElementById('enroll-btn')
  .addEventListener('click', () => {
    enroll(student.id, courseId); // your own function, defined elsewhere
  });`;

export const threeRolesBadCode = `<!-- Bad: mixing all three concerns -->
<button
  style="background:#0f172a; color:white; padding:8px 16px"
  onclick="fetch('/api/students/'+studentId+'/enroll', { method: 'POST' })"
>
  Enroll in Course
</button>`;

export const threeRolesQuiz = {
  question:
    "The design team wants enrolled students' names to display in green. Which file should change?",
  options: [
    { id: "a", label: "The HTML file (the student name element lives there)" },
    { id: "b", label: "The CSS file (appearance is CSS's responsibility)" },
    { id: "c", label: "The JavaScript file (enrollment status lives there)" },
    { id: "d", label: "All three files need to be updated" },
  ],
  correctId: "b",
  explanation:
    "Appearance belongs to CSS. If each concern is properly separated, the designer only touches the CSS file. The HTML structure and JS behavior don't change at all. This is why separation of concerns matters.",
};

export const rolesMatchPairs = [
  { left: "HTML", right: "Defines what elements exist on the page" },
  { left: "CSS", right: "Controls layout, color, and visual style" },
  { left: "JavaScript", right: "Responds to events and updates content" },
  { left: "Browser", right: "Runs all three and renders the result" },
];

export const rolesBucketItems = [
  { id: "font-size", label: "font-size: 16px" },
  { id: "click-handler", label: "button.addEventListener('click', ...)" },
  { id: "p-tag", label: "<p>GPA: 3.8</p>" },
  { id: "display-flex", label: "display: flex" },
  { id: "fetch-api", label: "fetch('/api/students')" },
  { id: "h1-tag", label: "<h1>Student Portal</h1>" },
  { id: "color", label: "color: #333" },
  { id: "form-tag", label: "<form action='/enroll'>" },
];

export const rolesBucketBuckets = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "js", label: "JavaScript" },
];

export const rolesBucketMapping: Record<string, string> = {
  "font-size": "css",
  "click-handler": "js",
  "p-tag": "html",
  "display-flex": "css",
  "fetch-api": "js",
  "h1-tag": "html",
  color: "css",
  "form-tag": "html",
};

// ─── Section 2: Components ───────────────────────────────────────────────────

export const componentBadCode = `<!-- Bad: copy-pasting the same structure everywhere -->
<div class="card">
  <img src="/ana.jpg" />
  <h3>Ana Reyes</h3>
  <p>Year 3 · GPA 3.9</p>
</div>
<div class="card">
  <img src="/ben.jpg" />
  <h3>Ben Cruz</h3>
  <p>Year 2 · GPA 3.5</p>
</div>
<!-- If the card design changes, update every copy -->`;

export const componentGoodCode = `// Good: one component, used everywhere
function StudentCard({ name, year, gpa, avatar }) {
  return (
    <div className="card">
      <img src={avatar} />
      <h3>{name}</h3>
      <p>Year {year} · GPA {gpa}</p>
    </div>
  );
}

// If the card design changes, change it once
<StudentCard name="Ana Reyes" year={3} gpa={3.9} avatar="/ana.jpg" />
<StudentCard name="Ben Cruz"  year={2} gpa={3.5} avatar="/ben.jpg"  />`;

/** 12-student scenario for copy-paste vs reuse comparison */
export const componentComparisonBadCode = `<!-- Bad: copy the same card 12 times -->
<div class="card">
  <img src="/ana.jpg" /><h3>Ana Reyes</h3><p>Year 3 · GPA 3.9</p>
</div>
<div class="card">
  <img src="/ben.jpg" /><h3>Ben Cruz</h3><p>Year 2 · GPA 3.5</p>
</div>
<!-- ... 10 more identical blocks ... -->
<div class="card">
  <img src="/student12.jpg" /><h3>...</h3><p>...</p>
</div>
<!-- Change the card design? Update 12 places. -->`;

export const componentComparisonGoodCode = `// Good: one component, students.map(...)
function StudentCard({ name, year, gpa, avatar }) {
  return (
    <div className="card">
      <img src={avatar} /><h3>{name}</h3><p>Year {year} · GPA {gpa}</p>
    </div>
  );
}

{students.map(s => (
  <StudentCard key={s.id} name={s.name} year={s.year} gpa={s.gpa} avatar={s.avatar} />
))}
// 12 students? One loop. Change the card? Change it once.`;

export const compositionCode = `// A page is just components all the way down
function StudentDashboard() {
  return (
    <Layout>
      <NavBar />
      <main>
        <StudentCard student={currentStudent} />
        <CourseList courses={enrolledCourses} />
        <GpaChart gpa={currentStudent.gpa} />
      </main>
      <Footer />
    </Layout>
  );
}

// Each component owns its own markup, style, and behavior
// Swap or reorder them without touching the others`;

/** Intro: what props are and what they can be */
export const propsIntroCode = `// Props = inputs parent passes to child (like function args)

// Types: data, functions (callbacks), or children
<StudentCard name="Ana" year={3} gpa={3.9} />   // data
<Button onClick={handleSave} />                 // callback
<Card><Badge>Dean's List</Badge></Card>         // children

// Read-only. Child cannot modify them.`;

export const propsCode = `// Same component, different props → different output
function Button({ label, variant, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

<Button label="Save" variant="primary" onClick={handleSave} />
<Button label="Cancel" variant="secondary" onClick={handleCancel} />`;

export const propsFlowLoopCode = `// Parent owns state → passes props → child renders
function Parent() {
  const [student, setStudent] = useState(null);
  return <StudentCard student={student} />;
}

function StudentCard({ student }) {
  return <div>{student?.fullName}, GPA: {student?.gpa}</div>;
}
// State change → re-render → new props flow down`;

export const propsSourcesCode = `// Where do props come from? Always the parent.

// State, pass-through, fetched, derived, or hardcoded
const [students, setStudents] = useState([]);
<StudentList students={students} />

function Layout({ student }) {
  return <Header student={student} />;  // pass-through
}`;

/** Child to parent: pass callbacks as props. Child invokes the callback with data. */
export const childToParentCode = `// Pass function as prop. Child calls it with data.
function Parent() {
  const [selected, setSelected] = useState(null);
  return (
    <CourseList
      courses={courses}
      onSelect={(c) => setSelected(c)}
    />
  );
}

function CourseList({ courses, onSelect }) {
  return (
    <ul>
      {courses.map((c) => (
        <li key={c.id}>
          <button onClick={() => onSelect(c)}>{c.name}</button>
        </li>
      ))}
    </ul>
  );
}`;

export const childrenCode = `// children = content between tags
function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

<Badge>Dean's List</Badge>
<Badge><strong>Honor Roll</strong></Badge>`;

export const componentQuiz = {
  question:
    "You build a StudentCard component and use it 50 times across the portal. You need to add a 'Dean's List' badge to every card. What do you change?",
  options: [
    { id: "a", label: "Update all 50 usages of StudentCard across the codebase" },
    { id: "b", label: "Update the StudentCard component once" },
    { id: "c", label: "Create a new DeansListStudentCard and replace all 50 usages" },
    { id: "d", label: "Add the badge with CSS only" },
  ],
  correctId: "b",
  explanation:
    "This is the core value of components: one definition, used everywhere. Updating the component once propagates the change to all 50 instances automatically. This is why you build components instead of copy-pasting HTML.",
};

export const componentDragSortItems = [
  { id: "define", label: "Define the function: function StudentCard({ name, year, gpa })" },
  { id: "markup", label: "Return JSX with the markup: <div><h3>{name}</h3><p>Year {year} · GPA {gpa}</p></div>" },
  { id: "export", label: "Export the component: export default StudentCard" },
  { id: "import", label: "Import it where needed: import StudentCard from './StudentCard'" },
  { id: "use", label: "Use it with props: <StudentCard name='Ana Reyes' year={3} gpa={3.9} />" },
];

export const componentDragSortCorrectOrder = [
  "define",
  "markup",
  "export",
  "import",
  "use",
];

export const propsMatchPairs = [
  {
    left: "Props",
    right: "Inputs a parent passes to a child. Can be data, callbacks (onClick, onSelect), or children. Read-only — the child cannot modify them.",
  },
  {
    left: "Component",
    right: "A reusable UI block (e.g. StudentCard, Button). Define once, use everywhere. Change it once, it updates everywhere.",
  },
  {
    left: "One-way flow",
    right: "Props flow parent → child. State change → re-render → new props flow down. Child communicates up by calling callback props the parent passed down.",
  },
  {
    left: "Composition",
    right: "Nesting smaller components inside larger ones. A page is Layout with NavBar, content, and Footer. Components all the way down.",
  },
  {
    left: "Children",
    right: "The content between a component's tags. Whatever goes inside <Card>...</Card> becomes the children prop.",
  },
  {
    left: "Callback props",
    right: "Pass a function as a prop (onSelect, onChange). Child calls it with data when something happens. Parent's handler updates state.",
  },
];

// ─── Section 3: State ────────────────────────────────────────────────────────

export const localStateCode = `// Local state: owned by one component
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // initial value: 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

// When setCount is called → state changes → component re-renders
// The core loop: action → state change → UI update`;

export const liftStateCode = `// Lift state up when multiple components need the same data
function EnrollmentPanel() {
  const [enrolled, setEnrolled] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <CourseList onEnroll={(c) => setEnrolled([...enrolled, c])} />
      <EnrolledSummary courses={enrolled} />
      {submitted ? <Submitted onReset={() => { setEnrolled([]); setSubmitted(false); }} />
        : <SubmitButton disabled={!enrolled.length} onClick={() => setSubmitted(true)} />}
    </div>
  );
}

// Parent owns enrolled + submitted. All children react.`;

export const derivedStateCode = `// Derived state: compute from existing state, don't duplicate it
function StudentGrades({ grades }) {
  // Don't do this: const [average, setAverage] = useState(0)
  // Keeping two pieces of state in sync is a source of bugs

  const average = grades.reduce((sum, g) => sum + g.score, 0) / grades.length;
  const gradeCount = grades.length;
  const isHonors = average >= 3.5;

  // average, gradeCount, isHonors are derived; they update automatically
  // when grades changes. No extra state needed.
}`;

export const stateQuiz = {
  question:
    "A dropdown menu needs to track whether it's open or closed. Where should this state live?",
  options: [
    { id: "a", label: "In a global state store (other components might need it)" },
    { id: "b", label: "In the Dropdown component itself (only it needs to know)" },
    { id: "c", label: "In the parent page component that renders the dropdown" },
    { id: "d", label: "In a URL query parameter so the state persists" },
  ],
  correctId: "b",
  explanation:
    "Keep state as close to where it's used as possible. Whether a dropdown is open is local UI state. No other component needs it. Putting it in global state would be over-engineering. Lift state up only when multiple siblings need it.",
};

export const stateLoopDragItems = [
  { id: "action", label: "User performs an action (click, type, submit)" },
  { id: "handler", label: "Event handler is called" },
  { id: "setState", label: "State update function is called with new value" },
  { id: "rerender", label: "Component re-renders with the new state" },
  { id: "ui", label: "User sees the updated UI" },
];

export const stateLoopCorrectOrder = [
  "action",
  "handler",
  "setState",
  "rerender",
  "ui",
];

export const stateBucketItems = [
  { id: "toggle", label: "Modal open/closed" },
  { id: "enrolled", label: "Enrolled courses list" },
  { id: "input", label: "Student search input value" },
  { id: "user", label: "Logged-in student/admin info" },
  { id: "tab", label: "Active tab in student profile" },
  { id: "theme", label: "Light / dark mode preference" },
  { id: "hover", label: "Whether a button is hovered" },
  { id: "form", label: "Enrollment form field values" },
];

export const stateBucketBuckets = [
  { id: "local", label: "Local State" },
  { id: "global", label: "Global State" },
];

export const stateBucketMapping: Record<string, string> = {
  toggle: "local",
  enrolled: "global",
  input: "local",
  user: "global",
  tab: "local",
  theme: "global",
  hover: "local",
  form: "local",
};

// ─── Section 4: Fetching Data ─────────────────────────────────────────────────

export const fetchComponentCode = `// In React: model all three states in your component
function StudentProfile({ studentId }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(\`/api/students/\${studentId}\`)
      .then(res => res.json())
      .then(data => {
        setStudent(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) return <Skeleton />;           // loading state
  if (error)   return <ErrorMessage />;       // error state
  return <StudentCard student={student} />;   // success state
}`;

export const fetchStateBadCode = `// Bad: only handling the happy path
function StudentProfile({ studentId }) {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(\`/api/students/\${studentId}\`)
      .then(res => res.json())
      .then(setStudent);
    // No loading state → blank screen while fetching
    // No error handling → silent failure
  }, [studentId]);

  return <StudentCard student={student} />; // crashes if student is null
}`;

export const fetchStateGoodCode = `// Good: all three states handled explicitly
function StudentProfile({ studentId }) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setState({ data: null, loading: true, error: null });
    fetch(\`/api/students/\${studentId}\`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => setState({ data: null, loading: false, error: err }));
  }, [studentId]);

  if (state.loading) return <Skeleton />;
  if (state.error)   return <ErrorMessage error={state.error} />;
  return <StudentCard student={state.data} />;
}`;

export const fetchQuiz = {
  question:
    "Your fetch to GET /students/42 succeeds and returns data, but the component crashes on render. What's the most likely cause?",
  options: [
    { id: "a", label: "The network request was too slow" },
    { id: "b", label: "The component tried to render before data arrived, and state was null" },
    { id: "c", label: "The API returned the wrong HTTP status code" },
    { id: "d", label: "React does not support async operations" },
  ],
  correctId: "b",
  explanation:
    "Without a loading state, the component renders immediately with null data. Accessing null.fullName or null.gpa throws an error. Always initialize state to a safe value and show a loader until the data arrives.",
};

export const fetchStatesMatchPairs = [
  { left: "loading: true", right: "Show a skeleton or spinner" },
  { left: "error: 'Student not found'", right: "Show an error message with retry" },
  { left: "data: { fullName: 'Ana Reyes', gpa: 3.9 }", right: "Render the actual content" },
  { left: "stale data + re-fetching", right: "Show old content with a subtle refresh indicator" },
];

export const fetchDragSortItems = [
  { id: "trigger", label: "Component mounts or studentId changes" },
  { id: "set-loading", label: "Set loading: true, clear previous error" },
  { id: "fetch", label: "fetch('/api/students/id') is called" },
  { id: "await", label: "Await the response from the server" },
  { id: "parse", label: "Parse the JSON response body" },
  { id: "set-data", label: "Set data in state, set loading: false" },
  { id: "render", label: "Component re-renders with the real student data" },
];

export const fetchDragSortCorrectOrder = [
  "trigger",
  "set-loading",
  "fetch",
  "await",
  "parse",
  "set-data",
  "render",
];

// ─── Section 5: Routing ───────────────────────────────────────────────────────

export const routingCode = `// Declarative routing: URL → Component
// React Router v6 (npm install react-router-dom)
<Routes>
  <Route path="/"              element={<Home />} />
  <Route path="/students"      element={<StudentList />} />
  <Route path="/students/:id"  element={<StudentProfile />} />
  <Route path="*"              element={<NotFound />} />
</Routes>

// The browser URL changes, but the page never fully reloads
// JavaScript swaps out which component is shown`;

export const urlStateCode = `// The URL is state: treat it as the source of truth
function StudentProfile() {
  const { id } = useParams();       // /students/42 → id = "42"
  const [tab] = useSearchParams();  // /students/42?tab=grades

  // If the user refreshes, shares the link, or hits back:
  // the URL preserves exactly where they were
}

// Navigating programmatically
const navigate = useNavigate();
navigate('/students');                    // pushes to history
navigate('/login', { replace: true });    // replaces (no back)`;

export const routingQuiz = {
  question:
    "A student fills out a multi-step enrollment form and accidentally refreshes the browser. The form resets to step 1. What's the root cause?",
  options: [
    { id: "a", label: "The form was using local component state, not the URL" },
    { id: "b", label: "The browser always clears state on refresh (nothing can prevent this)" },
    { id: "c", label: "The CSS was not cached properly" },
    { id: "d", label: "The fetch request failed and the form reset itself" },
  ],
  correctId: "a",
  explanation:
    "Local state lives in memory and disappears on refresh. If the current step were in the URL (/enroll/step-2), a refresh would restore the student to the correct step. The URL is the only state that survives a page reload.",
};

export const routingMatchPairs = [
  { left: "/students/:id", right: "Dynamic route: id changes per student" },
  { left: "useNavigate()", right: "Programmatically move to a different route" },
  { left: "404 route (*)", right: "Catch-all for unmatched URLs" },
  { left: "replace: true", right: "Navigate without adding to browser history" },
];

export const routingBucketItems = [
  { id: "spa-nav", label: "Clicking a <Link> without page reload" },
  { id: "full-reload", label: "Pressing F5 / browser refresh" },
  { id: "back-btn", label: "Browser back button" },
  { id: "url-params", label: "Reading :id from /students/:id" },
  { id: "query-string", label: "?tab=grades in /students/42?tab=grades" },
  { id: "history-push", label: "navigate('/students') in JavaScript" },
  { id: "redirect", label: "navigate('/login', { replace: true })" },
];

export const routingBucketBuckets = [
  { id: "spa", label: "SPA Navigation (no reload)" },
  { id: "url-state", label: "URL as State" },
];

export const routingBucketMapping: Record<string, string> = {
  "spa-nav": "spa",
  "full-reload": "url-state",
  "back-btn": "spa",
  "url-params": "url-state",
  "query-string": "url-state",
  "history-push": "spa",
  redirect: "spa",
};

// ─── Section 6: Checklist ────────────────────────────────────────────────────

export const checklistSteps = [
  {
    title: "Route /students/:id renders <StudentProfile />",
    content:
      "The router matches the URL and mounts the correct component. The :id param is available via useParams().",
    code: `// Router config
<Route path="/students/:id" element={<StudentProfile />} />

// Inside StudentProfile
const { id } = useParams(); // "42"`,
  },
  {
    title: "Component mounts → fetch fires for student data",
    content:
      "useEffect with [id] as dependency runs after the first render. The fetch begins, loading state is true.",
    code: `useEffect(() => {
  setLoading(true);
  fetch(\`/api/students/\${id}\`)
    .then(r => r.json())
    .then(setStudent)
    .catch(setError)
    .finally(() => setLoading(false));
}, [id]);`,
  },
  {
    title: "While fetching → show a <Skeleton /> loader",
    content:
      "The loading state is true, so the component renders a skeleton. The user sees immediate feedback with no blank screen.",
    code: `if (loading) return (
  <div className="space-y-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-4 w-32" />
  </div>
);`,
  },
  {
    title: "On success → pass data as props to child components",
    content:
      "Student data arrives, state updates, component re-renders. The data flows down as props to StudentCard and CourseList.",
    code: `return (
  <div>
    <StudentCard
      name={student.fullName}
      gpa={student.gpa}
      status={student.enrollment_status}
    />
    <CourseList courses={student.courses} />
  </div>
);`,
  },
  {
    title: "On error → show <ErrorMessage /> with retry",
    content:
      "If the fetch fails (e.g. student not found → 404), the error state is set. The user sees a meaningful message and a way to try again.",
    code: `if (error) return (
  <ErrorMessage
    message="Couldn't load this student's profile."
    onRetry={() => setRetryKey(k => k + 1)}
  />
);`,
  },
  {
    title: "User clicks 'Edit GPA' → local state toggles to edit mode",
    content:
      "A boolean isEditing state switches the rendered view. No new fetch, just a state change causing a re-render.",
    code: `const [isEditing, setIsEditing] = useState(false);

// In JSX:
{isEditing
  ? <GpaEditForm student={student} onSave={handleSave} />
  : <StudentCard student={student} onEdit={() => setIsEditing(true)} />
}`,
  },
  {
    title: "On save → PATCH /students/:id/gpa → update state",
    content:
      "The edit form submits. A PATCH fires to the backend, matching the backend's PATCH /students/:id/gpa endpoint. On success, local state updates with the new GPA with no full page reload.",
    code: `async function handleSave({ gpa }) {
  const res = await fetch(\`/api/students/\${id}/gpa\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gpa }),
  });
  const updated = await res.json();
  setStudent(updated);    // update state with fresh data
  setIsEditing(false);    // return to view mode
}`,
  },
];

export const finalQuizzes = [
  {
    question:
      "Which language is responsible for making the 'Enroll' button change color when hovered?",
    options: [
      { id: "a", label: "HTML (the button is defined there)" },
      { id: "b", label: "JavaScript (hover is an event)" },
      { id: "c", label: "CSS (appearance and state styling belong to CSS)" },
      { id: "d", label: "All three equally" },
    ],
    correctId: "c",
    explanation:
      "The :hover pseudo-class is pure CSS. HTML says 'a button exists', CSS says 'when hovered, it looks like this'. JavaScript is not needed for visual hover effects.",
  },
  {
    question:
      "An unread-message badge should appear in both the top NavBar and the student sidebar. Where should the unread count state live?",
    options: [
      { id: "a", label: "Inside <NavBar /> (it rendered first)" },
      { id: "b", label: "Inside <Sidebar /> (it's more visible there)" },
      { id: "c", label: "In a common parent or global state (both components need it)" },
      { id: "d", label: "In the badge component itself" },
    ],
    correctId: "c",
    explanation:
      "When two components need the same state, lift it to their closest common ancestor, or use global state. Local state is invisible to siblings. This is the 'lift state up' principle.",
  },
  {
    question:
      "A user visits /students/99 and gets a blank screen with no error message. GET /students/99 returned a 404. What went wrong?",
    options: [
      { id: "a", label: "The router did not match the URL" },
      { id: "b", label: "The developer only handled the success state, not the error state" },
      { id: "c", label: "The component was missing its CSS" },
      { id: "d", label: "The URL parameter :id was not passed as a prop" },
    ],
    correctId: "b",
    explanation:
      "A 404 response is a failed fetch. If the error state is not handled, the UI renders nothing (or crashes). Every fetch needs a loading branch, a success branch, and an error branch.",
  },
  {
    question:
      "A student fills a 3-step enrollment form, refreshes on step 2, and is sent back to step 1. What would prevent this?",
    options: [
      { id: "a", label: "Storing the current step in the URL (e.g., /enroll?step=2)" },
      { id: "b", label: "Using a larger React state object" },
      { id: "c", label: "Disabling the browser refresh button" },
      { id: "d", label: "Caching the component with localStorage" },
    ],
    correctId: "a",
    explanation:
      "The URL is the only state that survives a page reload. If the current step is encoded in the URL, a refresh restores the student to exactly where they were. localStorage also works, but the URL is the canonical answer for navigation state.",
  },
  {
    question:
      "You have a StudentCard component used in 40 places across the portal. The designer wants to add an avatar image to every card. What do you change?",
    options: [
      { id: "a", label: "Update all 40 usages of StudentCard individually" },
      { id: "b", label: "Update the StudentCard component definition once" },
      { id: "c", label: "Create a new AvatarStudentCard and replace all 40 usages" },
      { id: "d", label: "Use CSS to inject the image without touching the component" },
    ],
    correctId: "b",
    explanation:
      "This is exactly why components exist: define once, use everywhere. Updating the component definition propagates the change to all 40 instances automatically. No find-and-replace needed.",
  },
  {
    question:
      "After a successful PATCH to /api/students/42/gpa, what should the component do next?",
    options: [
      { id: "a", label: "Reload the entire page to show the updated GPA" },
      { id: "b", label: "Update local state with the response data and return to view mode" },
      { id: "c", label: "Redirect the user to the student list" },
      { id: "d", label: "Nothing — the server update is enough, the UI will sync on its own" },
    ],
    correctId: "b",
    explanation:
      "After a successful PATCH, update the React state with the server's response (so the UI reflects the new GPA immediately) and exit edit mode. No page reload — React re-renders only what changed. This is the full cycle: fetch → state → re-render.",
  },
];
