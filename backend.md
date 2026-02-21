## **"The Quiet Side of Software"** (30-35 min)

**1. The Contract (5 min)**
- Your backend is a promise: "Send me this, I'll give you that."
- REST as the common language: resources as nouns, HTTP methods as verbs. `GET /users/5` not `GET /fetchUserById`.
- **DTO pattern**: what the database stores isn't what the client needs. Shape data for its audience. The contract defines the shape, not your schema.

**2. The Gatekeepers (5 min)**
- Every route answers three questions: Who are you? Are you allowed? What do you want?
- **Middleware/Pipeline pattern**: auth, authorization, validation, logging — all run before your logic as a chain of handlers.
- Principle: never trust the client. These layers exist because your system should work correctly even if users are malicious.

**3. The Request Lifecycle (8 min)**
- Request flows through layers: **Middleware → Controller → Service → Repository → Response**
- **Controller**: receptionist. Delegates, never decides.
- **Service**: decision-maker. Business logic lives here. This is where **Strategy pattern** shows up — same interface, different behavior (e.g., swapping payment processors without rewriting logic).
- **Repository pattern**: abstracts data access. Your service says *what* to remember, the repository handles *how*. Swap Postgres for Mongo, service code doesn't change.
- Why separate? Your business logic shouldn't care if the request came from REST, GraphQL, or a cron job.

**4. Memory and Failure (7 min)**
- Your server forgets everything between requests. That's a feature, not a bug.
- Databases as externalized memory. Session, cache, database — each has a cost, choose deliberately.
- **Singleton pattern**: some things should only exist once — your DB connection pool, config, logger. Shared resources, single instance.
- Failure is a first-class citizen. Three types: you broke it, they sent garbage, nobody controls it.
- **Circuit Breaker**: if a dependency keeps failing, stop calling it temporarily. Fail fast instead of cascading.
- **Retry with Backoff**: wait, retry, wait longer, retry. Don't flood a recovering service.
- Principle: your error responses are as much a product as your success responses.

**5. Letting Go of Control (5 min)**
- **Dependency Injection / IoC**: your service *receives* its tools, it doesn't create them. Test with a fake DB, deploy with a real one, same code.
- **Event-Driven / Pub-Sub**: instead of calling services directly, emit events. "Order was placed" — let notifications, inventory, and analytics react independently.
- **Queue-Based Load Leveling**: heavy work doesn't belong in the request. Push to a queue, process async, respond immediately.
- Common thread: the less a component knows about its surroundings, the more resilient and flexible it becomes.

**6. The Checklist (3 min)**
- Walk through `POST /orders` end-to-end:
  1. Middleware checks auth token
  2. Controller reads body, calls order service
  3. Service validates rules (strategy: applies correct pricing logic), calls repository
  4. Repository persists the order
  5. Service emits `order.created` event — notifications and inventory react async
  6. Controller returns a DTO, not the raw database record
- Before shipping any endpoint: What's the contract? Who's allowed? What if it fails? What state changes? Can someone abuse this?
- Frameworks and languages will keep changing. This thinking won't.