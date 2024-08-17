import { injectable } from "inversify";
import { IUserService } from "./users.service.interface";
import { UserRegisterDto } from "./dto/user-register.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { User } from "./user.entity.js";

@injectable()
class UserService implements IUserService {
	async createUser({
		email,
		name,
		password,
	}: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		return null;
	}

	async validateUser({}: UserLoginDto): Promise<boolean> {
		return true;
	}
}

export { UserService };
