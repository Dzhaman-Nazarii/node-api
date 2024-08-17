import { inject, injectable } from "inversify";
import { IUserService } from "./users.service.interface";
import { UserRegisterDto } from "./dto/user-register.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { User } from "./user.entity.js";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types.js";

@injectable()
class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {}
	async createUser({
		email,
		name,
		password,
	}: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get("SALT");
		console.log(salt);
		await newUser.setPassword(password, Number(salt));
		return null;
	}

	async validateUser({}: UserLoginDto): Promise<boolean> {
		return true;
	}
}

export { UserService };
