import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.prevBlankLine', prevBlankLine),
        vscode.commands.registerCommand('extension.nextBlankLine', nextBlankLine)
    );
}

function prevBlankLine() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const currentPos = editor.selection.active;
    let lineNum = currentPos.line;

    // Skip current blank lines going up
    while (lineNum > 0 && isBlankLine(document.lineAt(lineNum))) {
        lineNum--;
    }

    // Search for previous blank line
    while (lineNum > 0) {
        lineNum--;
        if (isBlankLine(document.lineAt(lineNum))) {
            editor.selection = new vscode.Selection(lineNum, 0, lineNum, 0);
            editor.revealRange(new vscode.Range(lineNum, 0, lineNum, 0));
            return;
        }
    }

    // If no blank line found, go to start of document
    editor.selection = new vscode.Selection(0, 0, 0, 0);
}

function nextBlankLine() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const currentPos = editor.selection.active;
    let lineNum = currentPos.line;
    const lastLine = document.lineCount - 1;

    // Skip current blank lines going down
    while (lineNum < lastLine && isBlankLine(document.lineAt(lineNum))) {
        lineNum++;
    }

    // Search for next blank line
    while (lineNum < lastLine) {
        lineNum++;
        if (isBlankLine(document.lineAt(lineNum))) {
            editor.selection = new vscode.Selection(lineNum, 0, lineNum, 0);
            editor.revealRange(new vscode.Range(lineNum, 0, lineNum, 0));
            return;
        }
    }

    // If no blank line found, go to end of document
    editor.selection = new vscode.Selection(lastLine, 0, lastLine, 0);
}

function isBlankLine(line: vscode.TextLine): boolean {
    return line.text.trim().length === 0;
}

export function deactivate() {}
