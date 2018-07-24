import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { AppointmentProvider } from '../../providers/appointment/appointment';
import { Country, PatientData } from '../../providers/patient';
import { DisplayPage } from '../display/display';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  patientData: PatientData;
  displayPage : any;
  private patient : FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  country: Country;
  age: boolean = true;
  dob: boolean = false;
  ageEvent: any;
  dobEvent: any;
  symptomsArr = [
    {symptom: 'Allergy', selected: false},
    {symptom: 'Cough'},
    {symptom: 'Fever'},
    {symptom: 'Weakness'}
  ];
  checkItems = {};
  birthDate: Date;
  private url = "../../assets/imgs/country.json";
  min: string;
  ageOfPatient: number = 18;

  constructor(public navParams: NavParams,private http: HttpClient,private toast: ToastController,private alertCtrl: AlertController,public navCtrl: NavController, private formBuilder: FormBuilder, private service: AppointmentProvider) {
    this.displayPage = DisplayPage;
    this.patient = this.formBuilder.group({
      first: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z][a-zA-Z ]+')
      ])],
      last: [''],
      date: ['',Validators.compose([
        Validators.required,
        Validators.min(18)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(36)
      ])],
      confirm: ['', Validators.required],
      code: [''],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ])],
      registration: ['', Validators.required],
      symptoms: new FormArray([])
    },
    {validator: this.matchingPasswords('password','confirm')}
    );
  }

  ionViewCanEnter(){
    this.service.getData()
    .subscribe(
      (success: Country) => {
        this.country = success;
      },
      err => {
        this.toast.create({
          message: JSON.parse(err)
        }).present()
      }
    )
  }

  ionViewDidLoad(){
    var current = new Date();
    this.min = (current.getFullYear()-18) + '-'  + ('0' + (current.getMonth()+1)).slice(-2) + '-' + ('0' + current.getDate()).slice(-2);
  }

  getChange(event){
    const arr = <FormArray>this.patient.controls.symptoms;
    event.forEach(element => {
      arr.push(new FormControl(element));
    });
  }

  matchingPasswords(passwordKey: string, confirmKey: string){
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmpassword = group.controls[confirmKey];

      if(password.value !== confirmpassword.value){
        return {
          mismatchPasswords: true
        };
      }
    }
  }

  onSubmit(){
    this.getAlert();
    this.navCtrl.push(DisplayPage, {
      data: this.patient.value
    });
  }

  getAlert(){
    let alert = this.alertCtrl.create({
      title: "Successfully",
      subTitle: "The appointment has been done successfully!",
      buttons: ['Dismiss']
    });
    alert.present();
  }

  getDisplay(){
    this.navCtrl.push(DisplayPage);
  }

  showHide(){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  updateDOB(event){
    this.dobEvent = event;
    if(this.dob){
      this.dob = false;
      this.age = true;
    }
    else{
      this.dob = true;
      this.age = false;
    }
  }

  getDate(event){
    console.log(event);
    var day = event.day;
    var month = event.month;
    var year = event.year;
    var current = new Date();
    this.ageOfPatient = current.getFullYear() - event.year;
    // this.min = day + '/' + month + '/' + year;
  }

}
