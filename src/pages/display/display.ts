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
    console.log("Passedddddddddddddddddd",this.patientData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisplayPage');
    console.log(this.patientData);
  }

  getData(){
    console.log("Getting data");
    console.log(this.patientData);
  }

}
