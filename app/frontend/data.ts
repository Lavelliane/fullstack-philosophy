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

export const threeRolesCode = `<!-- HTML: the skeleton — what exists -->
<button class="btn-primary" id="subscribe-btn">
  Subscribe
</button>

/* CSS: the skin — how it looks */
.btn-primary {
  background: #0f172a;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}

// JavaScript: the nervous system — what it does
document.getElementById('subscribe-btn')
  .addEventListener('click', () => {
    subscribe(currentUser.id);
  });`;

export const threeRolesHtmlCode = `<!-- HTML: the skeleton — what exists -->
<button class="btn-primary" id="subscribe-btn">
  Subscribe
</button>`;

export const threeRolesCssCode = `/* CSS: the skin — how it looks */
.btn-primary {
  background: #0f172a;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}`;

export const threeRolesJsCode = `// JavaScript: the nervous system — what it does
document.getElementById('subscribe-btn')
  .addEventListener('click', () => {
    subscribe(currentUser.id);
  });`;

export const threeRolesBadCode = `<!-- Bad: mixing all three concerns -->
<button
  style="background:#0f172a; color:white; padding:8px 16px"
  onclick="fetch('/subscribe?id='+userId)"
>
  Subscribe
</button>`;

export const threeRolesGoodCode = `<!-- Good: separation of concerns -->
<button class="btn-primary" data-action="subscribe">
  Subscribe
</button>

<!-- Behavior is in JS, appearance is in CSS -->
<!-- Each layer can change independently -->`;

