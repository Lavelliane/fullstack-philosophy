import { highlightCode } from "../../lib/shiki";

type CodeBlockProps = {
  code: string;
  mode?: "single" | "split";
  splitCode?: string;
  labels?: [string, string];
  lang?: string;
};

async function HighlightedPre({ code, lang = "typescript" }: { code: string; lang?: string }) {
  const html = await highlightCode(code, lang);

  return (
    <div
      className="w-full overflow-x-auto rounded-none border border-zinc-200 dark:border-zinc-700 [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!p-5 [&_pre]:!text-xs [&_pre]:!leading-[1.85] [&_pre]:!font-mono [&_pre]:!whitespace-pre"
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}

export default async function CodeBlock({
  code,
  mode = "single",
  splitCode,
  labels = ["Before", "After"],
  lang = "typescript",
}: CodeBlockProps) {
  if (mode === "split" && splitCode) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="inline-block text-xs text-red-400 uppercase tracking-[0.15em] mb-2">
            {labels[0]}
          </span>
          <HighlightedPre code={code} lang={lang} />
        </div>
        <div>
          <span className="inline-block text-xs text-emerald-500 uppercase tracking-[0.15em] mb-2">
            {labels[1]}
          </span>
          <HighlightedPre code={splitCode} lang={lang} />
        </div>
      </div>
    );
  }

  return <HighlightedPre code={code} lang={lang} />;
}
