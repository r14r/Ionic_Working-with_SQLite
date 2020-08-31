import { Component } 					from '@angular/core';
import { IonicPage } 					from 'ionic-angular';
import { NavController, Platform }		from 'ionic-angular';

@IonicPage()
@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {

	tab1Root = 'DataAddPage';
	tab2Root = 'DataStatisticsPage';

	constructor() {
		console.log('TabsPage::constructor');
	}
}
