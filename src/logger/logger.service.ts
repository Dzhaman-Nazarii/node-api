import { ISettingsParam, Logger } from "tslog";

class LoggerService {
	private logger: Logger<unknown>;

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: "hidden",
			displayFunctionName: false,
		} as ISettingsParam<unknown>);
	}
	log(...args: unknown[]) {
		this.logger.info(...args);
	}
	error(...args: unknown[]) {
		this.logger.error(...args);
	}
	warn(...args: unknown[]) {
		this.logger.warn(...args);
	}
}

export { LoggerService };
