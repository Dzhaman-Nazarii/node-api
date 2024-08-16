import { Logger } from "tslog";
class LoggerService {
    constructor() {
        this.logger = new Logger({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: "hidden",
            displayFunctionName: false,
        });
    }
    log(...args) {
        this.logger.info(...args);
    }
    error(...args) {
        this.logger.error(...args);
    }
    warn(...args) {
        this.logger.warn(...args);
    }
}
export { LoggerService };
//# sourceMappingURL=logger.service.js.map