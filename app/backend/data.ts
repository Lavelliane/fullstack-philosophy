export const NAV_SECTIONS = [
  { id: "s1", label: "The Contract", number: "01" },
  { id: "s2", label: "The Gatekeepers", number: "02" },
  { id: "s3", label: "Request Lifecycle", number: "03" },
  { id: "s4", label: "Memory & Failure", number: "04" },
  { id: "s5", label: "Letting Go", number: "05" },
  { id: "s6", label: "The Checklist", number: "06" },
];

// ─── Section 1: The Contract ─────────────────────────────────────────────────

export const httpMethodsCode = `// School portal: students resource
GET    /students           // List all students
GET    /students/42        // Read one student
POST   /students           // Create a new student
PUT    /students/42        // Replace entire student
PATCH  /students/42       // Update specific fields
DELETE /students/42       // Remove a student`;

export const zodDtoCode = `import { z } from "zod";

const CreateStudentSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  gpa: z.number().min(0).max(4),
});

type CreateStudentDto = z.infer<typeof CreateStudentSchema>;

app.post("/students", (req, res) => {
  const parsed = CreateStudentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  // parsed.data is typed and validated
});`;

export const csharpDtoCode = `[ApiController]
[Route("students")]
public class StudentController : ControllerBase
{
  [HttpPost]
  public IActionResult Create([FromBody] CreateStudentDto dto)
  {
    if (!ModelState.IsValid) return BadRequest(ModelState);
    // dto is validated by [Required], [EmailAddress], etc.
  }
}

public class CreateStudentDto
{
  [Required] public string FullName { get; set; }
  [Required, EmailAddress] public string Email { get; set; }
  [Range(0, 4)] public double Gpa { get; set; }
}`;

export const contractCodeBad = `// Verbs in URLs, leaking implementation
GET  /fetchStudentById?id=42
POST /createNewStudent
PUT  /updateStudentGpa

// Response leaks raw DB schema
{
  "id": 42,
  "password_hash": "a3f7...",
  "ssn_hash": "x9b2...",
  "internal_notes": "flagged",
  "created_at": "2024-01-01T..."
}`;

export const contractCodeGood = `// Resources as nouns, HTTP methods as verbs
GET    /students/42
POST   /students
PATCH  /students/42/gpa

// Response is a shaped DTO, only what the client needs
{
  "id": 42,
  "fullName": "Ada Lovelace",
  "email": "ada@school.edu",
  "gpa": 3.9
}`;

export const contractQuiz = {
  question: "A school portal needs to fetch a student's grades. Which endpoint is correct?",
  options: [
    { id: "a", label: "GET /getGrades?studentId=42" },
    { id: "b", label: "GET /students/42/grades" },
    { id: "c", label: "POST /grades/fetch" },
    { id: "d", label: "GET /fetchStudentGrades/42" },
  ],
  correctId: "b",
  explanation:
    "GET /students/42/grades is correct. GET = read. /students/42 = the student resource. /grades = nested resource. The URL names the thing, the method names the action. The other options mix verbs into URLs or use the wrong method.",
};

export const contractBucketItems = [
  { id: "full_name", label: "full_name" },
  { id: "email", label: "email" },
  { id: "gpa", label: "gpa" },
  { id: "id", label: "id" },
  { id: "password_hash", label: "password_hash" },
  { id: "ssn_hash", label: "ssn_hash" },
  { id: "internal_notes", label: "internal_notes" },
  { id: "enrollment_status", label: "enrollment_status" },
  { id: "profile_picture_url", label: "profile_picture_url" },
];

export const contractBucketBuckets = [
  { id: "expose", label: "Expose in API" },
  { id: "hide", label: "Keep Internal" },
];

export const contractBucketMapping: Record<string, string> = {
  full_name: "expose",
  email: "expose",
  gpa: "expose",
  id: "expose",
  enrollment_status: "expose",
  profile_picture_url: "expose",
  password_hash: "hide",
  ssn_hash: "hide",
  internal_notes: "hide",
};

