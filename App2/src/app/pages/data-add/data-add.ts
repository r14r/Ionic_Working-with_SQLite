import { Component }					from '@angular/core';
import { IonicPage }					from 'ionic-angular';
import { NavController, NavParams }		from 'ionic-angular';

import * as moment 						from 'moment';

import { Toolbox } 						from '../../app.toolbox';

import { Client }						from '../../providers/client/model';
import { ClientProvider }				from '../../providers/client/provider';

import { Weights }						from '../../providers/weight/model';
import { WeightProvider }				from '../../providers/weight/provider';

@IonicPage()
@Component({
	selector: 'page-data-add',
	templateUrl: 'data-add.html',
})
export class DataAddPage {

	height: number;
	weights: number;
	goal: number;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public clientprovider: ClientProvider,
		public weightprovider: WeightProvider,
		public toolbox: Toolbox
	) {
		console.log('DataAddPage::constructor');

		let p_client  = navParams.get("client")  || { client: "" };
		let p_weights = navParams.get("weights") || { weights: "" };

		console.log('ImPage::constructor parameter client  = ' + toolbox.display_object(p_client));
		console.log('ImPage::constructor parameter weights = ' + toolbox.display_object(p_weights));

		this.height = p_client.height;
		// this.weights = parseFloat(p_weights[p_weights.length - 1].nowaday);
		// this.goal = parseFloat(Weights[Weights.length - 1].goal);
	}

	ionViewDidLoad() {
		console.log('DataAddPage::ionViewDidLoad');
	}

	getUser() {
		console.log('DataAddPage::getUser');

		let cli = new Client(
			1,
			null,
			null,
			this.height
		);

		this.clientprovider.updateData(cli)
			.then((data: any) => {
				if (data === true) {
					let p = new Weights(
						null,
						this.weights,
						moment(new Date()).format('L'),
						this.goal,
						1
					);
					this.weightprovider.insert(p)
						.then((datap: any) => {
							if (datap === true) {
								this.navCtrl.push('StatisticsPage');
							}
						})
						.catch((e) => { console.error(e); });
				}
			})
			.catch((e) => {
				this.navCtrl.push('StatisticsPage');
				console.error(e);
			});
	}
}
