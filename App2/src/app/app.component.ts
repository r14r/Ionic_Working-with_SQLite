import { Component, ViewChild }			from '@angular/core';
import { Nav, Platform } 				from 'ionic-angular';
import { StatusBar } 					from '@ionic-native/status-bar';
import { SplashScreen } 				from '@ionic-native/splash-screen';

@Component({
	templateUrl: 'app.html'
})
export class MainApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = 'HomePage';

	pages: Array<{ title: string, component: any }>;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
		console.log('MainApp::constructor');

		this.initializeApp();

		this.pages = [
			{ title: 'Home', component: 'HomePage' },
			{ title: 'List', component: 'ListPage' },
			{ title: 'Tabs', component: 'TabsPage' }
		];
	}

	initializeApp() {
		console.log('MainApp::initializeApp');

		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	openPage(page) {
		console.log('MainApp::openPage');

		this.nav.setRoot(page.component);
	}
}
