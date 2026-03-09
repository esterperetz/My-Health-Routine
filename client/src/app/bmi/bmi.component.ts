import { Component, OnInit } from '@angular/core';
import { Category, ThumbSettings } from '@syncfusion/ej2-angular-charts';
import { UserInfoEditDetailsComponent } from '../user-info-edit-details/user-info-edit-details.component';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css'],
})
export class BMIComponent implements OnInit {
  bmiCalc: string;
  meesage: string = 'Normal weight';
  result: number;
  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.getUser();
  }
  weight: number;
  height: number;
  heightval: any;
  weightval: any;
  getUser() {
    this.UserService.userInfo().subscribe({
      next: (v) => {
        this.weight = v.weight;
        this.height = v.height * 100;
        this.heightval = v.height;
        this.calculate();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  i: number = 0;
  calculate() {
    this.bmiCalc = (this.weight / Math.pow(this.height / 100, 2)).toFixed(1);
    this.result = JSON.parse(this.bmiCalc);
    if (JSON.parse(this.bmiCalc) < 18.5) {
      this.meesage = 'Underweight 😒';
    } else if (
      JSON.parse(this.bmiCalc) >= 18.5 &&
      JSON.parse(this.bmiCalc) <= 24.9
    ) {
      this.meesage = 'Normal Weight 😍';
    } else if (
      JSON.parse(this.bmiCalc) >= 25 &&
      JSON.parse(this.bmiCalc) <= 29.9
    ) {
      this.meesage = 'Overweight 😮';
    } else {
      this.meesage = 'Obese 😱';
    }
  }
  Weight(w: number) {
    this.weight++;
    this.calculate();
    console.log('dd');
  }
  Height() {
    this.height++;
    this.calculate();
    console.log(this.heightval);
  }
  getSliderValue(event: any) {
    this.weight = event.target.value;
    this.calculate();

    console.log(this.weight);
  }
  getSliderHeight(event: any) {
    this.height = event.target.value;
    this.calculate();

    console.log(this.height);
  }
}
