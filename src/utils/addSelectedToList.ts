import type * as vscode from "vscode";
import cleanSelectedMark from "./cleanSelectedMark";

export default async function addSelectedToList({
  context,
  key,
  list,
}: {
  context: vscode.ExtensionContext;
  key: string;
  list: string[];
}) {
  const workspaceState: string | undefined = await context.workspaceState.get(
    key
  );

  // Set <Selected> based on if it's already selected by the user (so it's in the workspace state)
  if (workspaceState) {
    const keyValue = cleanSelectedMark(workspaceState);

    return list.map((option) => {
      if (option === keyValue) {
        return `${option} <Selected>`;
      }

      return option;
    });
    // Set <Selected> for the first option because they're the predefined options
  } else if (key !== "themeName") {
    return list.map((option, index) => {
      if (index === 0) {
        return `${option} <Selected>`;
      }

      return option;
    });
  }

  // As themes aren't selected by default, never put <Selected> when there is no keyValue but is a theme
  return list;
}
