'use strict';

import { window } from 'vscode'; 
import { IConverter } from './IConverter';

const LINE_SEPERATOR = /\n|\r\n/;

export class SerilogConverter implements IConverter {

    private static readonly TAB_SIZE = window.activeTextEditor.options.tabSize;

    public convert(raw: string){
        let split = raw.split(LINE_SEPERATOR);
        let json = [];
        split.forEach(line => {
            try {
                json.push(JSON.parse(line));
            } catch (e) {
                window.showInformationMessage("Not a valide json, " + e.message);
                return;
            }
        });

        return JSON.stringify(json, null, SerilogConverter.TAB_SIZE);
    }
}