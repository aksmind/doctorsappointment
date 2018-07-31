import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController, Loading, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { AppointmentProvider } from '../../providers/appointment/appointment';
import { Country, PatientData } from '../../providers/patient';
import { DisplayPage } from '../display/display';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { BackgroundMode } from '@ionic-native/background-mode';

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
  min: string;
  ageOfPatient: number = 18;
  wrong:boolean = false;
  offlinePatient: any;
  online: boolean = false;
  offline: boolean = false;
  type;

  constructor(private platform: Platform, private network: Network, public backgroundMode: BackgroundMode, public navParams: NavParams, private storage: Storage, private http: HttpClient,private toast: ToastController,private alertCtrl: AlertController,public navCtrl: NavController, private formBuilder: FormBuilder, private service: AppointmentProvider) {
   
    this.platform.ready().then(() => {
      let disconnectSub = this.network.onDisconnect().subscribe(() => {
        console.log('you are offline');
        this.offline = true;
        this.online = false;
      });
      
      let connectSub = this.network.onConnect().subscribe(()=> {
        console.log('you are online');
        this.online = true;
        this.offline = false;
        this.storage.get('patient').then((val) => {
          this.offlinePatient = JSON.parse(val);
        })
        setTimeout(() => {
          console.log("Offline patient: " + this.offlinePatient);
          if(this.offlinePatient !== null){
            this.service.insertPatient(this.offlinePatient);
            this.offlinePatient = null;
            // // this.storage.set('patient','');
            this.storage.remove('patient');
            this.getOfflineSubmitAlert();
          }
        },3000)
        
      });
    })
    
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
      // code: [''],
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
    this.storage.get('patient').then((val) => {
      let pat = JSON.parse(val);
      if(pat !== null){
        this.service.insertPatient(pat);
        this.storage.remove('patient');
        this.getOfflineSubmitAlert();
      }
    })
    // this.service.getCode()
    // .subscribe(
    //   (success: Country) => {
    //     this.country = success;
    //   },
    //   err => {
    //     this.toast.create({
    //       message: JSON.parse(err)
    //     }).present()
    //   }
    // )
    // this.storage.get('patient').then((val) => {
    //   this.offlinePatient = JSON.stringify(val);
    //   console.log('storage data ' + this.offlinePatient);
    // })

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
        this.wrong = true;
        return {
          mismatchPasswords: true
        };
      }
      else{
        this.wrong = false;
      }
    }
  }

  onSubmit(patient){
    console.log(patient.value);
    this.backgroundMode.enable();
    this.backgroundMode.on("activate").subscribe(() => {
      this.service.insertPatient(patient.value);
      // this.getOfflineAlert();
    });
    this.service.insertPatient(patient.value);
    this.getAlert();
    this.navCtrl.push(DisplayPage, {
      data: this.patient.value
    });
    this.resetForm(patient);
    
    // if(this.offline == true && this.online == false){
    //   console.log("The device is not online");
    //   this.storage.set('patient',JSON.stringify(patient.value));
    //   // this.storage.get('patient').then((val) => {
    //   //   this.offlinePatient = JSON.stringify(val);
    //   //   console.log('storage data ' + this.offlinePatient);
    //   // })
    //   this.getOfflineAlert();
    // }
    // else if(this.online == true && this.offline == false){
    //   console.log("The device is online");
    //   this.service.insertPatient(patient.value);
    //   this.getAlert();
    //   // this.navCtrl.push(DisplayPage, {
    //   //   data: this.patient.value
    //   // });
    // }
    // else if(this.online == false && this.offline == false){
    //   console.log("The device is online");
    //   this.service.insertPatient(patient.value);
    //   this.getAlert();
    //   // this.navCtrl.push(DisplayPage, {
    //   //   data: this.patient.value
    //   // });
    // }
  }

  // onSubmit(){
  //   this.getAlert();
    // this.navCtrl.push(DisplayPage, {
    //   data: this.patient.value
    // });  
  // }

  getAlert(){
    let alert = this.alertCtrl.create({
      title: "Successfully",
      subTitle: "The appointment has been done successfully!",
      buttons: ['Dismiss']
    });
    alert.present();
  }

  getOfflineSubmitAlert(){
    let alert = this.alertCtrl.create({
      title: "Successfully",
      subTitle: "The offline form has been submitted successfully!",
      buttons: ['Dismiss']
    });
    alert.present();
  }

  getOfflineAlert(){
    let alert = this.alertCtrl.create({
      title: "Successfully",
      subTitle: "No internet connection. Form will be submitted once the network is available.",
      buttons: ['Dismiss']
    });
    alert.present();
  }

  resetForm(patient){
    if(patient != null){
      patient.reset();
    }
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
    var day = event.day;
    var month = event.month;
    var year = event.year;
    var current = new Date();
    this.ageOfPatient = current.getFullYear() - event.year;
    this.min = day + "/" + month + "/" + year;
  }

}
