import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

import { Weights } from './model';
import 'rxjs/add/operator/map';

@Injectable()
export class WeightProvider {

	constructor(private dbProvider: DatabaseProvider) { }

	public insert(p: Weights) {
		return this.dbProvider.getDB()
			.then((db: SQLiteObject) => {
					// Weights: id: number, nowaday: number, date: string, goal: number, idclient: number

				let sql = 'insert into Weights (nowaday, date, goal, idclient) values (?, ?, ?, ?)';
				let data = [p.nowaday, p.date, p.goal, p.idclient];

				return db.executeSql(sql, data)
					.then((data: any) => { return true; })
					.catch((e) => console.error(e));
			})
			.catch((e) => console.error(e));
	}

	public getAll() {
		return this.dbProvider.getDB()
			.then((db: SQLiteObject) => {
				let sql = 'SELECT nowaday, date, goal FROM Weights';
				var data: any[];

				return db.executeSql(sql, data)
					.then((data: any) => {
						if (data.rows.length > 0) {
							let Weights: any[] = [];
							for (var i = 0; i < data.rows.length; i++) {
								var Weight = data.rows.item(i);
								Weights.push(Weight);
							}

							return Weights;
						} else {
							return [];
						}
					})
					.catch((e) => console.error(e));
			})
			.catch((e) => console.error(e));
	}

	public remove(id: number) {
		return this.dbProvider.getDB()
			.then((db: SQLiteObject) => {
				let sql = 'delete from Weights where id = ?';
				let data = [id];

				return db.executeSql(sql, data)
					.then((data: any) => { return true; })
					.catch((e) => console.error(e));
			})
			.catch((e) => console.error(e));
	}

}
