import { codeToHtml } from "shiki";

export async function highlightCode(
  code: string,
  lang: string = "typescript"
): Promise<string> {
  return codeToHtml(code, {
    lang: lang as "typescript",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });
}
