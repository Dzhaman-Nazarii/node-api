import { BaseController } from "../common/base.controller.js";
import { HTTPError } from "../errros/http-error.class.js";
class UserController extends BaseController {
    constructor(logger) {
        super(logger);
        this.bindRoutes([
            { path: "/register", method: "post", func: this.register },
            { path: "/login", method: "post", func: this.login },
        ]);
    }
    register(req, res, next) {
        this.ok(res, "register");
    }
    login(req, res, next) {
        next(new HTTPError(401, "Unauthorized", "login"));
    }
}
export { UserController };
//# sourceMappingURL=users.controller.js.map