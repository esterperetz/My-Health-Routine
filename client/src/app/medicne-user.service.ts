import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicneUserService {
  baseURL: string = 'http://localhost:8000/api/MedicneUser/';
  headers = { 'content-type': 'application/json' };
  constructor(private http: HttpClient, private router: Router) {}
  addMedicneUser(med: Object): Observable<any> {
    let body = JSON.stringify(med);
    return this.http.post(this.baseURL + 'addMedicneUser', body, {
      headers: this.headers,
    });
  }

  getMedicneUser(monthYear: Date): Observable<any> {
    console.log(monthYear);
    return this.http.get(this.baseURL + 'getMedicneUser/' + monthYear);
  }

  updateMedicneUser(medUser: MedicneUser): Observable<any> {
    let body = JSON.stringify(medUser);
    return this.http.put(this.baseURL + 'updateMed/' + medUser._id, body, {
      headers: this.headers,
    });
  }
  deleteMedicneUser(medUser: MedicneUser): Observable<any> {
    return this.http.delete(
      this.baseURL + 'deleteMedUser/' + medUser.MedicneName
    );
  }

  sendEmailReminder(): Observable<any> {
    return this.http.get(this.baseURL + 'sendReminder');
  }
  approve(): Observable<any> {
    return this.http.get(this.baseURL + 'approved');
  }
  //add
  Notapprove(): Observable<any> {
    return this.http.get(this.baseURL + 'didnotAprov');
  }
}

export class Times {
  approvDate: Date;
  time: string;
  alert: string;
  constructor(approvDate: Date, time: string, alert: string) {
    this.approvDate = approvDate;
    this.time = time;
    this.alert = alert;
  }
}
export class TakingTime {
  Morning: Times;
  Noon: Times;
  Evening: Times;
  constructor(Morning: Times, Noon: Times, Evening: Times) {
    this.Morning = Morning;
    this.Noon = Noon;
    this.Evening = Evening;
  }
}
export class MedicneUser {
  _id: string;
  userId: string;
  MedicneName: string;
  MgQuantity: number;
  TakingTime: TakingTime;
  AmountOfPills: number;
  ForHowLong: number;
  StartDay: Date;
  constructor(
    _id: string,
    userId: string,
    MedicneName: string,
    MgQuantity: number,
    TakingTime: TakingTime,
    AmountOfPills: number,
    ForHowLong: number,
    StartDay: Date
  ) {
    this._id = this._id;
    this.userId = userId;
    this.MedicneName = MedicneName;
    this.MgQuantity = MgQuantity;
    this.TakingTime = TakingTime;
    this.AmountOfPills = AmountOfPills;
    this.ForHowLong = ForHowLong;
    this.StartDay = StartDay;
  }
}
