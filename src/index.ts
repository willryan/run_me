#! /usr/bin/env node
const kexec = require('kexec');
import * as path from 'path';
//import * as fs from 'fs';

export class RunMeMatch {
  regex: string
  cmd: string
}

export class RunMeConfig {
  runners: RunMeMatch[]
}


export function findCommand(config: RunMeConfig, fileName: string, lineNumber: number | null) : string | null {
  function fileLine(join:string) : string {
    return `${fileName}${join}${lineNumber}`;
  }
  for (const runner of config.runners) {
    const match = fileName.match(runner.regex);
    if (match) {
      return eval(`\`${runner.cmd}\``) as string;
    }
  }
  return null;
};

const [ _1, _2, configFile, fileName, lineString ] = process.argv;
if (fileName) {
  const configFilePath = configFile.startsWith('/') ? configFile : path.join(process.cwd(),configFile);
  const config : RunMeConfig = require(configFilePath);
  const lineNumber : number | null = (+lineString) > 0 ? +lineString : null;
  const cmd = findCommand(config, fileName, lineNumber);

  if (cmd) {
    if (process.env.LOG_RUN_ME_COMMAND) console.log(cmd);
    kexec(cmd);
  } else {
    console.log(`Could not find match for ${fileName}:${lineNumber}`);
  }
} else {
  console.log("run_me\nUsage: run_me <config> <filename> <linenumber>");
}