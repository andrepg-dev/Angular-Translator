import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfoCuenta } from '../Interfaces/mongodb.interface';
import { MongoConectionService } from '../Services/mongo-conection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  accountData = {
    email: 'camila@gmail.com',
    password: 'soycamila',
  };

  allData: any;
  logued!: boolean;
  wrong_password!: boolean;

  constructor(private mongodb: MongoConectionService, private rutas: Router) {
    this.ObtenerDatos();

    document.addEventListener('keydown', (event) => {
      if (event.key == 'i' && event.ctrlKey) {
        this.ShowMenu();
      }
    });
  }

  DeleteAccount(id: string, password: string) {
    if (!id) {
      return console.log('No tienes id');
    }

    const prompt_password = prompt(
      'Escribe la password para eliminar la cuenta'
    );

    if (prompt_password == password) {
      this.mongodb.DeleteData(id).subscribe((d) => {
        console.log('¡Se ha eliminado tu cuenta correctamente!', d);
        this.ObtenerDatos();
      });
    } else {
      alert('La password es incorrecta');
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

  showMenu_boleean!: boolean;

  ShowMenu() {
    this.showMenu_boleean = !this.showMenu_boleean;
  }

  Alert_password() {
    this.wrong_password = true;

    console.log(alert);

    const quitar = () => {
      this.wrong_password = false;
    };
    return setTimeout(quitar, 3000);
  }

  Acceder() {
    this.allData.forEach((result: InfoCuenta) => {
      if (
        result.correo == this.accountData.email &&
        result.contrasena != this.accountData.password
      ) {
        this.Alert_password();
        return;
      }

      if (
        result.correo == this.accountData.email &&
        result.contrasena == this.accountData.password
      ) {
        console.log('Bienvenido');
        this.rutas.navigate(['/translate']);
        this.ShowAlert();
      }
    });
  }

  EmailValidation(email: string): boolean {
    const emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    // Validando email
    if (!emailRegex.test(email)) {
      // Email invalido
      return false;
    }
    // Email valido
    return true;
  }
}