export const contractDragSortItems = [
  { id: "schema", label: "const schema = z.object({ fullName: z.string(), email: z.string().email(), gpa: z.number().min(0).max(4) });" },
  { id: "parse", label: "const parsed = schema.safeParse(req.body);" },
  { id: "validate", label: "if (!parsed.success) return res.status(400).json(parsed.error);" },
  { id: "create", label: "const student = await studentService.create(parsed.data);" },
  { id: "respond", label: "return res.status(201).json(student);" },
];

export const contractDragSortCorrectOrder = ["schema", "parse", "validate", "create", "respond"];

export type ValidatorSimPayload = {
  id: string;
  label: string;
  payload: Record<string, unknown>;
  outcome: "pass" | "fail";
  errorMessage?: string;
};

export const validatorSimPayloads: ValidatorSimPayload[] = [
  {
    id: "valid",
    label: "Valid student",
    payload: { fullName: "Ada Lovelace", email: "ada@school.edu", gpa: 3.9 },
    outcome: "pass",
  },
  {
    id: "missing",
    label: "Missing field",
    payload: { fullName: "Bob", email: "bob@school.edu" },
    outcome: "fail",
    errorMessage: "gpa: Required",
  },
  {
    id: "forbidden",
    label: "Forbidden field leak",
    payload: { fullName: "Eve", email: "eve@school.edu", gpa: 2.5, password_hash: "leaked!" },
    outcome: "fail",
    errorMessage: "Unrecognized key(s): password_hash",
  },
];

// ─── Section 2: The Gatekeepers ──────────────────────────────────────────────

export const gatekeepersCode = `Request: POST /orders  { item: "laptop", qty: 1 }

→ [Auth Middleware]         Who are you?
    Token present? Valid? Not expired?
    If no  →  401 Unauthorized. Stop.

→ [Authz Middleware]        Are you allowed?
    Role = "customer"? Access granted for /orders?
    If no  →  403 Forbidden. Stop.

→ [Validation Middleware]   Is this valid?
    item and qty present? qty > 0?
    If no  →  400 Bad Request. Stop.

→ [Controller]              Process it.
    All checks passed. Do the work.`;

export const gatekeepersDragItems = [
  { id: "authz", label: "Authorization: are you allowed?" },
  { id: "auth", label: "Authentication: who are you?" },
  { id: "validation", label: "Validation: is the input valid?" },
  { id: "handler", label: "Handler: run the business logic" },
];

export const gatekeepersCorrectOrder = ["auth", "authz", "validation", "handler"];

export const gatekeepersQuiz = {
  question:
    "True or False: A 401 Unauthorized and a 403 Forbidden mean the same thing.",
  options: [
    { id: "true", label: "True: both mean the request was rejected." },
    { id: "false", label: "False: they mean different things." },
  ],
  correctId: "false",
  explanation:
    "401 means 'I don't know who you are' (identity problem). 403 means 'I know who you are, but you can't do this' (permission problem). The distinction matters: 401 should prompt a login, 403 should not.",
};

// ─── Section 2 Extended: Auth Deep Dive ──────────────────────────────────────

export const passwordHashingCode = `import bcrypt from "bcrypt";

// Registration: hash before saving — never store plaintext
async function registerUser(email, password) {
  const saltRounds = 12;            // work factor — higher = slower = safer
  const hash = await bcrypt.hash(password, saltRounds);
  // bcrypt automatically generates and embeds a unique salt
  await db.users.create({ email, passwordHash: hash });
  return { message: "User created" };
}

// Login: compare plaintext against stored hash
async function loginUser(email, password) {
  const user = await db.users.findOne({ email });
  if (!user) return null;           // never reveal which part failed

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return null;

  return user;
}`;

export const jwtSignCode = `import jwt from "jsonwebtoken";

// On successful login — sign a token with the user's identity
async function login(req, res) {
  const user = await loginUser(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const payload = { userId: user.id, email: user.email, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  // Option A: httpOnly cookie (browser clients — XSS-resistant)
  res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });

  // Option B: send in body (mobile/SPA — client stores in memory, not localStorage)
  return res.status(200).json({ token });
}`;

