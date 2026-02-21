import { codeToHtml } from "shiki";

const THEME = "github-light" as const;

export async function highlightCode(
  code: string,
  lang: string = "typescript"
): Promise<string> {
  return codeToHtml(code, {
    lang: lang as "typescript",
    theme: THEME,
  });
}
