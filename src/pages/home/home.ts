import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, EmailValidator, FormArray, FormControl } from '@angular/forms';
import { AppointmentProvider } from '../../providers/appointment/appointment';
import { Country, PatientData } from '../../providers/patient';
import { DisplayPage } from '../display/display';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  patientData: PatientData;
  displayPage : any;
  private patient : FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  passwordType1: string = 'password';
  passwordIcon1: string = 'eye-off';
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
  drop: boolean = false;
  drop1: boolean = false;
  searchQuery: string = '';
  items: string[];
  show: boolean = false;

  constructor(public navParams: NavParams,private alertCtrl: AlertController,public navCtrl: NavController, private formBuilder: FormBuilder, private service: AppointmentProvider) {
    this.initializeItems();
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
      // email: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        // Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$')
        Validators.minLength(6),
        Validators.maxLength(36)
      ])],
      confirm: ['', Validators.required],
      code: ['', Validators.required],
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

  ionViewDidLoad(){
    console.log("Home Page loaded");
    this.service.getData()
    .subscribe(
      (success: Country) => {
        this.country = success;
        console.log(success);
      },
      err => console.log(err)
    )
  }

  initializeItems(){
    this.items = [
      'Amsterdam',
      'Bogota',
      'Croatia',
      'England',
      'India',
      'Indonesia',
      'Indiana'
    ];
  }

  getItems(ev: any){
    if(this.show){
      this.show = false;
    }
    else{
      this.show = true;
    }
    this.initializeItems();
    const val = ev.target.value;
    if(val && val.trim() != ''){
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } 
  }

  getChange(symptom: string,event){
    console.log(event._value);
    console.log(symptom);
    var isChecked = event._value;
    const arr = <FormArray>this.patient.controls.symptoms;
    if(isChecked){
      arr.push(new FormControl(symptom));
    }
    else{
      let index = arr.controls.findIndex(x => x.value == symptom)
      arr.removeAt(index);
    }
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
    console.log(this.patient.value);
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

  // updateAge(event){
  //   this.ageEvent = event;
  //   console.log(this.ageEvent._value);
  //   if(this.age){
  //     this.age = false;
  //   }
  //   else{
  //     this.age = true;
  //     this.dob = false;
  //     this.dobEvent._value = false;
  //   }
  // }

  updateDOB(event){
    this.dobEvent = event;
    console.log(this.dobEvent);
    if(this.dob){
      this.dob = false;
      this.age = true;
    }
    else{
      this.dob = true;
      this.age = false;
    }
  }

  getAge(date,event){
    this.birthDate = event;
    // var today = new Date().toISOString();
    // var year = new Date().getFullYear() - this.birthDate.year;
    // if(year<18){
    //   alert("The age should be greater than 18, modify the date please");
    // }
    // var month = new Date().getMonth() - this.birthDate.month;
    // var day = new Date().getDate() - this.birthDate.day;
    // console.log(this.birthDate);
    // console.log("year",year);
    // console.log("month",month);
    // console.log("Day",day);
  }

  dropreg(){
    //this.drop = true;
    if(this.drop){
      this.drop = false;
    }
    else{
      this.drop = true;
    }
  }

  dropsymp(){
    //this.drop1 = true;
    if(this.drop1){
      this.drop1 = false;
    }
    else{
      this.drop1 = true;
    }
  }

}
