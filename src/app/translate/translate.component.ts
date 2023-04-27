import { Component } from '@angular/core';
import { languages_symbols } from '../translate/languages';
import { TranslateService } from '../Services/translate.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
})
export class TranslateComponent {
  // Languages variables
  languages = languages_symbols;
  languagesArray = Object.entries(this.languages);
  result: any;

  // Speech Recognition Variables
  windows_recognition = new (window as any).webkitSpeechRecognition();
  recording!: boolean;
  text_recognition!: string;

  // Hear Voice From Navigator variables
  navigator_speak = new SpeechSynthesisUtterance();

  constructor(private translateService: TranslateService) {}

  // Translate Function
  translate() {
    this.translateService.translate(this.text_recognition, 'es', 'fr').subscribe((res: any) => {
        this.result = res[0][0][0];
        console.log(this.result);
      });
  }

  recognition() {
    this.windows_recognition.start();
    this.recording = true;

    this.windows_recognition.onresult = (event: any) => {
      this.text_recognition = event.results[0][0].transcript;
    };

    this.windows_recognition.addEventListener('end', () => {
      this.recording = false;
      this.translate();
    });
  }

  stop_recognition() {
    this.windows_recognition.stop();
  }

  hear_voice() {
    // Making a validation to check if the result is null
    if(!this.result){
      return;
    }

    this.navigator_speak.text = this.result;
    this.navigator_speak.lang = 'fr';
    this.navigator_speak.rate = 0.8;

    speechSynthesis.speak(this.navigator_speak);
  }
}
