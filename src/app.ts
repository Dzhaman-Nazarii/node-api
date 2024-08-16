import express, { Express } from "express";
import { Server } from "node:http";
import { LoggerService } from "./logger/logger.service.js";
import { UserController } from "./users/users.controller.js";
import { ExeptionFilter } from "./errros/exeption.filter.js";
import { ILogger } from "./logger/logger.interface.js";

class App {
	app: Express;
	port: number;
	server?: Server;
	logger: ILogger;
	userController: UserController;
	exeptionFilter: ExeptionFilter;

	constructor(logger: ILogger, userController: UserController, exeptionFilter: ExeptionFilter) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.userController = userController;
		this.exeptionFilter = exeptionFilter;
	}

	useRoutes() {
		this.app.use("/users", this.userController.router);
	}

	useExeptionFilters() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init() {
		this.useRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server running on http://localhost:${this.port}`);
	}
}

export { App };
