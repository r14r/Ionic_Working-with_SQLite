import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class Toolbox {
	PREFIX = '';

	constructor(prefix: string) {
		this.PREFIX = prefix;
	}

	log(func, line = '') {
		console.log(this.PREFIX + '|' + func + ':: ' + line);
	}

	display_object(o) {
		let result = '';
		for (let p in o) {
			result += p + ': ' + o[p] + '; ';
		}

		return result;
	}
}
