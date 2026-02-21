## **"The Face of Software"** (30-35 min)

**1. The Three Roles (5 min)**
- Every web UI is built from three concerns: structure, appearance, behavior.
- **HTML**: the skeleton. Defines *what* exists. A button, a list, a form.
- **CSS**: the skin. Defines *how it looks*. Position, color, spacing.
- **JavaScript**: the nervous system. Defines *what it does*. Click a button, something happens.
- Principle: keep these three roles separate in your mind, even when frameworks blend them.

**2. Components: UI as LEGO (5 min)**
- A UI is too complex to build as one piece. Break it into self-contained units — **components**.
- Each component owns its markup, style, and behavior. A `Button`, a `UserCard`, a `NavBar`.
- Components accept **props**: inputs from the outside. Same `Button`, different label, different color.
- **Composition pattern**: build complex UIs by nesting simple components. The page is just components all the way down.

**3. State: What the App Remembers (8 min)**
- Unlike HTML which is static, apps need to *react* to the user. That requires memory.
- **State**: data that, when it changes, updates what the user sees. A toggle, a form field, a fetched list.
- The core loop: *user acts → state changes → UI re-renders*. Everything in frontend is this loop.
- **Local state**: owned by one component. A dropdown open/closed.
- **Global state**: shared across many components. Who's logged in. A shopping cart.
- Principle: keep state as close to where it's used as possible. Lift it up only when needed.

**4. Connecting to the Outside World (7 min)**
- Your UI is a shell. The real data lives on a backend. You have to ask for it.
- **Fetching**: send an HTTP request, wait for a response, update state. Async by nature.
- Three states every data fetch must handle: **loading**, **success**, **error**. Design for all three — not just the happy path.
- **The UX contract**: the user should never stare at a blank screen and wonder if something is happening.
- Common mistake: fetching data and forgetting what to show while waiting, or when it fails.

**5. Routing: The Illusion of Pages (5 min)**
- Traditional websites reload the page on every link click. Modern apps don't.
- **Single Page Application (SPA)**: one HTML file, JavaScript swaps out the content based on the URL.
- The URL is state. `/dashboard`, `/settings/profile` — each URL maps to a component tree.
- **Declarative routing**: you define "when the URL is `/about`, show `<AboutPage />`." The router handles the rest.
- Principle: the browser's back button should always work. Don't break the web's navigation model.

**6. The Checklist (3 min)**
- Walk through building a "User Profile Page" end-to-end:
  1. Route `/profile/:id` renders a `<ProfilePage />` component
  2. Component mounts → fetch fires for user data
  3. While fetching → show a `<Skeleton />` loader
  4. On success → pass data as props to `<UserCard />`, `<PostList />`
  5. On error → show `<ErrorMessage />` with a retry option
  6. User clicks "Edit" → local state toggles to edit mode → form component appears
  7. On save → POST to backend → re-fetch or optimistically update state
- Before shipping any screen: What does it show while loading? What if the request fails? What state does the user expect after an action?
- Frameworks will come and go. Components, state, and data flow won't.
