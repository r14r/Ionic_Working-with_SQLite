import { Injectable }					from '@angular/core';
import { SQLiteObject }					from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

import { DatabaseProvider }				from '../database/database';
import { Client }						from './model';

@Injectable()
export class ClientProvider {

	constructor(private dbProvider: DatabaseProvider)
	{
		console.log('ClientProvider::constructor');
	}

	public updateData(cli: Client) {
		console.log('ClientProvider::updateData');

		return this.dbProvider.getDB()
			.then((db: SQLiteObject) => {

				let sql = 'update Clients set height = ? where id = ?';
				let data = [cli.height, cli.id];

				return db.executeSql(sql, data)
					.then((res: any) => {
						return true;
					})
					.catch((e) => console.error(e));
			})
			.catch((e) => console.error(e));
	}

	public get(id: number) {
		console.log('ClientProvider::get');

		return this.dbProvider.getDB()
			.then((db: SQLiteObject) => {
				let sql = 'select * from Clients where id = ?';
				let data = [id];

				return db.executeSql(sql, data)
					.then((data: any) => {
						if (data.rows.length > 0) {
							let clients: any[] = [];
							for (var i = 0; i < data.rows.length; i++) {
								var client = data.rows.item(i);
								clients.push(client);
							}
							return clients;
						} else {
							return [];
						}
					})
					.catch((e) => console.error(e));
			})
			.catch((e) => console.error(e));
	}

}
