import CodeBlock from "./CodeBlock";
import CodeVisual from "./CodeVisual";

type Orientation = "horizontal" | "vertical";

type CodeFile = { label: string; code: string; lang: string };

type CodeWithDiagramProps = {
  /** Optional. When omitted, no label/description block is shown. */
  label?: string;
  /** Optional. Shown below label. */
  description?: React.ReactNode;
  /** Single code block. Ignored when codeFiles is provided. */
  code?: string;
  lang?: string;
  /** Multiple files (e.g. index.html, styles.css, main.js). When provided, code is ignored. */
  codeFiles?: CodeFile[];
  diagram: React.ReactNode;
  /** horizontal = code left, diagram right. vertical = code top, diagram bottom. */
  orientation?: Orientation;
  /** Optional footer text below code+diagram row */
  footer?: React.ReactNode;
};

/** Layout: concept + code with diagram. Orientation controls code/diagram placement. */
export default function CodeWithDiagram({
  label,
  description,
  code,
  lang = "jsx",
  codeFiles,
  diagram,
  orientation = "horizontal",
  footer,
}: CodeWithDiagramProps) {
  const isHorizontal = orientation === "horizontal";
  const codeContent = codeFiles ? (
    <div className="min-w-0 max-w-xl w-full shrink-0 space-y-3">
      {codeFiles.map(({ label: fileLabel, code: fileCode, lang: fileLang }) => (
        <div key={fileLabel}>
          <span className="inline-block text-xs text-zinc-500 font-mono uppercase tracking-wider mb-1.5">
            {fileLabel}
          </span>
          <CodeBlock code={fileCode} lang={fileLang} />
        </div>
      ))}
    </div>
  ) : (
    <div className="min-w-0 max-w-xl w-full shrink-0">
      <CodeBlock code={code!} lang={lang} />
    </div>
  );

  return (
    <div className="flex flex-col gap-3 shrink-0 max-w-xl w-full">
      {(label != null || description != null) && (
        <div>
          {label != null && <h3 className="text-base font-semibold text-zinc-900 mb-1">{label}</h3>}
          {description != null && <div className="text-sm text-zinc-600 leading-relaxed">{description}</div>}
        </div>
      )}
      <div
        className={
          isHorizontal
            ? "flex gap-4 items-start"
            : "flex flex-col gap-4"
        }
      >
        {codeContent}
        <div className="min-w-0 shrink-0 max-w-xl flex items-center justify-start">
          <CodeVisual>{diagram}</CodeVisual>
        </div>
      </div>
      {footer && <div className="text-sm text-zinc-500">{footer}</div>}
    </div>
  );
}
