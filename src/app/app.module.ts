import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { RoutingModule } from './routing/routing.module';
import { TranslateComponent } from './translate/translate.component';

@NgModule({
  declarations: [AppComponent, RegistroComponent, LoginComponent, TranslateComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, RoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
