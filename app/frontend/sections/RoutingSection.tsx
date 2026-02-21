import CodeBlock from "../components/CodeBlock";
import CodeVisual from "../components/CodeVisual";
import Quiz from "../../components/Quiz";
import MatchPairs from "../../components/MatchPairs";
import ChallengeLabel from "../../backend/components/ChallengeLabel";
import ChallengeSection from "../components/ChallengeSection";
import { RoutesVisual, UrlParamsVisual } from "../components/CodeVisuals";
import RoutePreviewDemo from "../components/RoutePreviewDemo";
import { routingCode, urlStateCode, routingQuiz, routingMatchPairs } from "../data";

const routingSlideCode = `// URL to Component, declared once
<Routes>
  <Route path="/"             element={<Home />} />
  <Route path="/students"     element={<StudentList />} />
  <Route path="/students/:id" element={<StudentProfile />} />
  <Route path="*"             element={<NotFound />} />
</Routes>

// Inside StudentProfile:
const { id } = useParams(); // /students/42 → "42"

// Navigate without reload:
navigate('/students');`;

export default function RoutingSection() {
  return (
    <section id="s5" style={{ scrollSnapAlign: "start" }}>

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
          05
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full max-w-7xl relative z-10">

          {/* Left: concept */}
          <div>
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-6 font-mono">
              Section 05 · 5 min
            </p>
            <h2
              className="font-light leading-[1.05] tracking-tight text-zinc-900 mb-10"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              Pages are
              <br />
              an illusion.
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="font-mono text-xs bg-zinc-900 text-white px-2.5 py-1.5 shrink-0 tracking-widest mt-0.5">
                  SPA
                </span>
                <p className="text-base text-zinc-600 leading-relaxed">
                  One HTML file. JavaScript intercepts link clicks,{" "}
                  <strong className="text-zinc-900">swaps components</strong>{" "}
                  based on the URL with no full page reload.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-mono text-xs bg-zinc-500 text-white px-2.5 py-1.5 shrink-0 tracking-widest mt-0.5">
                  URL = State
                </span>
                <p className="text-base text-zinc-600 leading-relaxed">
                  The URL is{" "}
                  <strong className="text-zinc-900">
                    the only state that survives a reload.
                  </strong>{" "}
                  A student can share it, bookmark it, or hit back and land
                  exactly where they left off.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-mono text-xs bg-zinc-200 text-zinc-800 px-2.5 py-1.5 shrink-0 tracking-widest mt-0.5">
                  Declare
                </span>
                <p className="text-base text-zinc-600 leading-relaxed">
                  Map URLs to components. The router handles the rest:
                  active link styling, param parsing, navigation history.
                </p>
              </div>
            </div>

            <div className="mt-10 border-l-2 border-zinc-900 pl-6 py-1">
              <p className="text-lg font-light text-zinc-900 leading-snug italic">
                &ldquo;The browser back button must always work. Don&apos;t
                break the web&apos;s fundamental navigation model.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: code (desktop only) */}
          <div className="hidden lg:flex flex-col gap-3">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em]">
              Declarative routing
            </p>
            <div className="flex flex-col gap-4">
              <CodeBlock code={routingSlideCode} lang="jsx" />
              <CodeVisual><RoutesVisual /></CodeVisual>
            </div>
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
              Challenges: Section 05
            </p>
            <p className="text-sm text-zinc-500 leading-[1.85]">
              If something in your app can be shared or linked to, it belongs
              in the URL. The current tab, the selected filter, the open modal,
              anything that represents a meaningful place.
            </p>
          </div>
        </div>

        {/* Route definitions + interactive preview */}
        <ChallengeSection wide>
          <ChallengeLabel>Route definitions</ChallengeLabel>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 max-w-xl">
              <CodeBlock code={routingCode} lang="jsx" />
              <CodeVisual><RoutesVisual /></CodeVisual>
            </div>

            {/* Interactive: click a route → see the page it renders */}
            <div>
              <RoutePreviewDemo />
            </div>
          </div>
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>URL as state</ChallengeLabel>
          <div className="flex flex-col gap-4">
            <CodeBlock code={urlStateCode} lang="jsx" />
            <CodeVisual><UrlParamsVisual /></CodeVisual>
          </div>
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge A: the refresh problem</ChallengeLabel>
          <Quiz {...routingQuiz} />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge B: match the routing APIs</ChallengeLabel>
          <MatchPairs
            pairs={routingMatchPairs}
            prompt="Match each routing concept to what it does."
          />
        </ChallengeSection>
      </div>
    </section>
  );
}
