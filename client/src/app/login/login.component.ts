import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  User: any = [];
  users: User[] = [];
  user: {
    email: string;
    password: string;
  };
  i: number = 0;
  flag: boolean = false;
  idUser: number = 0;

  constructor(private UserServic: UserService, private router: Router) {}
  ngOnInit(): void {}
  onSubmit(login: NgForm) {
    this.user = login.value;
    console.log(this.user);
    this.UserServic.loged_In_User(this.user).subscribe({
      next: (v) => {
        console.log(v);
        localStorage.clear();
        localStorage.setItem('user data', v);
        alert('welcome');
        this.router.navigateByUrl('/home');
      },
      error: (e) => {
        if (e.status == 400) alert('to many attempts try forget password');
        if (e.status == 401) alert('wrong password or email');

        console.log(e);
      },
    });
  }
}
