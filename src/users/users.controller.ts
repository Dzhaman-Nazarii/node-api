import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller.js";
import { HTTPError } from "../errros/http-error.class.js";
import { id, inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import { ILogger } from "../logger/logger.interface.js";
import { IUserController } from "./users.controller.interface.js";
import { UserLoginDto } from "./dto/user-login.dto.js";
import { UserRegisterDto } from "./dto/user-register.dto.js";
import { IUserService } from "./users.service.interface.js";
import { ValidateMiddleware } from "../common/validate.middleware.js";
import jsonWebToken from "jsonwebtoken";
import { IConfigService } from "../config/config.service.interface.js";
import { AuthGuard } from "../common/auth.guard.js";

@injectable()
class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: "/register",
				method: "post",
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: "/login",
				method: "post",
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: "/info",
				method: "get",
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, "This user already exists"));
		}
		this.ok(res, { email: result.email, id: result.id });
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HTTPError(401, "Unauthorized", "login"));
		}
		const jwt = await this.signJWT(
			req.body.email,
			this.configService.get("SECRET")
		);
		this.ok(res, { jwt });
	}

	async info(
		{ user }: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user);
		this.ok(res, { email: userInfo?.email, id: userInfo?.id });
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			jsonWebToken.sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: "HS256",
				},
				(error, token) => {
					if (error) {
						reject(error);
					}
					resolve(token as string);
				}
			);
		});
	}
}

export { UserController };
