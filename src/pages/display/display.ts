import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PatientData, Patient } from '../../providers/patient';
import { AppointmentProvider } from '../../providers/appointment/appointment';
// import { Observable } from 'rxjs';
import firebase from 'firebase';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-display',
  templateUrl: 'display.html',
})
export class DisplayPage {

  patientData: PatientData[];
  patients: PatientData[];
  reversePatient: PatientData[];
  public myPerson = {}
  symptom = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: AppointmentProvider) {
    this.patientData = navParams.get('data');
  }

  objToArr(element) {
    element.symptomsArr = [];
    if (element && element.symptoms && Object.keys(element.symptoms).length) {
      let arr = Object.keys(element.symptoms);
      arr.forEach(item => {
        element.symptomsArr.push(element.symptoms[item]);
      });
    }
    return element;
  }

  ionViewDidLoad() {

    var x = this.service.getData();
    x.snapshotChanges().subscribe(item => {
      this.patients = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        y = this.objToArr(y);
        this.patients.push(y as PatientData);
        // this.symptom = this.patients.symptoms;
        this.reversePatient = this.patients.slice().reverse();
        console.log(this.reversePatient);
        // console.log(element,y);
      });
      // console.log(item);
    });


  }

  getHome() {
    this.navCtrl.push(HomePage);
  }

}
