export declare class RunMeMatch {
    regex: string;
    cmd: string;
}
export declare class RunMeConfig {
    runners: RunMeMatch[];
}
export declare function findCommand(config: RunMeConfig, fileName: string, lineNumber: number | null): string | null;
