import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PharmacyService, Pharmacy, Address } from '../pharmacy.service';

@Component({
  selector: 'app-search-for-a-pharmacy',
  templateUrl: './search-for-a-pharmacy.component.html',
  styleUrls: ['./search-for-a-pharmacy.component.css'],
})
export class SearchForAPharmacyComponent implements OnInit {
  constructor(private pharmacyService: PharmacyService) {}
  // pharmacyDetails = new Pharmacy('', new Address('', '', ''), '', '');
  pharmacies: Pharmacy[];
  pharmacyDetails: Pharmacy[] = [];
  name: any;
  ngOnInit(): void {
    this.getPharmacies();
  }
  falg: boolean = false;
  getPharmacy(search: NgForm) {
    console.log(search.value);
    this.pharmacyService.getPharmacy(search.value).subscribe({
      next: (v) => {
        this.pharmacyDetails = v;
        this.falg = true;
        // console.log(this.pharmacyDetails.namePharmacy);
      },
      error: (e) => {
        return false;
      },
    });
  }

  getPharmacies() {
    this.pharmacyService.getPharmacies().subscribe({
      next: (v) => {
        this.pharmacies = v;
        console.log(this.pharmacies[0].address.citiy);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