export const jwtMiddlewareCode = `import jwt from "jsonwebtoken";

// Auth middleware — runs before every protected route
function authenticate(req, res, next) {
  // Extract from cookie OR Authorization: Bearer <token> header
  const token =
    req.cookies?.token ??
    req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;   // { userId, email, role } — available to all downstream handlers
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalid or expired" });
  }
}

// Usage — middleware chain from Section 1
app.get("/dashboard", authenticate, (req, res) => {
  res.json({ welcome: req.user.email });
});`;

export const roleMiddlewareCode = `// Authorization middleware factory — runs after authenticate
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}

// Chain: authenticate first, then authorize — three questions in order
app.delete(
  "/admin/users/:id",
  authenticate,              // 1. Who are you?     → attaches req.user
  requireRole("admin"),      // 2. Are you allowed?  → checks req.user.role
  async (req, res) => {      // 3. What do you want? → your logic
    await userService.delete(req.params.id);
    return res.status(204).send();
  }
);`;

export const jwtExampleToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQyLCJlbWFpbCI6ImFkYUBzY2hvb2wuZWR1Iiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3MDk5MDQwMDAsImV4cCI6MTcwOTkwNzYwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export const jwtParts = {
  header: {
    label: "Header",
    segment: 0,
    decoded: { alg: "HS256", typ: "JWT" },
    explanation:
      "Declares the token type and signing algorithm. Base64-encoded — not encrypted. Anyone can decode it. It tells the receiver how to verify the signature.",
  },
  payload: {
    label: "Payload",
    segment: 1,
    decoded: {
      userId: 42,
      email: "ada@school.edu",
      role: "student",
      iat: 1709904000,
      exp: 1709907600,
    },
    explanation:
      "The claims: who the user is, their role, when the token was issued (iat) and when it expires (exp). Also Base64-encoded — readable by anyone. Never put passwords or secrets here.",
  },
  signature: {
    label: "Signature",
    segment: 2,
    decoded: null,
    explanation:
      "HMAC-SHA256 of header + payload + your server's JWT_SECRET. If anyone tampers with the payload, the signature won't match and jwt.verify() will throw. This is what makes the token trustworthy.",
  },
};

export type AuthSimScenario = {
  id: string;
  label: string;
  description: string;
  failsAt: "auth" | "authz" | null;
  statusCode: 200 | 401 | 403;
  errorMessage?: string;
};

export const authSimScenarios: AuthSimScenario[] = [
  {
    id: "valid",
    label: "Valid JWT (admin)",
    description: 'Token present, valid, not expired. role = "admin".',
    failsAt: null,
    statusCode: 200,
  },
  {
    id: "missing",
    label: "No token",
    description: "Request has no Authorization header and no cookie.",
    failsAt: "auth",
    statusCode: 401,
    errorMessage: "No token provided",
  },
  {
    id: "expired",
    label: "Expired JWT",
    description: "Token was valid but the exp timestamp has passed.",
    failsAt: "auth",
    statusCode: 401,
    errorMessage: "Token expired",
  },
  {
    id: "wrong_role",
    label: "Valid JWT (student)",
    description: 'Token is valid, but role = "student". Route requires "admin".',
    failsAt: "authz",
    statusCode: 403,
    errorMessage: "Insufficient permissions",
  },
];

export const gatekeepersDragItemsV2 = [
  { id: "extract", label: "Extract token from cookie or Authorization header" },
  { id: "verify", label: "jwt.verify(token, secret) — validate & decode" },
  { id: "authz", label: "requireRole() — check req.user.role" },
  { id: "validation", label: "Validate request body with Zod schema" },
  { id: "handler", label: "Controller: run the business logic" },
];

export const gatekeepersCorrectOrderV2 = [
  "extract",
  "verify",
  "authz",
  "validation",
  "handler",
];

export const authMatchPairs = [
  {
    left: "bcrypt.hash()",
    right: "One-way transform of a password before storing",
  },
  {
    left: "salt",
    right: "Random value that ensures identical passwords produce different hashes",
  },
  {
    left: "jwt.sign()",
    right: "Creates a signed token the server can later verify",
  },
  {
    left: "httpOnly cookie",
    right: "Prevents JavaScript from reading the token (XSS protection)",
  },
  {
    left: "jwt.verify()",
    right: "Confirms the token wasn't tampered with and isn't expired",
  },
  {
    left: "req.user",
    right: "Identity attached to the request after auth middleware passes",
  },
];

