export class RunMeMatch {
  regex: string
  cmd: string
}

export class RunMeConfig {
  runners: RunMeMatch[]
}


export function findCommand(config: RunMeConfig, fileName: string, lineNumber: number | null) : string | null {
  function fileLine(join:string) : string {
    return lineNumber ? `${fileName}${join}${lineNumber}` : fileName;
  }
  for (const runner of config.runners) {
    const match = fileName.match(runner.regex);
    if (match) {
      return eval(`\`${runner.cmd}\``) as string;
    }
  }
  return null;
};
