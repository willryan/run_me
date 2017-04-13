#! /usr/bin/env node
const kexec = require('kexec');
import * as path from 'path';
import * as RunMe from './RunMe';
//import * as fs from 'fs';

const [ _1, _2, configFile, fileName, lineString ] = process.argv;
if (fileName) {
  const configFilePath = configFile.startsWith('/') ? configFile : path.join(process.cwd(),configFile);
  const config : RunMe.RunMeConfig = require(configFilePath);
  const lineNumber : number | null = (+lineString) > 0 ? +lineString : null;
  const cmd = RunMe.findCommand(config, fileName, lineNumber);

  if (cmd) {
    if (process.env.LOG_RUN_ME_COMMAND) console.log(cmd);
    kexec(cmd);
  } else {
    console.log(`Could not find match for ${fileName}:${lineNumber}`);
  }
} else {
  console.log("run_me\nUsage: run_me <config> <filename> <linenumber>");
}