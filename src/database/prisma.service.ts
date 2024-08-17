import "reflect-metadata";
import { PrismaClient, UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types.js";

@injectable()
class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log("Database connection successfully");
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error(
					`Database connection failed: ${error.message}`
				);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}

export { PrismaService };
