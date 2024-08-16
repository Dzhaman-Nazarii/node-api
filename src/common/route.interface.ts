import { NextFunction, Request, Response, Router } from "express";

interface IRouteController {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, "get" | "post" | "patch" | "put" | "delete">;
}

export { IRouteController };
