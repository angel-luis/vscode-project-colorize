import * as vscode from "vscode";

export default async function removeColors(context: vscode.ExtensionContext) {
  // Remove context
  await context.workspaceState.update("themeName", undefined);

  // Remove any color settings in the workspace
  const configuration = vscode.workspace.getConfiguration();
  const section = "workbench.colorCustomizations";
  await configuration.update(
    section,
    undefined,
    vscode.ConfigurationTarget.Workspace
  );

  vscode.window.showInformationMessage(
    "Project Colorize: all colors and settings were removed."
  );
}
