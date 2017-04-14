export class RunMeMatch {
  regex: string
  cmd: string
}

export class RunMeConfig {
  runners: RunMeMatch[]
}


export function findCommand(config: RunMeConfig, file: string, line: number | null) : string | null {
  function fileLine(join:string) : string {
    return line ? `${file}${join}${line}` : file;
  }
  for (const runner of config.runners) {
    const match = file.match(runner.regex);
    if (match) {
      return eval(`\`${runner.cmd}\``) as string;
    }
  }
  return null;
};
