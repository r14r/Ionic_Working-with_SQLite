import { Developer } from './model';
import { Injectable }					from '@angular/core';
import { Platform }						from 'ionic-angular';
import { Http }							from '@angular/http';

import { BehaviorSubject }				from 'rxjs/Rx';
import { Storage }						from '@ionic/storage';

import { SQLite, SQLiteObject }			from '@ionic-native/sqlite';
import { SQLitePorter }					from '@ionic-native/sqlite-porter';
import 'rxjs/add/operator/map';

import { Toolbox } from '../../app.toolbox';

@Injectable()
export class DeveloperDatabaseProvider {
	database: SQLiteObject;

	private databaseReady: BehaviorSubject<boolean>;

	constructor(
		public sqlitePorter: SQLitePorter,
		private storage: Storage,
		private sqlite: SQLite,
		private platform: Platform,
		private http: Http,
		public toolbox: Toolbox
	) {
		console.log('DeveloperDatabaseProvider::construtor');

		this.databaseReady = new BehaviorSubject(false);
		this.platform.ready().then(() => {
			console.log('DeveloperDatabaseProvider::platform ready');

			this.sqlite.create({
				name: 'developers.db',
				location: 'default'
			})
				.then((db: SQLiteObject) => {
					console.log('DeveloperDatabaseProvider::database created');

					this.database = db;
					this.storage.get('database_filled').then(val => {
						if (val) {
							this.databaseReady.next(true);
						} else {
							console.log('DeveloperDatabaseProvider::fill database');

							this.fillDatabase();
						}
					});
				});
		});
	}

	fillDatabase() {
		console.log('DeveloperDatabaseProvider::fillDatabase');


		console.log('DeveloperDatabaseProvider::get populatedb.sql');
		this.http.get('assets/sql/populatedb.sql')
			.map(res => res.text())
			.subscribe(sql => {
				this.sqlitePorter.importSqlToDb(this.database, sql)
					.then(data => {
						this.databaseReady.next(true);
						this.storage.set('database_filled', true);
					})
					.catch(e => console.error(e));
			});
	}

	addData(developer) {
		console.log('DeveloperDatabaseProvider::addData');

		let data = [ developer.name, developer.skill, developer.yearsOfExperience, 'wifi']

		console.log('DeveloperDatabaseProvider::addData = ' + this.toolbox.display_object(data));

		return this.database.executeSql("INSERT INTO developer (name, skill, yearsOfExperience, icon) VALUES (?, ?, ?, ?)", data).then(data => {
			return data;
		}, err => {
			console.log('Error: ', err);
			return err;
		});
	}

	getAllData() {
		console.log('DeveloperDatabaseProvider::getAllData');

		return this.database.executeSql("SELECT * FROM developer", []).then((data) => {
			let developers = [];

			if (data.rows.length > 0) {
				console.log('DeveloperDatabaseProvider::getAllData found ' + data.rows.length + ' items');
				for (var i = 0; i < data.rows.length; i++) {
					let item = data.rows.item(i);

					console.log('DeveloperDatabaseProvider::getAllData item = ' + this.toolbox.display_object(item));

					let developer = new Developer(-1, item['name'], item['skill'], item['yearsOfExperience'], item['icon']);

					console.log('DeveloperDatabaseProvider::getAllData developer = ' + developer.asString());

					developers.push(developer);
				}
			}

			console.log('DeveloperDatabaseProvider::getAllData found ' + developers.length + ' developers');
			return developers;
		}, err => {
			console.log('Error: ', err);
			return [];
		});
	}

	getDatabaseState() {
		console.log('DeveloperDatabaseProvider::getDatabaseState');

		return this.databaseReady.asObservable();
	}

}
