import * as vscode from "vscode";

import cleanSelectedMark from "./cleanSelectedMark";
import getPredefinedTheme from "./getPredefinedTheme";
import { addColorOpacity, makeColorDarker } from "./modifyColor";

import type { Colors } from "./predefinedTheme";
/**
 * This function updates `settings.json` for several cases:
 * - When the user has selected a theme **or it exists a context theme**
 * - When the user has entered custom colors
 * - When the  user has selected another bar configuration
 */
export default async function updateSettingsJson({
  context,
  colorsChoice,
  configBarsChoice,
}: {
  context: vscode.ExtensionContext;
  colorsChoice?: Colors;
  configBarsChoice?: string;
}) {
  try {
    /**
     * Colors Configuration
     */
    let colors: Colors;

    // When user is changing the bars, not the colors (so it's undefined), it will try to get it from the context
    if (!colorsChoice) {
      const currentThemeName: Colors | undefined = await getPredefinedTheme(
        "contextTheme",
        context
      );

      // Early `updateSettingsJson` exit because if user has not selected any color, it has no sense update the config file
      if (!currentThemeName) {
        return;
      }

      colors = currentThemeName;
    } else {
      colors = colorsChoice;
    }

    /**
     * Bars Configuration
     */
    let configBars = "Only Title Bar";

    // When user is changing the theme, not the bars (so it's undefined), it will try to get it from the context
    if (!configBarsChoice) {
      const workspaceState: string | undefined =
        await context.workspaceState.get("configBars");
      const currentConfigBars = cleanSelectedMark(workspaceState);

      if (currentConfigBars) {
        configBars = currentConfigBars;
      }
    } else {
      configBars = configBarsChoice;
    }

    /**
     * Create the new settings configuration according to the user preferences
     */
    let newConfig = {};

    switch (configBars) {
      case "Only Title Bar":
        newConfig = {
          "titleBar.activeBackground": colors.background,
          "titleBar.border": colors.background,
          "titleBar.activeForeground": colors.foreground,
          "titleBar.inactiveBackground": addColorOpacity(
            colors.background,
            0.15
          ),
          "titleBar.inactiveForeground": addColorOpacity(
            colors.foreground,
            0.15
          ),
        };
        break;
      case "Only Activity Bar":
        newConfig = {
          "activityBar.background": colors.background,
          "activityBar.foreground": colors.foreground,
          "activityBar.inactiveForeground": makeColorDarker(
            colors.foreground,
            0.8
          ),
        };
        break;
      case "Only Status Bar":
        newConfig = {
          "statusBar.background": colors.background,
          "statusBar.border": colors.background,
          "statusBar.foreground": colors.foreground,
        };
        break;
      case "Title Bar + Activity Bar":
        newConfig = {
          "titleBar.activeBackground": colors.background,
          "titleBar.border": colors.background,
          "titleBar.activeForeground": colors.foreground,
          "titleBar.inactiveBackground": addColorOpacity(
            colors.background,
            0.15
          ),
          "titleBar.inactiveForeground": addColorOpacity(
            colors.foreground,
            0.15
          ),
          "activityBar.background": colors.background,
          "activityBar.foreground": colors.foreground,
          "activityBar.inactiveForeground": makeColorDarker(
            colors.foreground,
            0.8
          ),
        };
        break;
      case "Title Bar + Status Bar":
        newConfig = {
          "titleBar.activeBackground": colors.background,
          "titleBar.border": colors.background,
          "titleBar.activeForeground": colors.foreground,
          "titleBar.inactiveBackground": addColorOpacity(
            colors.background,
            0.15
          ),
          "titleBar.inactiveForeground": addColorOpacity(
            colors.foreground,
            0.15
          ),
          "statusBar.background": colors.background,
          "statusBar.border": colors.background,
          "statusBar.foreground": colors.foreground,
        };
        break;
      case "Activity Bar + Status Bar":
        newConfig = {
          "activityBar.background": colors.background,
          "activityBar.foreground": colors.foreground,
          "activityBar.inactiveForeground": makeColorDarker(
            colors.foreground,
            0.8
          ),
          "statusBar.background": colors.background,
          "statusBar.border": colors.background,
          "statusBar.foreground": colors.foreground,
        };
        break;
      case "All Bars":
        newConfig = {
          "titleBar.activeBackground": colors.background,
          "titleBar.border": colors.background,
          "titleBar.activeForeground": colors.foreground,
          "titleBar.inactiveBackground": addColorOpacity(
            colors.background,
            0.15
          ),
          "titleBar.inactiveForeground": addColorOpacity(
            colors.foreground,
            0.15
          ),
          "activityBar.background": colors.background,
          "activityBar.foreground": colors.foreground,
          "activityBar.inactiveForeground": makeColorDarker(
            colors.foreground,
            0.8
          ),
          "statusBar.background": colors.background,
          "statusBar.border": colors.background,
          "statusBar.foreground": colors.foreground,
        };
        break;
    }

    // Update settings.json from Workspace
    await vscode.workspace
      .getConfiguration()
      .update(
        "workbench.colorCustomizations",
        newConfig,
        vscode.ConfigurationTarget.Workspace
      );
  } catch (error) {
    vscode.window.showErrorMessage(
      `Error customizing title bar colors: ${error}`
    );
  }
}
