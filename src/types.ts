import { UserService } from "./users/users.service";

const TYPES = {
	Application: Symbol.for("Application"),
	ILogger: Symbol.for("ILogger"),
	UserController: Symbol.for("UserController"),
	ExeptionFilter: Symbol.for("ExeptionFilter"),
	UserService: Symbol.for("UserService")
};

export { TYPES };
