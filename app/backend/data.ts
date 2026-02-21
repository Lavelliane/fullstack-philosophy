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

export const lettingGoPairs = [
  { left: "Singleton", right: "One DB connection pool shared by the whole app" },
  { left: "Strategy", right: "Swap pricing logic without changing the service" },
  { left: "Repository", right: "Your service says what, not how, to store data" },
  { left: "Circuit Breaker", right: "Stop calling a failing dependency temporarily" },
  { left: "Pub/Sub", right: "Emit an event; let listeners react independently" },
];

export const lettingGoQuiz = {
  question:
    "An 'order.created' event is emitted. Which services should subscribe to it?",
  options: [
    { id: "a", label: "Only the OrderService: it owns the event." },
    {
      id: "b",
      label:
        "NotificationService, InventoryService, and AnalyticsService: all independently.",
    },
    { id: "c", label: "The Controller: it coordinates everything after creation." },
    { id: "d", label: "No services should react: events are only for logging." },
  ],
  correctId: "b",
  explanation:
    "That's exactly the point of Pub/Sub. Each service subscribes independently, reacts independently, and fails independently. The OrderService doesn't know or care who's listening. That's the decoupling.",
};

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
