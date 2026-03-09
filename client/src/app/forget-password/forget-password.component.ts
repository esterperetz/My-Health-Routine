import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private UserServic: UserService, private router: Router) {}

  ngOnInit(): void {}
  public user: {
    email: string;
    password: string;
  };
  next: boolean = false;
  Validation(forgetPass: NgForm): boolean {
    if (forgetPass.value.password.length < 5) {
      alert('password to short');
      return false;
    }
    return true;
  }

  sendPassword(email: NgForm) {
    this.UserServic.sendNew_password(email.value.email).subscribe({
      next: (v) => {
        alert('new password send to your email');
        this.user = {
          email: email.value.email,
          password: v,
        };
        this.next = true;
      },
      error: (e) => {
        alert('email did not exist');
      },
    });
  }

  onSubmit(forgetPass: NgForm) {
    // this.Validation(forgetPass);
    if (this.user.password == forgetPass.value.tempPassword) {
      if (
        forgetPass.value.newPassword == forgetPass.value.password &&
        this.Validation(forgetPass)
      ) {
        this.user = {
          email: this.user.email,
          password: forgetPass.value.password,
        };
        this.UserServic.forget_password(this.user).subscribe({
          next: (v) => {
            console.log('password has been change');
            alert('password has been change');
            this.router.navigateByUrl('/login');
          },
          error: (e) => {
            console.log('wronge email');
            alert('email does no exsit');
          },
        });
      } else alert('password not equls');

      console.log(this.user);
    } else alert('wrong temprory paddword');
  }
}
