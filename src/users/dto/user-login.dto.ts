import { IsEmail, IsString } from "class-validator";

class UserLoginDto {
	@IsEmail({}, { message: "Email is incorrect" })
	email!: string;

	@IsString()
	password!: string;
}

export { UserLoginDto };
