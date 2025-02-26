import * as vscode from "vscode";

import commandHandler from "./commandHandler";
import removeColors from "./utils/removeColors";

export async function activate(context: vscode.ExtensionContext) {
  const commands = [
    vscode.commands.registerCommand("project-colorize.predefinedTheme", () =>
      commandHandler("predefinedTheme", context)
    ),
    vscode.commands.registerCommand("project-colorize.userColors", () =>
      commandHandler("userColors", context)
    ),
    vscode.commands.registerCommand("project-colorize.configBars", () =>
      commandHandler("configBars", context)
    ),
    vscode.commands.registerCommand("project-colorize.lockGitCommit", () =>
      commandHandler("lockGitCommit", context)
    ),
    vscode.commands.registerCommand("project-colorize.removeColors", () =>
      removeColors(context)
    ),
  ];

  // Update to the correct light/dark scheme at VSC scheme change (if theme exists in context)
  vscode.window.onDidChangeActiveColorTheme(async () => {
    commandHandler("contextTheme", context);
  });

  // Make all the commands available
  context.subscriptions.concat(commands);

  // Update to the correct light/dark scheme at start (if theme exists in context)
  await commandHandler("contextTheme", context);

  // Small fix for previous versions (01/06/2024)
  if (context.workspaceState.get("configBars") === "Only Title Bar (Default)") {
    context.workspaceState.update("configBars", "Only Title Bar");
  }
}

export async function deactivate(context: vscode.ExtensionContext) {
  // It will delete the theme context and colors in settings.json
  removeColors(context);
  // Also removes the rest of configuration
  context.workspaceState.update("configBars", undefined);
  context.workspaceState.update("lockGitCommit", undefined);
}
