import { NextFunction, Request, Response } from "express";

interface IUserController {
	register: (req: Request, res: Response, next: NextFunction) => void;
	login: (req: Request, res: Response, next: NextFunction) => void;
	info: (req: Request, res: Response, next: NextFunction) => void;
}

export { IUserController };
