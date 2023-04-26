import { Component } from '@angular/core';
import { MongoConectionService } from './Services/mongo-conection.service';
import { InfoCuenta } from './Interfaces/mongodb.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  accountData = {
    email: '',
    password: '',
    nombre: '',
    apellido: '',
  }

  allData: any;
  logued!: boolean;

  constructor(private mongodb: MongoConectionService) {
    this.ObtenerDatos();
  }

  Send() {
    if (!this.accountData.email || !this.accountData.password || !this.accountData.nombre || !this.accountData.apellido) {
      return console.log('Faltan datos');
    }
    
    // Validando email
    if(!this.EmailValidation(this.accountData.email)){
      return console.log('Email invalido');
    }
    
    const fullName = this.accountData.nombre + ' ' + this.accountData.apellido;

    const body: InfoCuenta = {
      correo: this.accountData.email,
      contrasena: this.accountData.password,
      fullName: fullName.toUpperCase(),
      important: false,
      fecha: new Date(),
    };

    this.mongodb.SendData(body).subscribe( result => {
      console.log(result);
      
      // Reseteando formulario
      this.accountData = {
        email: '',
        password: '',
        nombre: '',
        apellido: '',
      }
      this.ShowAlert();

      // Actualizando data enviada
      this.ObtenerDatos();
    });
  }

  DeleteAccount(id: string, contraseña: string) {
    if (!id) {
      return console.log('No tienes id');
    }

    const prompt_password = prompt('Escribe la contraseña para eliminar la cuenta');

    if (prompt_password == contraseña) {
      this.mongodb.DeleteData(id).subscribe((d) => {
        console.log('¡Se ha eliminado tu cuenta correctamente!', d);
        this.ObtenerDatos();
      });
    }
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

  showMenu!: boolean;
  ShowMenu() {
    this.showMenu = !this.showMenu;
  }

  EmailValidation(email: string): boolean {

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    // Validando email
    if (!emailRegex.test(email)) {
      // Email invalido
      return false
    }
    // Email valido
    return true
  }
}
