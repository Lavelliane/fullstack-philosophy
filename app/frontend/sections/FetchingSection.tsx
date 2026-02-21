import CodeBlock from "../../components/CodeBlock";
import Quiz from "../../components/Quiz";
import DragSort from "../../components/DragSort";
import MatchPairs from "../../components/MatchPairs";
import ChallengeLabel from "../../backend/components/ChallengeLabel";
import ChallengeSection from "../components/ChallengeSection";
import {
  fetchComponentCode,
  fetchStateBadCode,
  fetchStateGoodCode,
  fetchQuiz,
  fetchStatesMatchPairs,
  fetchDragSortItems,
  fetchDragSortCorrectOrder,
} from "../data";

const fetchSlideCode = `function UserProfile({ userId }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => { setUser(data); setLoading(false); })
      .catch(err => { setError(err);  setLoading(false); });
  }, [userId]);

  if (loading) return <Skeleton />;     // ← must handle
  if (error)   return <ErrorMessage />; // ← must handle
  return <UserCard user={user} />;      // ← happy path
}`;

export default function FetchingSection() {
  return (
    <section id="s4" style={{ scrollSnapAlign: "start" }}>

      {/* ── Slide ─────────────────────────────────────────────────────── */}
      <div
        className="relative flex items-center px-8 md:px-16 overflow-hidden"
        style={{ height: "calc(100vh - var(--nav-height, 61px))" }}
      >
        {/* Decorative number */}
        <span
          aria-hidden
          className="absolute right-0 top-0 font-light text-zinc-100 leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(140px, 28vw, 260px)", lineHeight: 1 }}
        >
          04
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full max-w-screen-xl relative z-10">

          {/* Left: concept */}
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-6 font-mono">
              Section 04 · 7 min
            </p>
            <h2
              className="font-light leading-[1.05] tracking-tight text-zinc-900 mb-8"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              Every fetch has
              <br />
              three states.
            </h2>

            {/* Three state cards */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-4 border border-amber-200 bg-amber-50 px-4 py-3">
                <span className="font-mono text-xs text-amber-700 font-medium shrink-0 mt-0.5 uppercase tracking-wider">
                  Loading
                </span>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Data is in transit.{" "}
                  <strong>Show a skeleton or spinner.</strong> Never leave the
                  user staring at blank space.
                </p>
              </div>

              <div className="flex items-start gap-4 border border-emerald-200 bg-emerald-50 px-4 py-3">
                <span className="font-mono text-xs text-emerald-700 font-medium shrink-0 mt-0.5 uppercase tracking-wider">
                  Success
                </span>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  Data arrived.{" "}
                  <strong>Render the real content.</strong> Pass data down as
                  props.
                </p>
              </div>

              <div className="flex items-start gap-4 border border-red-200 bg-red-50 px-4 py-3">
                <span className="font-mono text-xs text-red-700 font-medium shrink-0 mt-0.5 uppercase tracking-wider">
                  Error
                </span>
                <p className="text-sm text-red-800 leading-relaxed">
                  Something failed.{" "}
                  <strong>Show a clear message and a retry option.</strong>{" "}
                  Never fail silently.
                </p>
              </div>
            </div>

            <div className="border-l-2 border-zinc-900 pl-6 py-1">
              <p className="text-lg font-light text-zinc-900 leading-snug italic">
                &ldquo;The blank screen is never acceptable. Design for all
                three states — not just the happy path.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: code (desktop only) */}
          <div className="hidden lg:flex flex-col gap-3">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em]">
              Modelling all three states
            </p>
            <CodeBlock code={fetchSlideCode} lang="jsx" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300">
          <span className="text-xs font-mono uppercase tracking-[0.15em]">
            Practice ↓
          </span>
        </div>
      </div>

      {/* ── Workshop ──────────────────────────────────────────────────── */}
      <div className="flex flex-col">
        <div
          className="bg-zinc-50 border-t border-zinc-100 px-8 py-12 flex items-center justify-center"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="max-w-2xl text-center">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-3 font-mono">
              Challenges — Section 04
            </p>
            <p className="text-sm text-zinc-500 leading-[1.85]">
              Fetching is async. The app keeps rendering while the network
              request travels. Every state between &ldquo;sent&rdquo; and
              &ldquo;received&rdquo; is your responsibility to handle.
            </p>
          </div>
        </div>

        <ChallengeSection wide>
          <ChallengeLabel>The happy path trap</ChallengeLabel>
          <CodeBlock
            mode="split"
            code={fetchStateBadCode}
            splitCode={fetchStateGoodCode}
            labels={["Bad: only handles success", "Good: handles all three states"]}
          />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Full fetch component</ChallengeLabel>
          <CodeBlock code={fetchComponentCode} lang="jsx" />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge A: diagnose the crash</ChallengeLabel>
          <Quiz {...fetchQuiz} />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge B: state → UI response</ChallengeLabel>
          <MatchPairs
            pairs={fetchStatesMatchPairs}
            prompt="Match each fetch state to the correct UI response."
          />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge C: the fetch lifecycle</ChallengeLabel>
          <DragSort
            items={fetchDragSortItems}
            correctOrder={fetchDragSortCorrectOrder}
            prompt="Put the steps of a complete fetch lifecycle in the correct order."
          />
        </ChallengeSection>
      </div>
    </section>
  );
}
