#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kexec = require('kexec');
const path = require("path");
const RunMe = require("./RunMe");
//import * as fs from 'fs';
const [_1, _2, configFile, fileName, lineString] = process.argv;
if (fileName) {
    const configFilePath = configFile.startsWith('/') ? configFile : path.join(process.cwd(), configFile);
    const config = require(configFilePath);
    const lineNumber = (+lineString) > 0 ? +lineString : null;
    const cmd = RunMe.findCommand(config, fileName, lineNumber);
    if (cmd) {
        if (process.env.LOG_RUN_ME_COMMAND)
            console.log(cmd);
        kexec(cmd);
    }
    else {
        console.log(`Could not find match for ${fileName}:${lineNumber}`);
    }
}
else {
    console.log("run_me\nUsage: run_me <config> <filename> <linenumber>");
}
//# sourceMappingURL=index.js.map