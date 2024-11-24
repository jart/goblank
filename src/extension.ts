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
    const anchorPos = editor.selection.anchor;
    let lineNum = currentPos.line;

    // Skip current blank lines going up
    while (lineNum > 0 && isBlankLine(document.lineAt(lineNum))) {
        lineNum--;
    }

    // Search for previous blank line
    while (lineNum > 0) {
        lineNum--;
        if (isBlankLine(document.lineAt(lineNum))) {
            const newPos = new vscode.Position(lineNum, 0);
            editor.selection = new vscode.Selection(
                anchorPos.isEqual(currentPos) ? newPos : anchorPos,
                newPos
            );
            editor.revealRange(new vscode.Range(lineNum, 0, lineNum, 0));
            return;
        }
    }

    // If no blank line found, go to start of document
    const startPos = new vscode.Position(0, 0);
    editor.selection = new vscode.Selection(
        anchorPos.isEqual(currentPos) ? startPos : anchorPos,
        startPos
    );
}

function nextBlankLine() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const currentPos = editor.selection.active;
    const anchorPos = editor.selection.anchor;
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
            const newPos = new vscode.Position(lineNum, 0);
            editor.selection = new vscode.Selection(
                anchorPos.isEqual(currentPos) ? newPos : anchorPos,
                newPos
            );
            editor.revealRange(new vscode.Range(lineNum, 0, lineNum, 0));
            return;
        }
    }

    // If no blank line found, go to end of document
    const endPos = new vscode.Position(lastLine, 0);
    editor.selection = new vscode.Selection(
        anchorPos.isEqual(currentPos) ? endPos : anchorPos,
        endPos
    );
}

function isBlankLine(line: vscode.TextLine): boolean {
    return line.text.trim().length === 0;
}

export function deactivate() {}
