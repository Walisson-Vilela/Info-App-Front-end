import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { VehicleListComponent } from './_components/vehicle-list/vehicle-list.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxFilterComponent } from './_components/checkbox-filter/checkbox-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    VehicleListComponent,
    LoginComponent,
    CheckboxFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  providers: [provideNgxMask({})],
  bootstrap: [AppComponent]
})
export class AppModule { }
