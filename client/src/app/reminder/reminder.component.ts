import { Component, OnInit } from '@angular/core';
import { MedicneUserService } from '../medicne-user.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css'],
})
export class ReminderComponent implements OnInit {
  constructor(private medService: MedicneUserService) {}

  ngOnInit(): void {}
  approve() {
    this.medService.approve().subscribe({
      next: (v) => {
        console.log(v);
        alert('approved');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  notApproveIgnor() {
    this.medService.Notapprove().subscribe({
      next: (v) => {
        alert('did not approved');
      },
      error: (e) => {},
    });
  }
}
