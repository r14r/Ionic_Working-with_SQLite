import { Component } 					from '@angular/core';
import { IonicPage }					from 'ionic-angular';
import { NavController, NavParams }		from 'ionic-angular';

import { ChartsModule }					from 'ng2-charts';

import { Client }						from '../../providers/client/model';
import { ClientProvider }				from '../../providers/client/provider';

import { Weights }						from '../../providers/weight/model';
import { WeightProvider }				from '../../providers/weight/provider';

import * as moment 						from 'moment';

@IonicPage()
@Component({
	selector: 'page-data-statistics',
	templateUrl: 'data-statistics.html',
})
export class DataStatisticsPage {

	cli: Client[];
	data: string;
	selectedDay = new Date();
	Weights: Weights[];

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public clip: ClientProvider, public wp: WeightProvider) {
		moment.locale('de-de');

		this.get();
	}

	ionViewDidLoad() {
	}

	public lineChartData: Array<any> = [{ data: [0], label: 'Weight' }, { data: [0], label: 'Goal' }];
	public lineChartLabels: Array<any> = ['Start'];
	public lineChartOptions: any = { responsive: true };
	public lineChartLegend: boolean = true;
	public lineChartType: string = 'line';


	// events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

	get() {
		let id = 1;
		this.clip.get(id)
			.then((data: any[]) => {
				this.cli = data;
				this.wp.getAll()
					.then((dataw: Weights[]) => {
						if (dataw != null) {

							let Weight: Array<any> = [];
							this.Weights = dataw;
							for (let i = 0; i < dataw.length; i++) {
								this.lineChartData[0].data.push(dataw[i].nowaday);
								this.lineChartData[1].data.push(dataw[i].goal);
								this.lineChartLabels.push(dataw[i].date);
								Weight.push(dataw[i].nowaday);
							}

							let im = parseFloat(Weight[Weight.length - 1]) / (parseFloat(data[0].height) * parseFloat(data[0].height));
							this.data = im.toFixed(2);
						} else {
							this.data = '0';
						}

					})
					.catch((e) => {
						console.error(e);
					});
			})
			.catch((e) => {
				console.error(e);
			});
	}

	openPage() {
		console.log(this.cli);

		this.navCtrl.push('DataAddPage', { cient: this.cli[0], weights: this.Weights });
	}
}
