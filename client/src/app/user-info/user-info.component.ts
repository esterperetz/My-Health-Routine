import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService, AccessUser } from '../user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  constructor(private UserServic: UserService, private router: Router) {}
  userInfo = new User('', '', '', 0, '', ' ', 0, '', 0, 0, 0, 0);
  allUsers: User[] = [];
  accessUser: string = '';
  edit: boolean = false;
  ngOnInit(): void {
    this.getUser();
    this.getUsers();
  }
  clickOnEdit() {
    this.edit = true;
  }
  cancel() {
    this.edit = false;
  }

  getUser() {
    this.UserServic.userInfo().subscribe({
      next: (v) => {
        this.userInfo = v;
        if (v.access == AccessUser.user) this.accessUser = 'Customer';
        else if (v.access == AccessUser.worker) this.accessUser = 'Worker';
        else this.accessUser = 'Manager';
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  Validation() {
    if (
      !this.userInfo.phone.match(/[055|052|058|057|054|053|050][0-9]{7}/) &&
      this.userInfo.phone.length != 10
    ) {
      alert('phone number incorrect');
      return;
    }
    if (this.userInfo.access > 3) {
      alert('this kind of access does not exist');
      return;
    }
    if (this.userInfo.name.length > 3) {
      alert('user name to short');
      return;
    }
  }
  onSave() {
    console.log(this.userInfo.access);

    this.UserServic.updateUser(this.userInfo).subscribe({
      next: (v) => {
        console.log(v);
        alert('user details upadate successfully');
        this.edit = false;
      },
      error: (e) => {
        if (e.status === 401) alert('email already exist');
        console.log(e);
      },
    });
  }
  onDelete(user: User) {
    this.UserServic.deleteUser(user._id).subscribe({
      next: (v) => {
        alert('user deleted');
        window.location.reload();
      },
      error: (e) => console.log(e),
    });
  }
  getUsers() {
    this.UserServic.getUsers().subscribe({
      next: (v) => {
        this.allUsers = v;
      },
      error: (e) => console.log(e),
    });
  }
}
