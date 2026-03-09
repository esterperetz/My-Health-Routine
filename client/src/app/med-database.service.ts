import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedDatabaseService {
  baseURL: string = 'http://localhost:8000/api/Medicne/';
  headers = { 'content-type': 'application/json' };
  constructor(private http: HttpClient, private router: Router) {}
  addMedicne(med: Object): Observable<any> {
    let body = JSON.stringify(med);
    return this.http.post(this.baseURL + 'addMedcine', body, {
      headers: this.headers,
    });
  }
  getMedicnes(): Observable<any> {
    return this.http.get(this.baseURL + 'getMedicnes');
  }
  deleteMedicne(_id: string): Observable<any> {
    return this.http.delete(this.baseURL + 'deleteMed/' + _id);
  }
  updateMed(Medicne: any): Observable<any> {
    let body = JSON.stringify(Medicne);
    return this.http.put(
      this.baseURL + 'updateMed/' + Medicne.MedicneName,
      body,
      {
        headers: this.headers,
      }
    );
  }
  overTake(med: Object): Observable<any> {
    let body = JSON.stringify(med);
    return this.http.post(this.baseURL + 'overTake', body, {
      headers: this.headers,
    });
  }
}
