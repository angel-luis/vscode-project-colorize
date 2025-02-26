import type * as vscode from "vscode";
import addGitPrecommit from "./utils/addGitPrecommit";
import getColorsFromUser from "./utils/getColorsFromUser";
import getConfigBarsFromUser from "./utils/getConfigBarsFromUser";
import getLockGitCommitFromUser from "./utils/getLockGitCommitFromUser";
import getPredefinedTheme from "./utils/getPredefinedTheme";
import updateSettingsJson from "./utils/updateSettingsJson";

export default async function commandHandler(
  option: string,
  context: vscode.ExtensionContext
) {
  /**
   * This options are triggered in two situations:
   * - predefinedTheme: when user manually asks for the theme menu
   * - contextTheme: when plugin is activated or theme light/dark has changed in VSC
   */
  if (option === "predefinedTheme" || option === "contextTheme") {
    const predefinedTheme = await getPredefinedTheme(option, context);

    // If user don't cancelled the menu or there is a predefined theme in the context, update the config
    if (predefinedTheme !== undefined) {
      updateSettingsJson({ context, colorsChoice: predefinedTheme });
    }
  }

  // When user choose the own colors option in the menu
  if (option === "userColors") {
    const userColors = await getColorsFromUser(context);

    // If user don't cancelled the menu, update the config
    if (userColors !== undefined) {
      updateSettingsJson({ context, colorsChoice: userColors });
    }
  }

  // When user wants to modify the bars color application in the menu
  if (option === "configBars") {
    const configBars = await getConfigBarsFromUser(context);

    // If user don't cancelled the menu, update the config
    if (configBars !== undefined) {
      updateSettingsJson({ context, configBarsChoice: configBars });
    }
  }

  // When user wants change the settings.json path
  if (option === "lockGitCommit") {
    const lockGitCommit = await getLockGitCommitFromUser(context);

    // If user don't cancelled the menu, update the config
    if (lockGitCommit !== undefined) {
      await addGitPrecommit(context);
    }
  }
}
