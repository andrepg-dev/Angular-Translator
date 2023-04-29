import { Component } from '@angular/core';
import { languages_symbols } from '../translate/languages';
import { TranslateService } from '../Services/translate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
})
export class TranslateComponent {
  // Languages variables
  languages = languages_symbols;
  languagesArray = Object.entries(this.languages);
  languageSelectedTo = 'en';
  languageSelectedFrom = 'es';
  result!: string;

  // Inputs text values variables
  text: string = '';

  // Speech Recognition Variables
  windows_recognition = new (window as any).webkitSpeechRecognition();
  recording!: boolean;
  text_recognition!: string;

  // Hear Voice From Navigator variables
  navigator_speak = new SpeechSynthesisUtterance();

  constructor(private translateService: TranslateService, private navegador: Router) {}

  // Translate Function
  translate() {
    // If the text null or less than 5
    if (!this.text) {
      this.result = '';
      return;
    }

    this.translateService
      .translate(this.text, this.languageSelectedFrom, this.languageSelectedTo)
      .subscribe((res: any) => {
        this.result = res[0][0][0];
      });
  }

  recognition() {
    this.windows_recognition.start();
    this.recording = true;

    this.windows_recognition.onresult = (event: any) => {
      this.text_recognition = event.results[0][0].transcript;
      this.text += ` ${this.text_recognition}`;
    };

    this.windows_recognition.addEventListener('end', () => {
      this.recording = false;
      this.translate();
    });
  }

  stop_recognition() {
    this.windows_recognition.stop();
  }

  hear_voice(tospeak: string, language: string) {
    // Making a validation to check if the result is null
    if (!tospeak) {
      return;
    }

    console.log({tospeak, language});

    this.navigator_speak.text = tospeak;
    this.navigator_speak.lang = language;
    this.navigator_speak.rate = 0.8;

    speechSynthesis.speak(this.navigator_speak);
  }

  reverse() {
    const previus_language_from = this.languageSelectedFrom;
    const previus_language_to = this.languageSelectedTo;

    const previus_text = this.text;
    const previus_result = this.result;

    // Changing values to reverse
    this.languageSelectedFrom = previus_language_to;
    this.languageSelectedTo = previus_language_from;

    this.text = previus_result;
    this.result = previus_text;

    this.translate();
  }

  LogOut(){
    this.navegador.navigate(['/login']);
  }
}
