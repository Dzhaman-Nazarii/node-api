import jsonWebToken from "jsonwebtoken";
import { IMiddleware } from "./middleware.interface";
import { NextFunction, Request, Response } from "express";

class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			jsonWebToken.verify(
				req.headers.authorization.split(" ")[1],
				this.secret,
				(error, payload) => {
					if (error) {
						return next();
					} else if (payload && typeof payload === "object") {
						req.user = (payload as { email: string }).email;
						return next();
					}
				}
			);
		} else {
			return next();
		}
	}
}

export { AuthMiddleware };
