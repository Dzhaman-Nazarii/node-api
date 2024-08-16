var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
class App {
    constructor(logger, userController, exeptionFilter) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
    }
    useRoutes() {
        this.app.use("/users", this.userController.router);
    }
    useExeptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.useRoutes();
            this.useExeptionFilters();
            this.server = this.app.listen(this.port);
            this.logger.log(`Server running on http://localhost:${this.port}`);
        });
    }
}
export { App };
//# sourceMappingURL=app.js.map