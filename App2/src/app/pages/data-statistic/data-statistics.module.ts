import { NgModule }						from '@angular/core';
import { IonicPageModule }				from 'ionic-angular';
import { DataStatisticsPage }			from './data-statistics';

@NgModule({
	declarations: [DataStatisticsPage,],
	imports: [IonicPageModule.forChild(DataStatisticsPage)]
})
export class DataStatisticsPageModule { }
