import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller.js";
import { HTTPError } from "../errros/http-error.class.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import { ILogger } from "../logger/logger.interface.js";
import 'reflect-metadata';
import { IUserController } from "./users.controller.interface.js";

@injectable()
class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: "/register", method: "post", func: this.register },
			{ path: "/login", method: "post", func: this.login },
		]);
	}

	register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, "register");
	}

	login(req: Request, res: Response, next: NextFunction) {
		next(new HTTPError(401, "Unauthorized", "login"));
	}
}

export { UserController };
