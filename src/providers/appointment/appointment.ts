import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppointmentProvider {

  private url = "../../assets/json/country.json";
  constructor(public http: HttpClient) {
    console.log('Hello AppointmentProvider Provider');
  }

  public getData(){
    return this.http.get<any>(this.url);
  }

}
