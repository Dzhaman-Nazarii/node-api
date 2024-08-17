import "reflect-metadata";
import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app.js";
import { ExeptionFilter } from "./errros/exeption.filter.js";
import { LoggerService } from "./logger/logger.service.js";
import { UserController } from "./users/users.controller.js";
import { ILogger } from "./logger/logger.interface.js";
import { TYPES } from "./types.js";
import { IExeptionFilter } from "./errros/exeption.filter.interface.js";
import { IUserController } from "./users/users.controller.interface.js";
import { IUserService } from "./users/users.service.interface.js";
import { UserService } from "./users/users.service.js";
import { IConfigService } from "./config/config.service.interface.js";
import { ConfigService } from "./config/config.service.js";
import { PrismaService } from "./database/prisma.service.js";

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter)
		.to(ExeptionFilter)
		.inSingletonScope();
	bind<IUserController>(TYPES.UserController)
		.to(UserController)
		.inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService)
		.to(ConfigService)
		.inSingletonScope();
	bind<App>(TYPES.Application).to(App).inSingletonScope();
});

function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
