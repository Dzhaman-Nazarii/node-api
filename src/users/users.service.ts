import "reflect-metadata";
import { inject, injectable } from "inversify";
import { IUserService } from "./users.service.interface";
import { UserRegisterDto } from "./dto/user-register.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { User } from "./user.entity.js";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types.js";
import { IUsersRepository } from "./users.repository.interface";
import { UserModel } from "@prisma/client";

@injectable()
class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository
	) {}
	async createUser({
		email,
		name,
		password,
	}: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get("SALT");
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		}
		const newUser = new User(
			existedUser.email,
			existedUser.name,
			existedUser.password
		);
		return newUser.comparePasssword(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}
}

export { UserService };
