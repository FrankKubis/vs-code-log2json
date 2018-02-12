'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
    ExtensionContext,
    TextEditorDecorationType,
    commands,
    window,
    Position,
    Range,
}  from 'vscode';

import { SerilogConverter } from './SerilogConverter';
import { IConverter } from './IConverter';

const LINE_SEPERATOR = /\n|\r\n/;

function convert(converter: IConverter) {
    var editor = window.activeTextEditor;
    if (!editor) {
        return;
    }

    var raw = editor.document.getText();
    var converted = converter.convert(raw);

    if (converted == null || converted == "" || converted.length <= 0){
        return;
    }

    editor.edit(builder => {
        const start = new Position(0, 0);
        const lines = raw.split(LINE_SEPERATOR);
        const end = new Position(lines.length, lines[lines.length - 1].length);
        const range = new Range(start, end);
        builder.replace(range, converted);
    });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = commands.registerCommand('extension.serilog2json', () => convert(new SerilogConverter));

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}