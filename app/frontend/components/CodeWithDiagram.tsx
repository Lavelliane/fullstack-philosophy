import CodeBlock from "./CodeBlock";
import CodeVisual from "./CodeVisual";

type Orientation = "horizontal" | "vertical";

type CodeWithDiagramProps = {
  /** Optional. When omitted, no label/description block is shown. */
  label?: string;
  /** Optional. Shown below label. */
  description?: React.ReactNode;
  code: string;
  lang?: string;
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
  diagram,
  orientation = "horizontal",
  footer,
}: CodeWithDiagramProps) {
  const isHorizontal = orientation === "horizontal";

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
        <div className="min-w-0 max-w-xl w-full shrink-0">
          <CodeBlock code={code} lang={lang} />
        </div>
        <div className="min-w-0 shrink-0 max-w-xl flex items-center justify-start">
          <CodeVisual>{diagram}</CodeVisual>
        </div>
      </div>
      {footer && <div className="text-sm text-zinc-500">{footer}</div>}
    </div>
  );
}
