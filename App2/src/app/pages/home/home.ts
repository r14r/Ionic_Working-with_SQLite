import { Component } 					from '@angular/core';
import { IonicPage } 					from 'ionic-angular';
import { NavController }				from 'ionic-angular';

import { Toolbox }						from '../../app.toolbox';

import { Developer }					from '../../providers/developer/model';
import { DeveloperDatabaseProvider }	from '../../providers/developer/provider';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	public developer: Developer;
	public items = [];

	public name: string;
	public skill: string;
	public yearsOfExperience: number;

	constructor(
			public navCtrl: NavController,
			private databaseprovider: DeveloperDatabaseProvider,
			public toolbox: Toolbox
		) {
		console.log('HomePage::construtor');

		this.databaseprovider.getDatabaseState().subscribe(ready => {
			if (ready) {
				this.loadData();
			}
		})
	}

	loadData() {
		console.log('HomePage::loadData');

		this.databaseprovider.getAllData().then(data => {
			console.log('HomePage::loadData add developer = ' + data);

			data.forEach(item => {
				console.log('HomePage::loadData add developer = ' + item.asString());
			});

			this.items = data;
		})
	}

	addData(event, item) {
		this.navCtrl.push('AddPage', {
			item: item
		});

		item.close();
	}

	deleteData(event, item) {
		console.log('HomePage::archiveData item=' + this.toolbox.display_object(item));

		item.close();
	}

	showData(event, item) {
		console.log('HomePage::archiveData item=' + this.toolbox.display_object(item));

		item.close();
	}

	archiveData(event, item) {
		console.log('HomePage::archiveData item=' + this.toolbox.display_object(item));

		item.close();
	}

	itemTapped(event, item) {
		this.navCtrl.push('HomePage', {
			item: item
		});
	}
}
