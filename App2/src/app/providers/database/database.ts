import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

	constructor(private sqlite: SQLite)
	{
		console.log('DatabaseProvider::constructor');
	 }

	public getDB() {
		console.log('DatabaseProvider::getDB');

		return this.sqlite.create({
			name: 'infocli.db',
			location: 'default'
		});
	}

	public createDatabase() {
		console.log('DatabaseProvider::createDatabase');

		return this.getDB()
			.then((db: SQLiteObject) => {
				this.createTables(db);
				this.insertDefaultItems(db);
			})
			.catch(e => console.log(e));
	}

	private createTables(db: SQLiteObject) {
		console.log('DatabaseProvider::createTables');

		db.sqlBatch([
			['CREATE TABLE IF NOT EXISTS clients (id integer primary key AUTOINCREMENT NOT NULL, email TEXT, password TEXT, height REAL(3,2))'],
			['CREATE TABLE IF NOT EXISTS weights (id integer primary key AUTOINCREMENT NOT NULL, nowaday REAL(5,2), date TEXT, goal REAL(5,2), idclient integer, FOREIGN KEY(idclient) REFERENCES clients(id))'],
		])
			.then(() => console.log('Tabelas criadas'))
			.catch(e => console.error('Erro ao criar as tabelas', e));
	}

	private insertDefaultItems(db: SQLiteObject) {
		console.log('DatabaseProvider::insertDefaultItems');

		db.executeSql('select COUNT(id) as qtd from clients', {})
			.then((data: any) => {
				//If there is no record
				if (data.rows.item(0).qtd == 0) {

					// insert data
					db.sqlBatch([
						['insert into clients (email, password, height) values (?,?,?)',
							['teste@mail.com', '12345', '1.60']]
					])
						.then(() => console.log('clients data included'))
						.catch(e => console.error('Error adding data 1', e));

				}
			})
			.catch(e => console.error('Error verifying qtd of clients', e));

		db.executeSql('select COUNT(id) as qtd from weights', {})
			.then((data: any) => {
				//If there is no record
				if (data.rows.item(0).qtd == 0) {

					// insert data
					db.sqlBatch([
						['insert into weights (nowaday, date, goal, cliente_id) values (?,?,?,?)',
							[54, '01/04/2018', 60, 1]],
						['insert into weights (nowaday, date, goal, cliente_id) values (?,?,?,?)',
							[56, '01/05/2018', 60, 1]]
					])
						.then(() => console.log('weights data included'))
						.catch(e => console.error('Error adding data 2', e));

				}
			})
			.catch(e => console.error('Error verifying qtd of weights', e));
	}
}

