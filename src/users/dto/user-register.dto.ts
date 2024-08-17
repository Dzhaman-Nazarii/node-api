import { IsEmail, IsString } from "class-validator";

class UserRegisterDto {
	@IsEmail({}, { message: "Email is incorrect" })
	email!: string;

	@IsString({ message: "Password not specified" })
	password!: string;

	@IsString({ message: "Name not specified" })
	name!: string;
}

export { UserRegisterDto };