export const jwtSecretQuiz = {
  question: "Where should your JWT_SECRET be stored?",
  options: [
    { id: "a", label: 'Hardcoded in source: const SECRET = "my-super-secret"' },
    { id: "b", label: "In the database, fetched at startup" },
    { id: "c", label: "In an environment variable: process.env.JWT_SECRET" },
    { id: "d", label: "In a comment so the team can find it easily" },
  ],
  correctId: "c",
  explanation:
    "Environment variables keep secrets out of source code and version control. Hardcoding exposes it to anyone who reads the repo — ever. Fetching from DB adds a dependency before auth even works, and introduces a chicken-and-egg problem. Never put secrets in comments.",
};

export type AuthFlowStep = {
  id: string;
  label: string;
  sublabel: string;
  code: string;
  note: string;
};

export const registerFlowSteps: AuthFlowStep[] = [
  {
    id: "form",
    label: "Client",
    sublabel: "User fills registration form",
    code: "POST /register  { email, password }",
    note: "Plaintext password leaves the browser. HTTPS encrypts it in transit — but the server still receives it as plaintext.",
  },
  {
    id: "dto",
    label: "Controller",
    sublabel: "Validate the DTO",
    code: "const parsed = schema.safeParse(req.body)\nif (!parsed.success) return res.status(400)...",
    note: "Zod rejects malformed input before it touches auth logic. Same pattern as Section 1 — the contract is enforced at the boundary.",
  },
  {
    id: "hash",
    label: "Service",
    sublabel: "Hash the password",
    code: "const hash = await bcrypt.hash(password, 12)\n// saltRounds=12 → ~250ms — deliberately slow",
    note: "bcrypt auto-generates a unique salt and embeds it in the output hash. The original password is gone — not stored anywhere, not even temporarily.",
  },
  {
    id: "db",
    label: "Repository",
    sublabel: "Persist the hash",
    code: "await db.users.create({ email, passwordHash: hash })",
    note: "Only the hash reaches the database. If the DB is breached, attackers get hashes — not passwords. bcrypt's slowness makes brute-forcing those hashes impractical.",
  },
  {
    id: "done",
    label: "Response",
    sublabel: "201 Created",
    code: 'res.status(201).json({ message: "User created" })',
    note: "User is registered but not yet authenticated. No token issued — that happens at login.",
  },
];

export const loginFlowSteps: AuthFlowStep[] = [
  {
    id: "form",
    label: "Client",
    sublabel: "User submits login",
    code: "POST /login  { email, password }",
    note: "Same shape as register — different intent. We're verifying an existing identity, not creating one.",
  },
  {
    id: "lookup",
    label: "Repository",
    sublabel: "Find the user",
    code: "const user = await db.users.findOne({ email })",
    note: "If the email doesn't exist, return null — don't reveal whether it was the email or the password that was wrong. That detail helps attackers enumerate valid accounts.",
  },
  {
    id: "compare",
    label: "Service",
    sublabel: "Compare passwords",
    code: "const match = await bcrypt.compare(password, user.passwordHash)\n// re-hashes input with stored salt, then compares",
    note: "bcrypt re-hashes the submitted password using the salt embedded in the stored hash, then compares. This takes ~250ms deliberately — slowing brute-force attacks.",
  },
  {
    id: "sign",
    label: "Service",
    sublabel: "Issue a JWT",
    code: "jwt.sign({ userId, email, role }, process.env.JWT_SECRET, { expiresIn: '1h' })",
    note: "The payload is identity data the server trusts. The secret signs it — anyone who modifies the payload invalidates the signature. Store the secret in env vars, never in code.",
  },
  {
    id: "cookie",
    label: "Controller",
    sublabel: "Set secure cookie",
    code: 'res.cookie("token", jwt, { httpOnly: true, secure: true, sameSite: "strict" })',
    note: "httpOnly: JS can't read it (XSS-safe). secure: HTTPS only. sameSite strict: won't be sent on cross-site requests (CSRF protection). Three lines, three attack vectors closed.",
  },
  {
    id: "done",
    label: "Response",
    sublabel: "200 OK",
    code: 'res.status(200).json({ user: { email, role } })',
    note: "Client is authenticated. Every subsequent request will include the cookie automatically. The server reads it, verifies the JWT, and knows who's asking.",
  },
];

