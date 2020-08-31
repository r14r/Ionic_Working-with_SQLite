export class Developer {

	constructor(
		public id: number,
		public name: string,
		public skill: string,
		public yearsOfExperience: number,
		public icon: string
	) {
		console.log('Developer::constructor');

		this.id = id;
		this.name = name;
		this.skill = skill;
		this.yearsOfExperience = yearsOfExperience;
		this.icon = icon;

		console.log('Developer::constructor return ' + this.asString());
	}

	asString(){
		return this.id + '/' + this.name + '/' + this.skill + '/' + this.yearsOfExperience + '/' + this.icon;
	}
}
