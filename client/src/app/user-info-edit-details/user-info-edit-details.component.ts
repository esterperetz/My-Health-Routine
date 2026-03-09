import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-user-info-edit-details',
  templateUrl: './user-info-edit-details.component.html',
  styleUrls: ['./user-info-edit-details.component.css'],
})
export class UserInfoEditDetailsComponent implements OnInit {
  constructor(
    private acRout: ActivatedRoute,
    private UserServic: UserService,
    private router: Router
  ) {}
  userId: string = '';
  userInfo = new User('', '', '', 0, '', ' ', 0, '', 0, 0, 0, 0);

  ngOnInit(): void {
    this.userId = this.acRout.snapshot.params['id'];
    this.getUser();
  }
  getUser() {
    this.UserServic.userDetails(this.userId).subscribe({
      next: (v) => {
        this.userInfo = v;
      },
      error: (e) => console.log(e),
    });
  }
  onSave() {
    this.userInfo._id = this.userId;
    if (this.userInfo.access > 3) {
      alert('this kind of access does not exist');
      return;
    }
    this.UserServic.updateUser(this.userInfo).subscribe({
      next: (v) => {
        console.log(v);
        alert('user details upadate successfully');
        this.router.navigateByUrl('/userInfo');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
