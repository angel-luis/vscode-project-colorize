import * as vscode from "vscode";

import addSelectedToList from "./addSelectedToList";

export default async function getLockGitCommitFromUser(
  context: vscode.ExtensionContext
) {
  const lockGitCommitOptions = ["No", "Yes"];

  const optionsList: string[] = await addSelectedToList({
    context,
    key: "lockGitCommit",
    list: lockGitCommitOptions,
  });

  const lockGitCommitChoice = await vscode.window.showQuickPick(optionsList, {
    placeHolder: "Select an option...",
  });

  if (!lockGitCommitChoice) {
    return;
  }

  await context.workspaceState.update("lockGitCommit", lockGitCommitChoice);

  return lockGitCommitChoice;
}
