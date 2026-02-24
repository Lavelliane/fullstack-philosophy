import CodeBlock from "../components/CodeBlock";
import CodeWithDiagram from "../components/CodeWithDiagram";
import Quiz from "../../components/Quiz";
import MatchPairs from "../../components/MatchPairs";
import ChallengeLabel from "../../backend/components/ChallengeLabel";
import ChallengeSection from "../components/ChallengeSection";
import RoutePreviewDemo from "../components/RoutePreviewDemo";
import UrlParamsDemo from "../components/UrlParamsDemo";
import TraditionalVsSpaFlow from "../components/TraditionalVsSpaFlow";
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
            <CodeBlock code={routingSlideCode} lang="jsx" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-8 md:left-16 text-zinc-300">
          <span className="text-xs font-mono uppercase tracking-[0.15em]">
            Practice ↓
          </span>
        </div>
      </div>

      {/* Traditional vs SPA comparison */}
      <ChallengeSection>
        <ChallengeLabel>Traditional pages vs SPA</ChallengeLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
          <div className="border border-zinc-200 rounded-lg p-6 bg-white">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">Traditional (multi-page)</p>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 shrink-0">•</span>
                <span>Every link click triggers a <strong className="text-zinc-800">full page reload</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 shrink-0">•</span>
                <span>Server returns a new HTML document for each URL</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 shrink-0">•</span>
                <span>Browser discards the old page and fetches everything again</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 shrink-0">•</span>
                <span>Slower: full re-download, re-parse, re-render</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-zinc-400 shrink-0">•</span>
                <span>Simple model: one URL = one server response</span>
              </li>
            </ul>
          </div>
          <div className="border border-emerald-200 rounded-lg p-6 bg-emerald-50/30">
            <p className="text-xs font-mono uppercase tracking-wider text-emerald-700 mb-3">SPA (single-page)</p>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                <span>One HTML file. Link clicks are <strong className="text-zinc-800">intercepted by JavaScript</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                <span>Router swaps components in-place based on URL</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                <span>No full reload — app state persists, only the view changes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                <span>Faster: no document reload, smoother transitions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 shrink-0">•</span>
                <span>Same URL model for sharing, bookmarking, back button</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <TraditionalVsSpaFlow />
        </div>
      </ChallengeSection>

      {/* ── Workshop ──────────────────────────────────────────────────── */}
      <div className="flex flex-col">
        <div
          className="bg-zinc-50 border-t border-zinc-100 px-8 py-12 flex items-center justify-center"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="max-w-7xl text-center">
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
        <ChallengeSection>
          <ChallengeLabel>Route definitions</ChallengeLabel>
          <CodeWithDiagram
            label="Map URLs to components"
            description="Declare routes once. The router handles param parsing, active links, and navigation."
            code={routingCode}
            lang="jsx"
            diagram={<RoutePreviewDemo layout="stacked" />}
            orientation="horizontal"
          />
        </ChallengeSection>

        {/* URL as state */}
        <ChallengeSection>
          <ChallengeLabel>URL as state</ChallengeLabel>
          <CodeWithDiagram
            label="Params and search in the URL"
            description="useParams() and useSearchParams() read from the URL. Change the URL → component re-renders with new values."
            code={urlStateCode}
            lang="jsx"
            diagram={<UrlParamsDemo />}
            orientation="horizontal"
          />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge A: the refresh problem</ChallengeLabel>
          <Quiz {...routingQuiz} scoreId="frontend:s5:quiz" />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge B: match the routing APIs</ChallengeLabel>
          <MatchPairs
            pairs={routingMatchPairs}
            prompt="Match each routing concept to what it does."
            scoreId="frontend:s5:match"
          />
        </ChallengeSection>
      </div>
    </section>
  );
}
