import { NextFunction, Request, Response } from "express";

interface IExeptionFilter {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

export {IExeptionFilter}