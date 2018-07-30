import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { PatientData } from '../patient';

@Injectable()
export class AppointmentProvider {

  // private url = "../../assets/imgs/country.json";
  patientList : AngularFireList<any>;

  constructor(public http: HttpClient, private db: AngularFireDatabase) { }

  public getData(){
    this.patientList = this.db.list('patient');
    return this.patientList;
  }

  insertPatient(patient: PatientData){
    this.db.list('patient').push({
      first: patient.first,
      last: patient.last,
      date: patient.date,
      email: patient.email,
      password: patient.password,
      confirm: patient.confirm,
      // code: patient.code,
      phone: patient.phone,
      registration: patient.registration,
      symptoms: patient.symptoms
    });
  }

  public getCode(){
    return this.http.get<any>("../../assets/imgs/country.json");
  }

}
