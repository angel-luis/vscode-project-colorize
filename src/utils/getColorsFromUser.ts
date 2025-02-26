import * as vscode from "vscode";

import type { Colors } from "./predefinedTheme";

function inputBox(prompt: string) {
  return {
    placeHolder: "#ffffff",
    prompt,
    validateInput: (text: string) => {
      const hexColorPattern = /^#?([a-fA-F0-9]{6})$/;
      return hexColorPattern.test(text)
        ? null
        : "Invalid hex color. Please enter a valid hex color (e.g., #ffffff).";
    },
  };
}

export default async function getColorsFromUser(
  context: vscode.ExtensionContext
): Promise<Colors | undefined> {
  const backgroundColorInput = await vscode.window.showInputBox(
    inputBox("Enter the color for the title bar")
  );

  if (!backgroundColorInput) {
    return;
  }

  const foregroundColorInput = await vscode.window.showInputBox(
    inputBox(
      "Enter the color for the title bar elements like the title or icons"
    )
  );

  if (!foregroundColorInput) {
    return;
  }

  const colors = {
    background: backgroundColorInput,
    foreground: foregroundColorInput,
  };

  // Clean context to avoid predefined colors overwritting
  context.workspaceState.update("themeName", undefined);

  return colors as Colors;
}
