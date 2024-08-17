import bcryptjs from "bcryptjs";

class User {
	private _password!: string;
	constructor(
		private readonly _email: string,
		private readonly _name: string,
		passwordHash?: string
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await bcryptjs.hash(pass, salt);
	}

	public async comparePasssword(
		pass: string
	): Promise<boolean> {
		return bcryptjs.compare(pass, this.password);
	}
}

export { User };
