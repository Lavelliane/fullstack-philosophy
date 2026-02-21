import CodeBlock from "../../components/CodeBlock";
import Quiz from "../../components/Quiz";
import DragSort from "../../components/DragSort";
import MatchPairs from "../../components/MatchPairs";
import ChallengeLabel from "../../backend/components/ChallengeLabel";
import ChallengeSection from "../components/ChallengeSection";
import ComponentsVisual from "../components/ComponentsVisual";
import {
  componentGoodCode,
  propsCode,
  propsFlowLoopCode,
  propsSourcesCode,
  childrenCode,
  componentQuiz,
  componentDragSortItems,
  componentDragSortCorrectOrder,
  propsMatchPairs,
} from "../data";

const compositionSlideCode = `// Parent owns data, passes as props
function ProfilePage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers);
  }, []);

  return (
    <Layout>
      <NavBar />
      {users.map(u => (
        <UserCard key={u.id} user={u} />  {/* one component, many uses */}
      ))}
      <Footer />
    </Layout>
  );
}`;

export default function ComponentsSection() {
  return (
    <section id="s2" style={{ scrollSnapAlign: "start" }}>

      {/* ── Slide ─────────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col justify-center px-8 md:px-16 overflow-y-auto py-6"
        style={{ height: "calc(100vh - var(--nav-height, 61px))" }}
      >
        {/* Decorative number */}
        <span
          aria-hidden
          className="absolute right-0 top-0 font-light text-zinc-100 leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(120px, 24vw, 200px)", lineHeight: 1 }}
        >
          02
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 w-full max-w-screen-xl relative z-10 shrink-0">

          {/* Left: concept & discussion */}
          <div className="min-w-0">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-2 font-mono">
              Section 02 · 5 min
            </p>
            <h2
              className="font-light leading-[1.05] tracking-tight text-zinc-900 mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              Stop copying.
              <br />
              Start composing.
            </h2>

            <p className="text-sm text-zinc-600 leading-relaxed mb-4">
              Break UI into <strong className="text-zinc-900">self-contained units</strong> — Button, UserCard, NavBar.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-zinc-900 text-white px-2 py-1 shrink-0 tracking-widest mt-0.5">
                  Component
                </span>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  <strong className="text-zinc-900">Reusability.</strong> One definition, many uses. Change once → updates everywhere.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-zinc-500 text-white px-2 py-1 shrink-0 tracking-widest mt-0.5">
                  Props
                </span>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  <strong className="text-zinc-900">Parent passes data down.</strong> Child receives, renders. Props come from parent&apos;s state, fetch, or its props.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-zinc-400 text-white px-2 py-1 shrink-0 tracking-widest mt-0.5">
                  Children
                </span>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Content between tags. <strong className="text-zinc-900">&lt;Card&gt;...&lt;/Card&gt;</strong> — whatever goes inside becomes the <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded">children</code> prop.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono text-xs bg-zinc-200 text-zinc-800 px-2 py-1 shrink-0 tracking-widest mt-0.5">
                  Compose
                </span>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Nest simple parts. <strong className="text-zinc-900">Page is components all the way down.</strong>
                </p>
              </div>
            </div>

            <div className="mt-4 border-l-2 border-zinc-900 pl-4 py-0.5">
              <p className="text-base font-light text-zinc-900 leading-snug italic">
                &ldquo;Change the component once. It updates everywhere.&rdquo;
              </p>
              <p className="text-xs text-zinc-500 mt-1.5 not-italic">
                Props down. State up. Re-render → new props. That&apos;s the loop.
              </p>
            </div>
          </div>

          {/* Right: code */}
          <div className="flex flex-col gap-2 min-w-0">
            <p className="text-xs text-zinc-400 uppercase tracking-[0.15em]">
              In code
            </p>
            <CodeBlock code={compositionSlideCode} lang="jsx" />
          </div>
        </div>

        {/* Visual: full width, directly below */}
        <div className="w-full px-0 pt-4 shrink-0">
          <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-1.5">
            What it looks like
          </p>
          <ComponentsVisual />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-8 md:left-16 text-zinc-300">
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
              Challenges — Section 02
            </p>
            <p className="text-sm text-zinc-500 leading-[1.85]">
              Copy-paste vs reuse. Where props come from. The flow loop. Same ideas, hands-on.
            </p>
          </div>
        </div>

        <ChallengeSection wide>
          <ChallengeLabel>Code comparison: copy-paste vs. reuse</ChallengeLabel>
          <CodeBlock
            mode="split"
            code={`<!-- Bad: copy the same card three times -->
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
<!-- 50 users? Copy 50 times. Change the card? Change 50 places. -->`}
            splitCode={componentGoodCode}
            labels={["Bad: copy-paste everywhere", "Good: one component, used everywhere"]}
          />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Props: same component, different inputs</ChallengeLabel>
          <CodeBlock code={propsCode} lang="jsx" />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>The props flow loop</ChallengeLabel>
          <p className="text-base font-medium text-zinc-900 mb-4 border-l-2 border-zinc-300 pl-4">
            <strong>Parent owns data</strong> → passes props → <strong>child renders</strong>. State change → re-render → new props.
          </p>
          <CodeBlock code={propsFlowLoopCode} lang="jsx" />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Where do props come from?</ChallengeLabel>
          <p className="text-base font-medium text-zinc-900 mb-4 border-l-2 border-zinc-300 pl-4">
            <strong>Always the parent.</strong> From state, fetch, or pass-through.
          </p>
          <CodeBlock code={propsSourcesCode} lang="jsx" />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Children: content between tags</ChallengeLabel>
          <p className="text-base font-medium text-zinc-900 mb-4 border-l-2 border-zinc-300 pl-4">
            <strong>Whatever goes inside the tags</strong> is passed as the <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded">children</code> prop.
          </p>
          <CodeBlock code={childrenCode} lang="jsx" />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge A: reuse in action</ChallengeLabel>
          <Quiz {...componentQuiz} />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge B: match the vocabulary</ChallengeLabel>
          <MatchPairs
            pairs={propsMatchPairs}
            prompt="Match each term to its correct definition."
          />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Challenge C: build a component</ChallengeLabel>
          <DragSort
            items={componentDragSortItems}
            correctOrder={componentDragSortCorrectOrder}
            prompt="Drag the steps into the correct order for creating and using a React component."
          />
        </ChallengeSection>

        <ChallengeSection>
          <ChallengeLabel>Compose: putting it together</ChallengeLabel>
          <p className="text-base font-medium text-zinc-900 mb-4 border-l-2 border-zinc-300 pl-4">
            <strong>Nest components.</strong> A page is Layout with NavBar, content, and Footer inside. Components all the way down.
          </p>
          <CodeBlock code={compositionSlideCode} lang="jsx" />
        </ChallengeSection>
      </div>
    </section>
  );
}
