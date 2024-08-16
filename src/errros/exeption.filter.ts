import { NextFunction, Request, Response } from "express";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http-error.class.js";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types.js";
import 'reflect-metadata';

@injectable()
class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}
	catch(
		err: Error | HTTPError,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		if (err instanceof HTTPError) {
			this.logger.error(
				`[${err.context}] Error ${err.statusCode} ${err.message}`
			);
			res.status(res.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}

export { ExeptionFilter };
