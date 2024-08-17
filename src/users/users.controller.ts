import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller.js";
import { HTTPError } from "../errros/http-error.class.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import { ILogger } from "../logger/logger.interface.js";
import { IUserController } from "./users.controller.interface.js";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-register.dto.js";
import { IUserService } from "./users.service.interface.js";
import { ValidateMiddleware } from "../common/validate.middleware.js";

@injectable()
class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: "/register",
				method: "post",
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{ path: "/login", method: "post", func: this.login },
		]);
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction
	) {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, "This user already exists"));
		}
		this.ok(res, { email: result.email });
	}

	login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction
	) {
		next(new HTTPError(401, "Unauthorized", "login"));
	}
}

export { UserController };
