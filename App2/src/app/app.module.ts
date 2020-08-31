import { NgModule, ErrorHandler }		from '@angular/core';

import { IonicApp, IonicModule }		from 'ionic-angular';
import { IonicErrorHandler }			from 'ionic-angular';

import { BrowserModule } 				from '@angular/platform-browser';
import { HttpModule }					from '@angular/http';


import { StatusBar }					from '@ionic-native/status-bar';
import { SplashScreen }					from '@ionic-native/splash-screen';

import { ChartsModule }					from 'ng2-charts';

import { IonicStorageModule }			from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { SQLitePorter } 				from '@ionic-native/sqlite-porter';
import { SQLite } 						from '@ionic-native/sqlite';

import { Toolbox }						from './app.toolbox';

import { MainApp }						from './app.component';

import { DeveloperDatabaseProvider }	from './providers/developer/provider';

import { DatabaseProvider }				from './providers/database/database';
import { ClientProvider }				from './providers/client/provider';
import { WeightProvider }				from './providers/weight/provider';

@NgModule({
	declarations: [
		MainApp
	],
	imports: [
		BrowserModule, HttpModule, ChartsModule,
		IonicStorageModule.forRoot(),
		IonicModule.forRoot(MainApp),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MainApp
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },

		//
		Toolbox,

		//
		DatabaseProvider, DeveloperDatabaseProvider, ClientProvider, WeightProvider,

		//
		SQLitePorter, SQLite
	]
})
export class AppModule { }
