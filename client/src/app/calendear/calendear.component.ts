import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  EventSettingsModel,
  View,
  MonthService,
  PopupOpenEventArgs,
} from '@syncfusion/ej2-angular-schedule';
import {
  MedicneUserService,
  MedicneUser,
  TakingTime,
  Times,
} from '../medicne-user.service';
import { dataObj } from './dataObj';
import { format, parseIso } from 'ts-date';
import { type } from 'os';

@Component({
  selector: 'app-calendear',
  templateUrl: './calendear.component.html',
  providers: [MonthService],
  styleUrls: ['./calendear.component.css'],
})
export class CalendearComponent implements OnInit {
  constructor(private MedicneUserService: MedicneUserService) {}
  medUser = new MedicneUser(
    '',
    '',
    '',
    0,
    new TakingTime(
      new Times(new Date(), '', ''),
      new Times(new Date(), '', ''),
      new Times(new Date(), '', '')
    ),
    0,
    0,
    new Date()
  );
  take = new TakingTime(
    new Times(new Date(), '', ''),
    new Times(new Date(), '', ''),
    new Times(new Date(), '', '')
  );
  objdata: dataObj = new dataObj(
    0,
    '',
    new Date(),
    new Date(),
    false,
    false,
    ''
  );
  openE: boolean = false;
  openM: boolean = false;
  openN: boolean = false;
  d: Date = new Date();
  medForCurrentMonth: boolean = false;
  data: object[] = [];
  dataObj: {
    id: number;
    eventName: string;
    startTime: Date;
    endTime: Date;
    isAllDay: boolean;
  };
  duration: number = 0;
  ngOnInit(): void {
    this.getMedicneUsers(new Date());
  }
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
  edit: boolean = false;
  medicneUser: MedicneUser[] = [];
  clickOnEdit() {
    if (!this.edit) this.edit = true;
    else this.edit = false;
  }

  validator(medicneUser: NgForm) {
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

  onSave(medicneUser: NgForm) {
    this.validator(medicneUser);
    console.log(medicneUser.value);
    this.medUser = medicneUser.value;
    this.medUser.TakingTime = this.take;
    this.MedicneUserService.updateMedicneUser(this.medUser).subscribe({
      next: (v) => {
        console.log(v);
        alert('changes saved');
        window.location.reload();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  delete(med: MedicneUser) {
    this.MedicneUserService.deleteMedicneUser(med).subscribe({
      next: (v) => {
        alert('med deleted');
        window.location.reload();
      },
      error: (e) => {},
    });
  }
  day: string = '';
  monthYear: any;
  public selectedDate: Date = new Date();
  count: number = 0;
  getMedicneUsers(newMonthYear: any) {
    if (newMonthYear.value != undefined)
      this.monthYear = newMonthYear.value.monthYear;
    else this.monthYear = new Date();
    this.selectedDate = new Date(this.monthYear);
    this.MedicneUserService.getMedicneUser(this.monthYear).subscribe({
      next: (v) => {
        for (let i = 0; i < v.length; i++) {
          v[i].StartDay = format(new Date(v[i].StartDay), 'YYYY-MM-DD');
          this.medicneUser.push(v[i]);
          if (v[i].TakingTime.Morning.time != '') {
            this.count++;
          }
          if (v[i].TakingTime.Noon.time != '') {
            this.count++;
          }
          if (v[i].TakingTime.Evening.time != '') {
            this.count++;
          }
          // this.medForCurrentMonth = true;
        }
        console.log(this.count);
        this.listMedOfUser();
        this.duration = Number(
          JSON.stringify(this.medicneUser[0].StartDay).substring(10, 11)
        );
      },
      error: (e) => {},
    });
  }

  listMedOfUser() {
    // this.d.getDate();
    let j = 0;
    for (let i = 0; i < this.medicneUser.length; i++) {
      if (this.medicneUser[i].TakingTime.Morning.time == 'Morning') {
        this.objdata = this.objdata.takingTimes(
          this.medicneUser[i],
          this.medicneUser[i].TakingTime.Morning.approvDate,
          this.medicneUser[i].TakingTime.Morning.alert,
          j++,
          'Morning'
        );
        this.data.push(this.objdata);
        if (
          this.medicneUser[i].TakingTime.Morning.approvDate !=
          this.medicneUser[i].StartDay
        ) {
          this.objdata = this.objdata.afterApproveOrNot(
            this.medicneUser[i],
            this.medicneUser[i].TakingTime.Morning.approvDate,
            this.medicneUser[i].TakingTime.Morning.alert,
            j++,
            'Morning'
          );
          console.log(this.objdata);
          this.data.push(this.objdata);
        }
      }

      if (this.medicneUser[i].TakingTime.Noon.time == 'Noon') {
        this.objdata = this.objdata.takingTimes(
          this.medicneUser[i],
          this.medicneUser[i].TakingTime.Noon.approvDate,
          this.medicneUser[i].TakingTime.Noon.alert,
          j++,
          'Noon'
        );
        this.data.push(this.objdata);
        if (
          this.medicneUser[i].TakingTime.Noon.approvDate !=
          this.medicneUser[i].StartDay
        ) {
          this.objdata = this.objdata.afterApproveOrNot(
            this.medicneUser[i],
            this.medicneUser[i].TakingTime.Noon.approvDate,
            this.medicneUser[i].TakingTime.Noon.alert,
            j++,
            'Noon'
          );
          this.data.push(this.objdata);
        }
      }
      if (this.medicneUser[i].TakingTime.Evening.time == 'Evening') {
        this.objdata = this.objdata.takingTimes(
          this.medicneUser[i],
          this.medicneUser[i].TakingTime.Evening.approvDate,
          this.medicneUser[i].TakingTime.Evening.alert,
          j++,
          'Evening'
        );
        this.data.push(this.objdata);
        if (
          this.medicneUser[i].TakingTime.Evening.approvDate !=
          this.medicneUser[i].StartDay
        ) {
          this.objdata = this.objdata.afterApproveOrNot(
            this.medicneUser[i],
            this.medicneUser[i].TakingTime.Evening.approvDate,
            this.medicneUser[i].TakingTime.Evening.alert,
            j++,
            'Evening'
          );
          this.data.push(this.objdata);
        }
      }
    }
  }

  public setView: View = 'Month';
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      id: 'id',
      subject: { name: 'eventName' },
      isAllDay: { name: 'isAllDay' },
      startTime: { name: 'startTime' },
      endTime: { name: 'endTime' },
    },
  };

  myDate: Date = new Date();
}
