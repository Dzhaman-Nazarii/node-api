import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { IConfigService } from "./config.service.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import { ILogger } from "../logger/logger.interface";

@injectable()
class ConfigService implements IConfigService {
	private config!: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error("Cannot read file .env");
		} else {
			this.logger.log("Config .env downloaded");
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}

export { ConfigService };
