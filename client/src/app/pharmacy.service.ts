import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PharmacyService {
  baseURL: string = 'http://localhost:8000/api/pharmacy/';
  headers = { 'content-type': 'application/json' };
  constructor(private http: HttpClient) {}

  getPharmacies(): Observable<any> {
    return this.http.get(this.baseURL + 'pharmacies');
  }

  getPharmacy(pharm: object): Observable<any> {
    console.log(pharm);
    let body = JSON.stringify(pharm);
    return this.http.post(this.baseURL + 'pharmacy', body, {
      headers: this.headers,
    });
  }
  addPharmacy(pharm: Pharmacy): Observable<any> {
    let body = JSON.stringify(pharm);
    return this.http.post(this.baseURL + 'addPharmacy', body, {
      headers: this.headers,
    });
  }
}
export class Address {
  citiy: string;
  street: string;
  numberStreet: string;
  constructor(citiy: string, street: string, numberStreet: string) {
    this.citiy = citiy;
    this.street = street;
    this.numberStreet = numberStreet;
  }
}
export class Pharmacy {
  namePharmacy: string;
  address: Address;
  phone: string;
  openingDescription: string;
  constructor(
    namePharmacy: string,
    address: Address,
    phone: string,
    openingDescription: string
  ) {
    this.namePharmacy = namePharmacy;
    this.address = address;
    this.phone = phone;
    this.openingDescription = openingDescription;
  }
}
