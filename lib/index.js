#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kexec = require('kexec');
const path = require("path");
//import * as fs from 'fs';
class RunMeMatch {
}
exports.RunMeMatch = RunMeMatch;
class RunMeConfig {
}
exports.RunMeConfig = RunMeConfig;
function findCommand(config, fileName, lineNumber) {
    function fileLine(join) {
        return `${fileName}${join}${lineNumber}`;
    }
    for (const runner of config.runners) {
        const match = fileName.match(runner.regex);
        if (match) {
            return eval(`\`${runner.cmd}\``);
        }
    }
    return null;
}
exports.findCommand = findCommand;
;
const [_1, _2, configFile, fileName, lineString] = process.argv;
if (fileName) {
    const configFilePath = configFile.startsWith('/') ? configFile : path.join(process.cwd(), configFile);
    const config = require(configFilePath);
    const lineNumber = (+lineString) > 0 ? +lineString : null;
    const cmd = findCommand(config, fileName, lineNumber);
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