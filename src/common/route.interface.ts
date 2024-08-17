import { NextFunction, Request, Response, Router } from "express";
import { IMiddleware } from "./middleware.interface";

interface IRouteController {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, "get" | "post" | "patch" | "put" | "delete">;
	middlewares?: IMiddleware[];
}

export { IRouteController };
