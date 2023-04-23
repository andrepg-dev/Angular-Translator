import { Component } from '@angular/core';
import { MongoConectionService } from './Services/mongo-conection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  email!: string;
  password!: string;
  nombre!: string;
  apellido!: string;

  allData: any;

  id!: string;
  logued!: boolean;

  constructor(private mongodb: MongoConectionService) {
    this.ObtenerDatos();
  }

  Send() {
    if (!this.email.includes('@')) {
      return console.log('Debe ser un correo electronico');
    }

    const body = {
      correo: this.email,
      contraseña: this.password,
      important: false,
      fecha: new Date(),
    };

    this.mongodb.SendData(body).subscribe((data) => {
      this.email = '';
      this.password = '';
      this.id = data.id;
      this.ShowAlert();
    });

  }

  DeleteAccount() {
    if (!this.id) {
      return console.log('No tienes id');
    }

    this.mongodb.DeleteData(this.id).subscribe((d) => {
      console.log('¡Se ha eliminado tu cuenta correctamente!', d);
      this.id = '';
    });
  }

  ShowAlert() {
    this.logued = true;

    const quitar = () => {
      this.logued = false;
    };
    setTimeout(quitar, 3000);
  }

  ObtenerDatos() {
    this.mongodb.GetData().subscribe((data) => {
      this.allData = data;
    });
  }

  showMenu!:boolean;
  ShowMenu(){
    this.showMenu = !this.showMenu;
  }
}