// ─── Section 3: The Request Lifecycle ────────────────────────────────────────

export const lifecycleLayerComparison = [
  {
    concept: "Controller",
    does: "Reads req.body, calls the right service, returns the response. Pass-through.",
    doesNot: "Calculate totals, validate business rules, or talk to the database.",
  },
  {
    concept: "Service",
    does: "Applies business rules (pricing, stock checks, discounts). Coordinates. Decides.",
    doesNot: "Parse HTTP, return status codes, or write SQL. It receives data and returns data.",
  },
  {
    concept: "Repository",
    does: "Saves and loads. Knows the database schema. Translates between app and DB.",
    doesNot: "Validate rules, calculate anything, or know why the data is being saved.",
  },
];

export const lifecycleCode = `// Controller: receptionist. Delegates, never decides.
async createOrder(req) {
  const dto = req.body;
  const result = await orderService.create(dto);
  return respond(201, result);
}

// Service: decision-maker. Business logic lives here.
async create(dto) {
  const pricing = pricingStrategy.calculate(dto);
  const order = await orderRepo.save({ ...dto, total: pricing.total });
  return toOrderDTO(order);
}

// Repository: storage abstraction.
async save(order) {
  return db.insert("orders", order);
  // Swap Postgres → Mongo here. Service doesn't notice.
}`;

export const lifecycleBucketItems = [
  { id: "b1", label: "Checks if the JWT token is valid" },
  { id: "b2", label: "Calculates order total with discounts" },
  { id: "b3", label: "Runs INSERT INTO orders ..." },
  { id: "b4", label: "Returns res.status(201).json(dto)" },
  { id: "b5", label: "Enforces 'user can only order 10 items'" },
  { id: "b6", label: "Calls db.findOne({ id: orderId })" },
  { id: "b7", label: "Reads req.body and calls a service" },
  { id: "b8", label: "Validates that required fields exist" },
];

export const lifecycleBucketBuckets = [
  { id: "middleware", label: "Middleware" },
  { id: "controller", label: "Controller" },
  { id: "service", label: "Service" },
  { id: "repository", label: "Repository" },
];

export const lifecycleBucketMapping: Record<string, string> = {
  b1: "middleware",
  b2: "service",
  b3: "repository",
  b4: "controller",
  b5: "service",
  b6: "repository",
  b7: "controller",
  b8: "middleware",
};

export const lifecycleFillSegments = [
  `async createOrder(req) {\n  const dto = req.body;\n  const result = await `,
  {
    blank: "layer",
    options: ["authMiddleware", "orderService", "orderRepo", "orderController"],
    correct: "orderService",
  },
  `.create(dto);\n  return respond(`,
  { blank: "status", options: ["200", "201", "204", "404"], correct: "201" },
  `, result);\n}`,
];

// ─── Section 4: Memory and Failure ───────────────────────────────────────────

export const memoryFailureCode = `CircuitBreaker {
  state:        CLOSED        // normal: requests pass through
  failureCount: 0
  threshold:    3

  call(dependency) {
    if state == OPEN
      → return fallback()     // fail fast, don't even try

    try {
      result = dependency.call()
      failureCount = 0        // success resets the counter
      return result
    } catch {
      failureCount++
      if failureCount >= threshold
        → state = OPEN
        → start cooldown(30s)
        → after cooldown: state = HALF_OPEN
    }
  }
}`;

export const memoryFailureBucketItems = [
  { id: "f1", label: "Your handler throws a NullPointerException" },
  { id: "f2", label: "Client sends a missing required field" },
  { id: "f3", label: "The payment API is down" },
  { id: "f4", label: "You forgot to handle a negative qty" },
  { id: "f5", label: "Client sends malformed JSON" },
  { id: "f6", label: "A cloud region has an outage" },
];

export const memoryFailureBucketBuckets = [
  { id: "you", label: "You broke it" },
  { id: "them", label: "They sent garbage" },
  { id: "nobody", label: "Nobody controls it" },
];

export const memoryFailureBucketMapping: Record<string, string> = {
  f1: "you",
  f2: "them",
  f3: "nobody",
  f4: "you",
  f5: "them",
  f6: "nobody",
};