export const threeRolesQuiz = {
  question:
    "A designer wants to change the button color from black to blue. Which file should change?",
  options: [
    { id: "a", label: "The HTML file — the button element is defined there" },
    { id: "b", label: "The CSS file — appearance is CSS's responsibility" },
    { id: "c", label: "The JavaScript file — the click handler lives there" },
    { id: "d", label: "All three files need to be updated" },
  ],
  correctId: "b",
  explanation:
    "Appearance belongs to CSS. If each concern is properly separated, the designer only touches the CSS file — the HTML structure and JS behavior don't change at all. This is why separation of concerns matters.",
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
  { id: "p-tag", label: "<p>Hello world</p>" },
  { id: "display-flex", label: "display: flex" },
  { id: "fetch-api", label: "fetch('/api/users')" },
  { id: "h1-tag", label: "<h1>Welcome</h1>" },
  { id: "color", label: "color: #333" },
  { id: "form-tag", label: "<form action='/submit'>" },
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
  <img src="/alice.jpg" />
  <h3>Alice</h3>
  <p>Designer</p>
</div>
<div class="card">
  <img src="/bob.jpg" />
  <h3>Bob</h3>
  <p>Engineer</p>
</div>
<!-- If the card design changes, update every copy -->`;

export const componentGoodCode = `// Good: one component, used everywhere
function UserCard({ name, role, avatar }) {
  return (
    <div className="card">
      <img src={avatar} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

// If the card design changes, change it once
<UserCard name="Alice" role="Designer" avatar="/alice.jpg" />
<UserCard name="Bob"   role="Engineer" avatar="/bob.jpg"   />`;

export const compositionCode = `// A page is just components all the way down
function ProfilePage() {
  return (
    <Layout>
      <NavBar />
      <main>
        <UserCard user={currentUser} />
        <PostList posts={userPosts} />
        <FollowerCount count={124} />
      </main>
      <Footer />
    </Layout>
  );
}

// Each component owns its own markup, style, and behavior
// Swap or reorder them without touching the others`;

export const propsCode = `// Props = inputs. Same component, different props.
function Button({ label, variant = "primary", onClick }) {
  return <button className={\`btn btn-\${variant}\`} onClick={onClick}>{label}</button>;
}

<Button label="Save" variant="primary" onClick={handleSave} />
<Button label="Cancel" variant="secondary" onClick={handleCancel} />
<Button label="Delete" variant="danger" onClick={handleDelete} />`;

export const propsFlowLoopCode = `// 1. Parent owns data
function Parent() {
  const [user, setUser] = useState(null);
  useEffect(() => { fetch('/api/user').then(r => r.json()).then(setUser); }, []);
  return <UserCard user={user} />;  // 2. Pass as props
}

function UserCard({ user }) {  // 3. Child receives, renders
  return <div>{user?.name}</div>;
}
// Loop: state change → re-render → new props down`;

export const propsSourcesCode = `// Props always come from the parent

// 1. Parent state
const [items, setItems] = useState([]);
<ProductList items={items} />

// 2. Pass-through (parent's props)
function Layout({ user }) {
  return <Header user={user} />;
}

// 3. Fetched (parent fetches, passes down)
const [posts, setPosts] = useState([]);
useEffect(() => fetch('/api/posts').then(r => r.json()).then(setPosts), []);
<PostList posts={posts} />

// 4. Derived
<UserCard name={user.firstName + ' ' + user.lastName} />

// 5. Hardcoded
<Button label="Submit" variant="primary" />`;

export const childrenCode = `// children = whatever goes between the opening and closing tags
function Card({ children }) {
  return <div className="card">{children}</div>;
}

<Card>Hello</Card>           // children is "Hello"
<Card><span>Hi</span></Card>  // children is <span>Hi</span>`;

export const componentQuiz = {
  question:
    "You build a ProductCard component and use it 50 times in your store. You need to add a 'sale badge' to every card. What do you change?",
  options: [
    { id: "a", label: "Update all 50 usages of ProductCard across the codebase" },
    { id: "b", label: "Update the ProductCard component once" },
    { id: "c", label: "Create a new SaleProductCard and replace all 50 usages" },
    { id: "d", label: "Add the badge with CSS only" },
  ],
  correctId: "b",
  explanation:
    "This is the core value of components: one definition, used everywhere. Updating the component once propagates the change to all 50 instances automatically. This is why you build components instead of copy-pasting HTML.",
};

export const componentDragSortItems = [
  { id: "define", label: "Define the component: function UserCard({ name, avatar })" },
  { id: "markup", label: "Return JSX: <div><img src={avatar} /><h3>{name}</h3></div>" },
  { id: "export", label: "Export the component: export default UserCard" },
  { id: "import", label: "Import it where needed: import UserCard from './UserCard'" },
  { id: "use", label: "Use it with props: <UserCard name='Alice' avatar='/alice.jpg' />" },
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
    right: "Inputs a parent passes to a child (e.g. name, avatar, onClick). The child receives and uses them.",
  },
  {
    left: "Component",
    right: "A reusable UI block (e.g. Button, UserCard). Define once, use everywhere—change it once, it updates everywhere.",
  },
  {
    left: "One-way flow",
    right: "Data flows only parent → child. Children never pass data back up to parents.",
  },
  {
    left: "Composition",
    right: "Putting smaller components inside larger ones. A page is Layout with NavBar, content, and Footer nested inside.",
  },
  {
    left: "Children",
    right: "The JSX content between a component's tags. Whatever goes inside <Card>...</Card>.",
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
function ShoppingCart() {
  const [items, setItems] = useState([]);   // lifted up

  return (
    <div>
      <ProductList onAdd={(item) => setItems([...items, item])} />
      <CartSummary items={items} />          {/* needs items */}
      <CheckoutButton disabled={items.length === 0} />
    </div>
  );
}

// ProductList, CartSummary, and CheckoutButton
// all respond to the same state — owned by their parent`;

export const derivedStateCode = `// Derived state: compute from existing state, don't duplicate it
function Cart({ items }) {
  // Don't do this: const [total, setTotal] = useState(0)
  // Keeping two pieces of state in sync is a source of bugs

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;
  const isEmpty = items.length === 0;

  // total, itemCount, isEmpty are derived — they update automatically
  // when items changes. No extra state needed.
}`;

export const stateQuiz = {
  question:
    "A dropdown menu needs to track whether it's open or closed. Where should this state live?",
  options: [
    { id: "a", label: "In a global state store — other components might need it" },
    { id: "b", label: "In the Dropdown component itself — only it needs to know" },
    { id: "c", label: "In the parent page component that renders the dropdown" },
    { id: "d", label: "In a URL query parameter so the state persists" },
  ],
  correctId: "b",
  explanation:
    "Keep state as close to where it's used as possible. Whether a dropdown is open is local UI state — no other component cares. Putting it in global state would be over-engineering. Lift state up only when multiple siblings need it.",
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
  { id: "cart", label: "Shopping cart contents" },
  { id: "input", label: "Search input value" },
  { id: "user", label: "Logged-in user info" },
  { id: "tab", label: "Active tab in a tab bar" },
  { id: "theme", label: "Light / dark mode preference" },
  { id: "hover", label: "Whether a button is hovered" },
  { id: "form", label: "Form field values" },
];

export const stateBucketBuckets = [
  { id: "local", label: "Local State" },
  { id: "global", label: "Global State" },
];

export const stateBucketMapping: Record<string, string> = {
  toggle: "local",
  cart: "global",
  input: "local",
  user: "global",
  tab: "local",
  theme: "global",
  hover: "local",
  form: "local",
};

// ─── Section 4: Fetching Data ─────────────────────────────────────────────────

export const fetchBasicCode = `// Every fetch has three states you must handle
async function loadUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }

    return await response.json();  // success
  } catch (error) {
    throw error;                   // failure
  }
}`;

export const fetchComponentCode = `// In React: model all three states in your component
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <Skeleton />;        // loading state
  if (error)   return <ErrorMessage />;    // error state
  return <UserCard user={user} />;         // success state
}`;

export const fetchStateBadCode = `// Bad: only handling the happy path
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser);
    // No loading state → blank screen while fetching
    // No error handling → silent failure
  }, [userId]);

  return <UserCard user={user} />; // crashes if user is null
}`;

export const fetchStateGoodCode = `// Good: all three states handled explicitly
function UserProfile({ userId }) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    setState({ data: null, loading: true, error: null });
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => setState({ data: null, loading: false, error: err }));
  }, [userId]);

  if (state.loading) return <Skeleton />;
  if (state.error)   return <ErrorMessage error={state.error} />;
  return <UserCard user={state.data} />;
}`;

export const fetchQuiz = {
  question:
    "Your fetch call succeeds and returns data, but the component crashes on render. What's the most likely cause?",
  options: [
    { id: "a", label: "The network request was too slow" },
    { id: "b", label: "The component tried to render before data arrived, and state was null" },
    { id: "c", label: "The API returned the wrong HTTP status code" },
    { id: "d", label: "React does not support async operations" },
  ],
  correctId: "b",
  explanation:
    "Without a loading state, the component renders immediately with null data. Accessing null.name or null.avatar throws an error. Always initialize state to a safe value and show a loader until the data arrives.",
};

export const fetchStatesMatchPairs = [
  { left: "loading: true", right: "Show a skeleton or spinner" },
  { left: "error: 'Not found'", right: "Show an error message with retry" },
  { left: "data: { name: 'Alice' }", right: "Render the actual content" },
  { left: "stale data + re-fetching", right: "Show old content with a subtle refresh indicator" },
];

export const fetchDragSortItems = [
  { id: "trigger", label: "Component mounts or userId changes" },
  { id: "set-loading", label: "Set loading: true, clear previous error" },
  { id: "fetch", label: "fetch('/api/users/id') is called" },
  { id: "await", label: "Await the response from the server" },
  { id: "parse", label: "Parse the JSON response body" },
  { id: "set-data", label: "Set data in state, set loading: false" },
  { id: "render", label: "Component re-renders with the real user data" },
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
// When the URL is /dashboard, show <Dashboard />
// When the URL is /profile/:id, show <ProfilePage />

// React Router example
<Routes>
  <Route path="/"            element={<Home />} />
  <Route path="/dashboard"   element={<Dashboard />} />
  <Route path="/profile/:id" element={<ProfilePage />} />
  <Route path="/settings"    element={<Settings />} />
  <Route path="*"            element={<NotFound />} />
</Routes>

// The browser URL changes, but the page never fully reloads
// JavaScript swaps out which component is shown`;

export const urlStateCode = `// The URL is state — treat it as the source of truth
function ProfilePage() {
  const { id } = useParams();       // /profile/42 → id = "42"
  const [tab] = useSearchParams();  // /profile/42?tab=posts

  // If the user refreshes, shares the link, or hits back:
  // the URL preserves exactly where they were
}

// Navigating programmatically
const navigate = useNavigate();
navigate('/dashboard');           // pushes to history
navigate('/login', { replace: true }); // replaces (no back)`;

export const routingQuiz = {
  question:
    "A user fills out a multi-step form and accidentally refreshes the browser. The form resets to step 1. What's the root cause?",
  options: [
    { id: "a", label: "The form was using local component state, not the URL" },
    { id: "b", label: "The browser always clears state on refresh — nothing can prevent this" },
    { id: "c", label: "The CSS was not cached properly" },
    { id: "d", label: "The fetch request failed and the form reset itself" },
  ],
  correctId: "a",
  explanation:
    "Local state lives in memory and disappears on refresh. If the current step were in the URL (/checkout/step-2), a refresh would restore the user to the correct step. The URL is the only state that survives a page reload.",
};

export const routingMatchPairs = [
  { left: "/profile/:id", right: "Dynamic route — id changes per user" },
  { left: "useNavigate()", right: "Programmatically move to a different route" },
  { left: "404 route (*)", right: "Catch-all for unmatched URLs" },
  { left: "replace: true", right: "Navigate without adding to browser history" },
];

export const routingBucketItems = [
  { id: "spa-nav", label: "Clicking a <Link> without page reload" },
  { id: "full-reload", label: "Pressing F5 / browser refresh" },
  { id: "back-btn", label: "Browser back button" },
  { id: "anchor-tag", label: "Plain <a href='/page'> navigates with reload" },
  { id: "url-params", label: "Reading :id from the URL" },
  { id: "query-string", label: "?tab=posts in the URL" },
  { id: "history-push", label: "navigate('/dashboard') in JavaScript" },
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
  "anchor-tag": "spa",
  "url-params": "url-state",
  "query-string": "url-state",
  "history-push": "spa",
  redirect: "spa",
};

// ─── Section 6: Checklist ────────────────────────────────────────────────────

export const checklistSteps = [
  {
    title: "Route /profile/:id renders <ProfilePage />",
    content:
      "The router matches the URL and mounts the correct component. The :id param is available via useParams().",
    code: `// Router config
<Route path="/profile/:id" element={<ProfilePage />} />

// Inside ProfilePage
const { id } = useParams(); // "42"`,
  },
  {
    title: "Component mounts → fetch fires for user data",
    content:
      "useEffect with [id] as dependency runs after the first render. The fetch begins, loading state is true.",
    code: `useEffect(() => {
  setLoading(true);
  fetch(\`/api/users/\${id}\`)
    .then(r => r.json())
    .then(setUser)
    .catch(setError)
    .finally(() => setLoading(false));
}, [id]);`,
  },
  {
    title: "While fetching → show a <Skeleton /> loader",
    content:
      "The loading state is true, so the component renders a skeleton. The user sees immediate feedback — not a blank screen.",
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
      "User data arrives, state updates, component re-renders. The data flows down as props to UserCard and PostList.",
    code: `return (
  <div>
    <UserCard
      name={user.name}
      avatar={user.avatar}
      role={user.role}
    />
    <PostList posts={user.posts} />
  </div>
);`,
  },
  {
    title: "On error → show <ErrorMessage /> with retry",
    content:
      "If the fetch fails, the error state is set. The user sees a meaningful message and a way to try again.",
    code: `if (error) return (
  <ErrorMessage
    message="Couldn't load this profile."
    onRetry={() => setRetryKey(k => k + 1)}
  />
);`,
  },
  {
    title: "User clicks 'Edit' → local state toggles to edit mode",
    content:
      "A boolean isEditing state switches the rendered view. No new fetch — just a state change causing a re-render.",
    code: `const [isEditing, setIsEditing] = useState(false);

// In JSX:
{isEditing
  ? <EditForm user={user} onSave={handleSave} />
  : <UserCard user={user} onEdit={() => setIsEditing(true)} />
}`,
  },
  {
    title: "On save → POST to backend → update state",
    content:
      "The edit form submits. A POST fires to the API. On success, local state updates with the new data — no full page reload needed.",
    code: `async function handleSave(updatedData) {
  const res = await fetch(\`/api/users/\${id}\`, {
    method: 'POST',
    body: JSON.stringify(updatedData),
  });
  const updated = await res.json();
  setUser(updated);       // update state with fresh data
  setIsEditing(false);    // return to view mode
}`,
  },
];

export const finalQuizzes = [
  {
    question:
      "Which language is responsible for making a button change color when hovered?",
    options: [
      { id: "a", label: "HTML — the button is defined there" },
      { id: "b", label: "JavaScript — hover is an event" },
      { id: "c", label: "CSS — appearance and state styling belong to CSS" },
      { id: "d", label: "All three equally" },
    ],
    correctId: "c",
    explanation:
      "The :hover pseudo-class is pure CSS. HTML says 'a button exists', CSS says 'when hovered, it looks like this'. JavaScript is not needed for visual hover effects.",
  },
  {
    question:
      "You have a <Notification /> component that should appear in both the header and a sidebar. Where should the notification count state live?",
    options: [
      { id: "a", label: "Inside <Header /> — it rendered first" },
      { id: "b", label: "Inside <Sidebar /> — it's more visible there" },
      { id: "c", label: "In a common parent or global state — both components need it" },
      { id: "d", label: "In the <Notification /> component itself" },
    ],
    correctId: "c",
    explanation:
      "When two components need the same state, lift it to their closest common ancestor — or use global state. Local state is invisible to siblings. This is the 'lift state up' principle.",
  },
  {
    question:
      "A user visits /orders/99 and gets a blank screen with no error message. The network request for order 99 returned a 404. What went wrong?",
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
      "A user fills a 3-step form, refreshes on step 2, and is sent back to step 1. What would prevent this?",
    options: [
      { id: "a", label: "Storing the current step in the URL (e.g., /checkout?step=2)" },
      { id: "b", label: "Using a larger React state object" },
      { id: "c", label: "Disabling the browser refresh button" },
      { id: "d", label: "Caching the component with localStorage" },
    ],
    correctId: "a",
    explanation:
      "The URL is the only state that survives a page reload. If the current step is encoded in the URL, a refresh restores the user to exactly where they were. localStorage also works, but the URL is the canonical answer for navigation state.",
  },
];
