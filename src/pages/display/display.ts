import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PatientData } from '../../providers/patient';

@IonicPage()
@Component({
  selector: 'page-display',
  templateUrl: 'display.html',
})
export class DisplayPage {

  patientData: PatientData;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.patientData = navParams.get('data');
  }

  ionViewDidLoad() {
    
  }

  getData(){
    
  }

}
