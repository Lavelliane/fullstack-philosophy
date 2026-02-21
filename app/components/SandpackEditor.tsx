"use client";

import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackConsole,
  SandpackPreview,
  SandpackLayout,
  useSandpack,
} from "@codesandbox/sandpack-react";

function RunButton() {
  const { sandpack } = useSandpack();
  return (
    <button
      onClick={() => sandpack.runSandpack()}
      className="px-4 py-1.5 text-xs font-mono bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
    >
      ▶ Run
    </button>
  );
}

type SandpackEditorProps = {
  files: Record<string, string>;
  activeFile?: string;
  hint?: string;
};

export default function SandpackEditor({
  files,
  activeFile,
  hint,
}: SandpackEditorProps) {
  const sandpackFiles = Object.fromEntries(
    Object.entries(files).map(([path, code]) => [path, { code }])
  );

  return (
    <div className="flex flex-col gap-3">
      {hint && (
        <div className="border-l-2 border-zinc-300 pl-4 text-xs text-zinc-500 leading-relaxed font-mono">
          <strong className="text-zinc-700">Task:</strong> {hint}
        </div>
      )}

      <SandpackProvider
        template="vanilla-ts"
        files={sandpackFiles}
        options={{
          activeFile,
          visibleFiles: Object.keys(sandpackFiles),
          autorun: false,
        }}
        theme="light"
        customSetup={{
          entry: "/index.ts",
        }}
      >
        <div style={{ display: "none" }}>
          <SandpackPreview />
        </div>
        <SandpackLayout>
          <SandpackCodeEditor
            showLineNumbers
            showInlineErrors
            wrapContent
            style={{ height: 380, fontSize: 12 }}
          />
          <SandpackConsole
            showHeader
            showResetConsoleButton
            style={{ height: 380, fontSize: 12 }}
          />
        </SandpackLayout>
        <div className="flex justify-end mt-2">
          <RunButton />
        </div>
      </SandpackProvider>
    </div>
  );
}