// ─── Section 5: Letting Go of Control ───────────────────────────────────────

export const lettingGoCodeBad = `class OrderService {
  // Locked in: impossible to test or swap
  private db = new PostgresDatabase();
  private mailer = new SendGridMailer();
  private logger = new DatadogLogger();
}`;

export const lettingGoCodeGood = `class OrderService {
  // Receives its tools: flexible, testable
  constructor(
    private db: Database,
    private mailer: Mailer,
    private logger: Logger
  ) {}
}

// Production:  new OrderService(postgres, sendgrid, datadog)
// In tests:    new OrderService(fakeDb, fakeMailer, fakeLogger)`;

export const diSpotCouplingQuiz = {
  question: "Which class is actually testable without a real database?",
  options: [
    {
      id: "a",
      label: `class ReportService {
  // Tightly coupled: creates its own DB
  private db = new PostgresDatabase();

  generate() {
    return this.db.query("SELECT * FROM reports");
  }
}`,
    },
    {
      id: "b",
      label: `class ReportService {
  // Dependency injected: receives DB from outside
  constructor(private db: Database) {}

  generate() {
    return this.db.query("SELECT * FROM reports");
  }
}`,
    },
    {
      id: "c",
      label: `class ReportService {
  generate() {
    // Creates DB inside method: still coupled
    const db = new PostgresDatabase();
    return db.query("SELECT * FROM reports");
  }
}`,
    },
  ],
  correctId: "b",
  explanation:
    "Option B receives its database through the constructor. In tests you pass a MockDB — no real Postgres needed. Options A and C hardcode 'new PostgresDatabase()' which means you can't swap them out.",
};

export const diFillSegments = [
  "class OrderService {\n  constructor(\n    private db: ",
  {
    blank: "db-type",
    options: ["PostgresDatabase", "IDatabase", "Database", "any"],
    correct: "IDatabase",
  },
  "\n  ) {}\n\n  async create(dto) {\n    return ",
  {
    blank: "db-call",
    options: ["new PostgresDatabase().save(dto)", "this.db.save(dto)", "db.save(dto)", "IDatabase.save(dto)"],
    correct: "this.db.save(dto)",
  },
  ";\n  }\n}",
];

export const diTrueFalseQuizzes = [
  {
    question: "DI means your class creates its own dependencies with `new`.",
    options: [
      { id: "t", label: "True" },
      { id: "f", label: "False" },
    ],
    correctId: "f",
    explanation:
      "False. DI is the opposite — the class receives its dependencies from outside. It never calls 'new' on them internally.",
  },
  {
    question: "With DI, you can unit test OrderService without a real database running.",
    options: [
      { id: "t", label: "True" },
      { id: "f", label: "False" },
    ],
    correctId: "t",
    explanation:
      "True. You pass a MockDB or InMemoryDB into the constructor. The service doesn't know or care — it just calls the interface methods.",
  },
  {
    question: "Dependency Injection requires a framework like NestJS or Spring to work.",
    options: [
      { id: "t", label: "True" },
      { id: "f", label: "False" },
    ],
    correctId: "f",
    explanation:
      "False. DI is just a pattern — passing dependencies through the constructor. Frameworks automate it, but you can do it manually with zero libraries.",
  },
  {
    question: "Constructor injection is the most common form of DI.",
    options: [
      { id: "t", label: "True" },
      { id: "f", label: "False" },
    ],
    correctId: "t",
    explanation:
      "True. Constructor injection makes dependencies explicit and required. The class can't be created without them — which is exactly what you want.",
  },
];

// ─── Section 6: The Checklist ──────────────────────────────────────────────

