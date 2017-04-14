"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RunMeMatch {
}
exports.RunMeMatch = RunMeMatch;
class RunMeConfig {
}
exports.RunMeConfig = RunMeConfig;
function findCommand(config, file, line) {
    function fileLine(join) {
        return line ? `${file}${join}${line}` : file;
    }
    for (const runner of config.runners) {
        const match = file.match(runner.regex);
        if (match) {
            return eval(`\`${runner.cmd}\``);
        }
    }
    return null;
}
exports.findCommand = findCommand;
;
//# sourceMappingURL=RunMe.js.map