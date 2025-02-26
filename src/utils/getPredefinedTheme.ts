import * as vscode from "vscode";

import addSelectedToList from "./addSelectedToList";
import cleanSelectedMark from "./cleanSelectedMark";
import getContextTheme from "./getContextTheme";
import { predefinedTheme } from "./predefinedTheme";

import type { Colors } from "./predefinedTheme";
// It gets the name so doesn't matter if 1 (light) or 2 (dark)
const availableColors = Object.keys(predefinedTheme[1]);

/**
 *  Options:
 *  - 'predefinedTheme' asks user for a predefined color
 *  - 'contextTheme' will find in the context a predefined color
 */
export default async function getPredefinedTheme(
  option: string,
  context: vscode.ExtensionContext
) {
  let selectedTheme: string | undefined;

  if (option === "predefinedTheme") {
    const optionsList: string[] = await addSelectedToList({
      context,
      key: "themeName",
      list: availableColors,
    });

    // Show a theme picker
    const themeChoice = await vscode.window.showQuickPick(optionsList, {
      placeHolder: "Select a color...",
    });

    // if user didn't choice any theme, it will return 'undefined'
    selectedTheme = cleanSelectedMark(themeChoice);
  }

  if (option === "contextTheme") {
    selectedTheme = await getContextTheme(context);
  }

  // if user hasn't chosen any theme (via menu or context), return 'undefined'
  if (!selectedTheme) {
    return;
  }

  context.workspaceState.update("themeName", selectedTheme);

  /**
   * 'predefinedTheme' is an array containining at the top level:
   * 1 => Light Themes
   * 2 => Dark Themes
   * This is because VSC 'activeColorTheme' returns 1/2 based on
   * the active theme
   */
  return predefinedTheme[vscode.window.activeColorTheme.kind][
    selectedTheme
  ] as Colors;
}
