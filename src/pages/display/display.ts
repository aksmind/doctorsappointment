import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PatientData } from '../../providers/patient';
import { AppointmentProvider } from '../../providers/appointment/appointment';
// import { Observable } from 'rxjs';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-display',
  templateUrl: 'display.html',
})
export class DisplayPage {

  patientData: PatientData[];
  patients: PatientData[];
  public myPerson = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: AppointmentProvider) {
    this.patientData = navParams.get('data');
  }

  ionViewDidLoad() {

    var x =  this.service.getData();
    x.snapshotChanges().subscribe(item => {
      this.patients = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        this.patients.push(y as PatientData);
        console.log(this.patients);
      });
      console.log(item);
    });

  }

  getData(){
    
  }

}
