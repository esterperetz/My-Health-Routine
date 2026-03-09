import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateTime } from '@syncfusion/ej2-angular-charts';
import { Router } from '@angular/router';
import {
  MedicneUserService,
  MedicneUser,
  TakingTime,
  Times,
} from '../medicne-user.service';
import { MedDatabaseService } from '../med-database.service';

@Component({
  selector: 'app-enter-a-medicine',
  templateUrl: './enter-a-medicine.component.html',
  styleUrls: ['./enter-a-medicine.component.css'],
})
export class EnterAMedicineComponent implements OnInit {
  take = new TakingTime(
    new Times(new Date(), '', ''),
    new Times(new Date(), '', ''),
    new Times(new Date(), '', '')
  );
  public flag: boolean = false;

  constructor(
    private MedicneUserService: MedicneUserService,
    private router: Router,
    private MedicneService: MedDatabaseService
  ) {}
  managerAccess: number;

  ngOnInit(): void {
    // this.getMedicneUser();
    this.getMedicnes();
    this.managerAccess = JSON.parse(
      localStorage.getItem('access') || null || ' '
    ).access;
  }
  searchText: any;
  medicneUser: MedicneUser[] = [];
  medicnes: any[] = [];
  usermedicne: {
    MedicneName: string;
    MgQuantity: number;
    TakingTime: TakingTime;
    AmountOfPills: number;
    ForHowLong: number;
    StartDay: Date;
  };
  userAccess: string = JSON.parse(localStorage.getItem('access') || null || ' ')
    .userId;
  openE: boolean = false;
  openM: boolean = false;
  openN: boolean = false;
  OpenE() {
    if (!this.openE) this.openE = true;
    else this.openE = false;
  }
  OpenN() {
    if (!this.openN) this.openN = true;
    else this.openN = false;
  }
  OpenM() {
    if (!this.openM) this.openM = true;
    else this.openM = false;
  }
  setTime(medicneUser: NgForm) {
    if (medicneUser.value.Evening) {
      this.take.Evening.time = 'Evening';
      this.take.Evening.alert = medicneUser.value.alartE;
    }
    if (medicneUser.value.Noon) {
      this.take.Noon.time = 'Noon';
      this.take.Noon.alert = medicneUser.value.alartN;
    }
    if (medicneUser.value.Morning) {
      this.take.Morning.time = 'Morning';
      this.take.Morning.alert = medicneUser.value.alartM;
    }
  }
  getCategory(e: any) {
    console.log(e.target.value);
    this.searchText = e.target.value.trim();
  }
  onSubmit(medicneUser: NgForm) {
    this.setTime(medicneUser);
    this.usermedicne = {
      MedicneName: this.searchText,
      MgQuantity: medicneUser.value.MgQuantity,
      TakingTime: this.take,
      AmountOfPills: medicneUser.value.AmountOfPills,
      ForHowLong: medicneUser.value.ForHowLong,
      StartDay: medicneUser.value.StartDay,
    };
    this.MedicneService.overTake(this.usermedicne).subscribe({
      next: (v) => {
        console.log(v);
        let c = confirm(
          'from our data we notaice over take in amount of pills'
        );
        if (c) {
          console.log('work');
          this.overTake(this.medicneUser);
          return;
        } else if (!c) {
          console.log('cancel');
        } else {
          this.overTake(this.medicneUser);
        }
      },
      error: (e) => {
        console.log(e);
        this.overTake(this.medicneUser);
      },
    });
  }
  overTake(medicneUser: Object) {
    this.MedicneUserService.addMedicneUser(this.usermedicne).subscribe({
      next: (v) => {
        alert('enter medican to calendar has been successful');
        this.router.navigateByUrl('/Calendear');
      },
      error: (e) => {
        console.log(e);
        alert('can not enter another medican health poliacy');
      },
    });
  }

  getMedicnes() {
    this.MedicneService.getMedicnes().subscribe({
      next: (v) => {
        this.medicnes = v;
      },
      error: (e) => {},
    });
  }
}
