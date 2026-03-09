import { NgClass, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address, Pharmacy, PharmacyService } from '../pharmacy.service';

@Component({
  selector: 'app-add-pharmacy',
  templateUrl: './add-pharmacy.component.html',
  styleUrls: ['./add-pharmacy.component.css'],
})
export class AddPharmacyComponent implements OnInit {
  constructor(private pharmacyService: PharmacyService) {}

  pharmacyDetails = new Pharmacy('', new Address('', '', ''), '', '');
  managerAccess: number;
  ngOnInit(): void {
    this.managerAccess = JSON.parse(
      localStorage.getItem('access') || null || ' '
    ).access;
  }

  onSubmit(pharmacy: NgForm) {
    this.pharmacyDetails = pharmacy.value;
    console.log(this.pharmacyDetails);
    this.pharmacyService.addPharmacy(this.pharmacyDetails).subscribe({
      next: (v) => {
        alert('new pharmacy added');
      },
      error: (e) => {
        alert('pharmacy already exist');
      },
    });
  }
}
