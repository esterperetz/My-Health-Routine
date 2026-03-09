import { Data } from '@angular/router';
import { MedicneUser } from '../medicne-user.service';

export class dataObj {
  id: number;
  eventName: string;
  startTime: Data;
  endTime: Data;
  isAllDay: boolean;
  IsReadonly: boolean;
  constructor(
    id: number,
    eventName: string,
    startTime: Data,
    endTime: Data,
    isAllDay: boolean,
    IsReadonly: boolean,
    Color: string
  ) {
    this.id = id;
    this.eventName = eventName;
    this.startTime = startTime;
    this.endTime = endTime;
    this.isAllDay = isAllDay;
    this.IsReadonly = IsReadonly;
  }
  takingTimes(
    medicneUser: MedicneUser,
    date: Date,
    alart: string,
    i: number,
    text: string
  ): dataObj {
    let dataobj = new dataObj(0, '', new Date(), new Date(), false, false, '');
    let timeHour, timeMinutes;
    let day = new Date(date);
    timeHour = alart.substring(0, 2);
    timeMinutes = alart.substring(3, 5);
    dataobj.id = i;
    dataobj.eventName = `medicine remainder ${medicneUser.MedicneName} ${text}`;
    dataobj.startTime = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      Number(timeHour),
      Number(timeMinutes)
    );

    dataobj.endTime = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate() + medicneUser.ForHowLong - 1,
      Number(timeHour) + 1,
      Number(timeMinutes)
    );
    dataobj.isAllDay = false;
    dataobj.IsReadonly = true;
    return dataobj;
  }
  afterApproveOrNot(
    medicneUser: MedicneUser,
    date: Date,
    alart: string,
    i: number,
    text: string
  ) {
    let dataobj = new dataObj(0, '', new Date(), new Date(), false, false, '');
    let timeHour, timeMinutes;
    let day = new Date(medicneUser.StartDay);
    let endDay = new Date(date);
    timeHour = alart.substring(0, 2);
    timeMinutes = alart.substring(3, 5);
    dataobj.id = i;
    dataobj.eventName = `med taken ${text}`;
    dataobj.startTime = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      Number(timeHour),
      Number(timeMinutes)
    );

    dataobj.endTime = new Date(
      day.getFullYear(),
      day.getMonth(),
      endDay.getDate() - 1,
      Number(timeHour) + 1,
      Number(timeMinutes)
    );
    dataobj.isAllDay = false;
    dataobj.IsReadonly = true;

    return dataobj;
  }
}
