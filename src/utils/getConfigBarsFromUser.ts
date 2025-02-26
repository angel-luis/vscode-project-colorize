import * as vscode from "vscode";

import addSelectedToList from "./addSelectedToList";

export default async function getConfigBarsFromUser(
  context: vscode.ExtensionContext
) {
  const configBarsOptions = [
    "Only Title Bar",
    "Only Activity Bar",
    "Only Status Bar",
    "Title Bar + Activity Bar",
    "Title Bar + Status Bar",
    "Activity Bar + Status Bar",
    "All Bars",
  ];

  const optionsList: string[] = await addSelectedToList({
    context,
    key: "configBars",
    list: configBarsOptions,
  });

  const configBarsChoice = await vscode.window.showQuickPick(optionsList, {
    placeHolder: "Select an option...",
  });

  if (!configBarsChoice) {
    return;
  }

  await context.workspaceState.update("configBars", configBarsChoice);

  return configBarsChoice;
}
