export class Client {

	constructor(
		public id: number,
		public email: string,
		public password: string,
		public height: number
	) {

	}

	asString() {
		return this.id + '/' + this.email + '/' + this.password + '/' + this.height;
	}
}
