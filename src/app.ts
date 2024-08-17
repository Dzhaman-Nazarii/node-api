import "reflect-metadata";
import express, { Express } from "express";
import { Server } from "node:http";
import { UserController } from "./users/users.controller.js";
import { ILogger } from "./logger/logger.interface.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types.js";
import bodyParser from "body-parser";
import { IConfigService } from "./config/config.service.interface.js";
import { IExeptionFilter } from "./errros/exeption.filter.interface.js";
import { PrismaService } from "./database/prisma.service.js";

@injectable()
class App {
	app: Express;
	port: number;
	server?: Server;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(bodyParser.json());
	}

	useRoutes(): void {
		this.app.use("/users", this.userController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server running on http://localhost:${this.port}`);
	}
}

export { App };
