var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { App } from "./app.js";
import { ExeptionFilter } from "./errros/exeption.filter.js";
import { LoggerService } from "./logger/logger.service.js";
import { UserController } from "./users/users.controller.js";
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new LoggerService();
    const app = new App(logger, new UserController(logger), new ExeptionFilter(logger));
    yield app.init();
});
bootstrap();
//# sourceMappingURL=main.js.map