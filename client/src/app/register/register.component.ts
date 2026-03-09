import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User, AccessUser } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private UserServic: UserService, private router: Router) {}

  ngOnInit(): void {}
  user = new User('', '', '', 0, '', '', 0, '', 0, 0, 0, 0);

  testingValidation(SignUp: NgForm): boolean {
    // testing
    //phone testing
    console.log(SignUp.value.image);
    if (
      !SignUp.value.phone.match(/[055|052|058|057|054|053|050][0-9]{7}/) &&
      SignUp.value.phone.length != 10
    ) {
      alert('phone number incorrect');
      return false;
    }
    //email testing
    if (!SignUp.value.email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
      alert('email pattern incorrect');
      return false;
    }
    //name testing
    if (SignUp.value.name.length < 2) {
      alert('name to short');
      return false;
    }
    //password testing
    if (SignUp.value.password.length < 5) {
      alert('password to short');
      return false;
    }
    this.user = SignUp.value;
    //gender testing for profil image
    // ||
    // (SignUp.value.female && SignUp.value.male)
    if (SignUp.value.image && !SignUp.value.image) {
      alert('you need to chose only one gender');
      return false;
    } else {
      //adding profil image by user chose
      if (this.user.image) {
        this.user.image =
          'https://img.icons8.com/office/80/000000/bolivian-girl.png';
      } else {
        this.user.image = 'https://img.icons8.com/bubbles/100/000000/user.png';
      }
    }
    return true;
  }
  onSubmit(SignUp: NgForm) {
    console.log(SignUp.value);
    if (SignUp.value) {
      if (this.testingValidation(SignUp)) {
        this.user.loginAttempts = 0;
        this.user.access = AccessUser.user;
        console.log(this.user);
        this.UserServic.addUser(this.user).subscribe({
          next: (v) => {
            // this.user.token = v.token;
            localStorage.setItem('user data', v);
            alert('user add successfully ');
            this.router.navigateByUrl('/Health-Statement');
          },
          error: (e) => {
            console.log(e.data);
            alert('email already exists ');
          },
        });
      }
    }
  }
}
