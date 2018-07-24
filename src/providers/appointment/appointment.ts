import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppointmentProvider {

  private url = "../../assets/imgs/country.json";
  constructor(public http: HttpClient) {

  }

  public getData(){
    return this.http.get<any>(this.url);
  }

}
