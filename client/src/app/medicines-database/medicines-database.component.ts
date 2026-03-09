import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { axisLabelClick } from '@syncfusion/ej2-angular-charts';
import { MedDatabaseService } from '../med-database.service';

@Component({
  selector: 'app-medicines-database',
  templateUrl: './medicines-database.component.html',
  styleUrls: ['./medicines-database.component.css'],
})
export class MedicinesDatabaseComponent implements OnInit {
  constructor(private MedicneService: MedDatabaseService) {}

  ngOnInit(): void {
    this.getMedicnes();
  }
  medicnes: any[] = [];
  MedicneName: any;
  takingRecommend: {
    AmountOfPills: number;
    ForHowLong: number;
  };

  getMedicnes() {
    this.MedicneService.getMedicnes().subscribe({
      next: (v) => {
        console.log(v);
        this.medicnes = v;
      },
      error: (e) => {},
    });
  }
  addMedicne(newMed: NgForm) {
    this.takingRecommend = {
      AmountOfPills: newMed.value.AmountOfPills,
      ForHowLong: newMed.value.ForHowLong,
    };
    newMed.value.takingRecommend = this.takingRecommend;
    newMed.value.MedicneName = this.MedicneName;
    this.MedicneService.addMedicne(newMed.value).subscribe({
      next: (v) => {
        console.log(v);
        alert('new med added');
        window.location.reload();
      },
      error: (e) => {
        console.log(e);
        alert('med already exist');
      },
    });
  }
  deleteMed(med: string) {
    console.log(med);
    this.MedicneService.deleteMedicne(med).subscribe({
      next: (v) => {
        alert('med deleted');
        window.location.reload();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  update(updateMed: NgForm) {
    this.takingRecommend = {
      AmountOfPills: updateMed.value.AmountOfPills,
      ForHowLong: updateMed.value.ForHowLong,
    };
    updateMed.value.takingRecommend = this.takingRecommend;
    updateMed.value.MedicneName = this.MedicneName;
    this.MedicneService.updateMed(updateMed.value).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
