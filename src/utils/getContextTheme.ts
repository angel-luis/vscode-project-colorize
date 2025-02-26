import type * as vscode from "vscode";

export default async function getContextTheme(
  context: vscode.ExtensionContext
) {
  // Get key from context to check if user has already selected a theme
  const contextTheme: string | undefined = await context.workspaceState.get(
    "themeName"
  );

  // if user didn't choice any theme, it will return 'undefined'
  return contextTheme;
}
