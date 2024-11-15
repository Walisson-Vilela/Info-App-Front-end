import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { FooterComponent } from './_components/footer/footer.component';
import { VehicleListComponent } from './_components/vehicle-list/vehicle-list.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    VehicleListComponent,
    LoginComponent,
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
  providers: [provideNgxMask({ /* opções de cfg */ })],
  bootstrap: [AppComponent]
})
export class AppModule { }
