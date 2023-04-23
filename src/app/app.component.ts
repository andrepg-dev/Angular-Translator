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

  logued!: boolean;

  constructor(private mongodb: MongoConectionService) {
    this.ObtenerDatos();
    this.voice('hola');
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

    this.mongodb.SendData(body).subscribe(() => {
      this.email = '';
      this.password = '';
      this.ShowAlert();

      // Actualizando data enviada
      this.ObtenerDatos();
    });
  }

  DeleteAccount(id: string) {
    if (!id) {
      return console.log('No tienes id');
    }

    if (confirm('¿Estás seguro que quieres eliminar esta cuenta?')) {
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
      this.allData = this.allData.reverse();
    });
  }

  showMenu!: boolean;
  ShowMenu() {
    this.showMenu = !this.showMenu;
  }

  // make a sum of two numbers
  sum(a: number, b: number) {
    return a + b;
  }

  // haz una funcion que pueda escuchar la voz
  voice(text: string) {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'es-ES';
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  }
}
