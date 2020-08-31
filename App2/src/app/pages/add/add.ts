import { Component } 					from '@angular/core';
import { IonicPage } 					from 'ionic-angular';
import { NavController }				from 'ionic-angular';

import { Developer }					from '../../providers/developer/model';

import { DeveloperDatabaseProvider }	from '../../providers/developer/provider';

@IonicPage()
@Component({
	selector: 'page-add',
	templateUrl: 'add.html'
})
export class AddPage {
	public developer: Developer;
	public items = [];

	public name: string;
	public skill: string;
	public yearsOfExperience: number;

	constructor(
			public navCtrl: NavController,
			private databaseprovider: DeveloperDatabaseProvider
		) {
		console.log('AddPage::construtor');

		this.databaseprovider.getDatabaseState().subscribe(ready => {
			if (ready) {
				this.loadData();
			}
		})
	}

	loadData() {
		console.log('AddPage::loadData');

		this.databaseprovider.getAllData().then(data => {
			console.log('AddPage::loadData add developer = ' + data);

			data.forEach(item => {
				console.log('AddPage::loadData add developer = ' + item.asString());
			});

			this.items = data;
		})
	}

	addData() {
		let developer = new Developer(-1, this.name, this.skill, this.yearsOfExperience, 'wifi');
		console.log('AddPage::addData developer=' + developer);


		console.log('AddPage::addData developer=' + developer.asString());

		this.databaseprovider.addData(developer)
			.then(data => { this.loadData(); }
		);

		this.name = "";
		this.skill = "";
		this.yearsOfExperience = null;
	}

	itemTapped(event, item) {
		this.navCtrl.push('HomePage', {
			item: item
		});
	}
}
