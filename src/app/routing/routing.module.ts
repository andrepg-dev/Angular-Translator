import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { TranslateComponent } from '../translate/translate.component';

const rutas: Routes = [
  {path: '', redirectTo: 'translate', pathMatch: 'full'},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'translate', component: TranslateComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(rutas)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
