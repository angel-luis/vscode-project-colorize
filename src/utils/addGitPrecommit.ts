import { execSync } from "child_process";
import vscode from "vscode";

import cleanSelectedMark from "./cleanSelectedMark";

const binHead = "#!/bin/sh";

const gitHook = `# Project Colorize | Avoid commiting changes to .vscode/settings.json
if [ -f ".vscode/settings.json" ]; then
  if git diff --cached --name-only | grep -q ".vscode/settings.json"; then
    git reset HEAD .vscode/settings.json
  fi
fi`;

function getDirUri() {
  try {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (workspaceFolders) {
      const workspaceUri = workspaceFolders[0].uri;
      return vscode.Uri.joinPath(workspaceUri, ".git/hooks/pre-commit");
    }
  } catch (error) {
    console.error(error);
    vscode.window.showErrorMessage("Couldn't find the workspace...");
  }
}

async function saveFile(newContent: string, dirUri: vscode.Uri) {
  if (newContent === "") {
    return;
  }

  try {
    // Create the buffer with the content
    const newContentBuffer = Buffer.from(newContent, "utf8");

    // Write the buffer to the file
    await vscode.workspace.fs.writeFile(dirUri, newContentBuffer);

    // Set execute permissions
    execSync(`chmod +x ${dirUri.fsPath}`);
  } catch (error) {
    console.error(error);
    vscode.window.showErrorMessage("Couldn't write the Git hook...");
  }
}

async function readFile(dirUri: vscode.Uri) {
  try {
    // Attempt to read the existing file content
    const existingContent = await vscode.workspace.fs.readFile(dirUri);

    return existingContent.toString().split("\n");
  } catch (error) {
    // Couldn't open the file, so it doesnt' exist
    return false;
  }
}

export default async function addGitPrecommit(
  context: vscode.ExtensionContext
) {
  const workspaceState: string | undefined = await context.workspaceState.get(
    "lockGitCommit"
  );
  const lockGitCommit = cleanSelectedMark(workspaceState);

  const dirUri = getDirUri();

  if (dirUri) {
    const fileContent = await readFile(dirUri);
    let newContent = "";

    // The file pre-commit already exists
    if (fileContent) {
      // The user wants to lock the file
      if (lockGitCommit === "Yes") {
        // Probably: the file exists but it's empty
        if (!fileContent.some((line) => line.includes("#!/bin/sh"))) {
          newContent = binHead + "\n\n" + gitHook;
        } else {
          // The file exists but (probably) the content it's from the user (not the Hook from Project Colorize)
          if (
            !fileContent.some((line) => line.includes(".vscode/settings.json"))
          ) {
            newContent = fileContent.join("\n") + "\n" + gitHook + "\n";
          }
        }
        // The user doesn't want to lock the file
      } else {
        // The file exists and it's the Project Colorize hook
        if (
          fileContent.some((line) => line.includes(".vscode/settings.json"))
        ) {
          // Remove hook
          const gitHookLines = gitHook.split("\n").map((line) => line.trim());

          newContent = fileContent
            .filter(
              (line) =>
                !gitHookLines.some((gitHookLine) => line.includes(gitHookLine))
            )
            .join("\n");
        }
      }
      // The file doesn't exist and the user wants to lock it
    } else if (lockGitCommit === "Yes") {
      newContent = binHead + "\n\n" + gitHook;
    }

    // Save the file
    await saveFile(newContent, dirUri);
  }

  return;
}