export const checklistSteps = [
  {
    title: "Middleware checks auth token",
    content:
      "The request arrives. Before any business logic runs, the auth middleware validates the JWT. No token? Expired? 401, full stop.",
    code: "→ [Auth] Token valid? → Yes\n→ [Authz] Role = customer? → Yes\n→ [Validation] Body valid? → Yes",
  },
  {
    title: "Controller reads body, calls order service",
    content:
      "The controller is a receptionist. It reads the request body, shapes it into a DTO, and hands off to the service. No logic. Just delegation.",
    code: "async createOrder(req) {\n  const dto = req.body;\n  const result = await orderService.create(dto);\n  return respond(201, result);\n}",
  },
  {
    title: "Service validates rules and applies strategy",
    content:
      "The service is the decision-maker. It checks business rules: is the item in stock? Does the pricing strategy apply a discount? Strategy pattern means swapping a Black Friday pricer for a standard one (same interface).",
    code: "const pricing = pricingStrategy.calculate(dto);\n// Strategy: StandardPricing | BlackFridayPricing | BulkPricing",
  },
  {
    title: "Repository persists the order",
    content:
      "The service tells the repository what to save, not how. The repository talks to the database. The service never writes a query.",
    code: "const order = await orderRepo.save({\n  ...dto,\n  total: pricing.total\n});",
  },
  {
    title: "Service emits order.created event",
    content:
      "The service emits an event. It doesn't call NotificationService directly; it broadcasts. Notifications, inventory, analytics all react independently. The OrderService doesn't know or care who's listening.",
    code: `eventBus.emit("order.created", order);\n// Listeners react async, independently`,
  },
  {
    title: "Controller returns a DTO, not the raw record",
    content:
      "The contract is honored. The response is a shaped DTO: only the fields the client needs. No password_hash, no internal flags. The database schema stays internal.",
    code: "return respond(201, toOrderDTO(order));\n// { id, status, total, createdAt }, not the raw DB row",
  },
];

export const finalQuizzes = [
  {
    question: "Which REST endpoint correctly reads a single user with ID 42?",
    options: [
      { id: "a", label: "POST /getUser?id=42" },
      { id: "b", label: "GET /users/42" },
      { id: "c", label: "GET /fetchUserById/42" },
      { id: "d", label: "READ /users/42" },
    ],
    correctId: "b",
    explanation:
      "GET /users/42. GET = read. /users/42 = the resource. No verbs in the URL, no custom methods.",
  },
  {
    question:
      "An unauthenticated request hits a protected route. What should the server return?",
    options: [
      { id: "a", label: "403 Forbidden" },
      { id: "b", label: "404 Not Found" },
      { id: "c", label: "401 Unauthorized" },
      { id: "d", label: "500 Internal Server Error" },
    ],
    correctId: "c",
    explanation:
      "401: the server doesn't know who you are. 403 would mean it knows you but won't allow it. 404 would hide the route, which can be intentional but isn't standard. 500 is your own fault.",
  },
  {
    question:
      "Where does 'check if the user has enough credit to place the order' belong?",
    options: [
      { id: "a", label: "Middleware" },
      { id: "b", label: "Controller" },
      { id: "c", label: "Service" },
      { id: "d", label: "Repository" },
    ],
    correctId: "c",
    explanation:
      "Service. This is business logic: a rule about how the domain works. The controller delegates, the repository stores, middleware handles cross-cutting concerns. Business rules live in the service.",
  },
  {
    question:
      "Your service calls an external shipping API. It fails 3 times in a row. What pattern should you apply?",
    options: [
      { id: "a", label: "Retry immediately, as fast as possible" },
      { id: "b", label: "Return 500 and stop" },
      {
        id: "c",
        label:
          "Circuit Breaker: open the circuit, fail fast, retry after cooldown",
      },
      { id: "d", label: "Cache the last good response forever" },
    ],
    correctId: "c",
    explanation:
      "Circuit Breaker. Retrying immediately floods a struggling service. 500s without a recovery strategy leave you stuck. Caching stale data is dangerous. Open the circuit, fail fast, probe after cooldown.",
  },
  {
    question:
      "Why does Dependency Injection make code easier to test?",
    options: [
      { id: "a", label: "It makes the code run faster" },
      {
        id: "b",
        label:
          "You can pass a fake/mock dependency in tests without changing the class",
      },
      { id: "c", label: "It removes the need for a database entirely" },
      { id: "d", label: "It automatically generates unit tests" },
    ],
    correctId: "b",
    explanation:
      "DI means your class receives its tools instead of creating them. In tests, you swap in a FakeDatabase or MockMailer (same code, no real infrastructure needed). That's the whole point.",
  },
];
