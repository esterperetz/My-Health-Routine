import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { CalendearComponent } from './calendear/calendear.component';
import { EnterAMedicineComponent } from './enter-a-medicine/enter-a-medicine.component';
import { NaturalProductsComponent } from './natural-products/natural-products.component';
import { SearchForAPharmacyComponent } from './search-for-a-pharmacy/search-for-a-pharmacy.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { CalendarModule } from 'angular-calendar';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HealthStatementComponent } from './health-statement/health-statement.component';
import { UserInfoEditDetailsComponent } from './user-info-edit-details/user-info-edit-details.component';
import { PymentComponent } from './pyment/pyment.component';
import { UserService } from './user.service';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AddPharmacyComponent } from './add-pharmacy/add-pharmacy.component';
import {
  ScheduleModule,
  DayService,
  MonthService,
  MonthAgendaService,
  TimelineViewsService,
  TimelineMonthService,
} from '@syncfusion/ej2-angular-schedule';
import {
  ChartModule,
  LineSeriesService,
  CategoryService,
} from '@syncfusion/ej2-angular-charts';
import { StatisticsDiagramsComponent } from './statistics-diagrams/statistics-diagrams.component';
import { AboutComponent } from './about/about.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrdersComponent } from './orders/orders.component';
import { ReminderComponent } from './reminder/reminder.component';
import { BMIComponent } from './bmi/bmi.component';
import { MedicinesDatabaseComponent } from './medicines-database/medicines-database.component';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    CalendearComponent,
    EnterAMedicineComponent,
    NaturalProductsComponent,
    SearchForAPharmacyComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    PageNotFoundComponent,
    UserInfoComponent,
    CartComponent,
    ProductsComponent,
    ProductDetailsComponent,
    HealthStatementComponent,
    UserInfoEditDetailsComponent,
    PymentComponent,
    ForgetPasswordComponent,
    AddPharmacyComponent,
    StatisticsDiagramsComponent,
    AboutComponent,
    OrdersComponent,
    ReminderComponent,
    BMIComponent,
    MedicinesDatabaseComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ScheduleModule,
    CalendarModule,
    ChartModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserService, multi: true },
    DayService,
    MonthService,
    MonthAgendaService,
    TimelineViewsService,
    TimelineMonthService,
    LineSeriesService,
    CategoryService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
