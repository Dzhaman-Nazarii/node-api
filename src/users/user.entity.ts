import bcryptjs from "bcryptjs";

class User {
	private _password!: string;
	constructor(
		private readonly _email: string,
		private readonly _name: string
	) {}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string) {
		this._password = await bcryptjs.hash(pass, 10);
	}
}

export { User };
