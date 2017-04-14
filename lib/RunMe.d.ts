export declare class RunMeMatch {
    regex: string;
    cmd: string;
}
export declare class RunMeConfig {
    runners: RunMeMatch[];
}
export declare function findCommand(config: RunMeConfig, file: string, line: number | null): string | null;
