import { Component } from '@angular/core';
import { TranslateService } from '../Services/translate.service';
import { languages_symbols } from '../translate/languages';

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
  speaking!: boolean;

  constructor(private translateService: TranslateService) {
    console.clear();
  }

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
    // Starting recognition.
    this.windows_recognition.start();
    this.recording = true;

    // Taking the value of the recognition.
    this.windows_recognition.onresult = (event: any) => {
      this.text_recognition = event.results[0][0].transcript;
      this.text += ` ${this.text_recognition.toLowerCase()}`;
    };

    // Making a valitation if the microphone are not recording.
    this.windows_recognition.addEventListener('end', () => {
      this.recording = false;
      this.translate();
    });
  }

  stop_recognition() {
    this.windows_recognition.stop();
  }

  hear_voice(tospeak: string, language: string, element: HTMLElement) {
    // Making a validation to check if the result is null
    if (!tospeak) {
      return;
    }

    // Cancel the voice if the user click two times the button
    this.speaking = !this.speaking;
    if (this.speaking) {
      this.navigator_speak.text = tospeak;
      this.navigator_speak.lang = language;
      this.navigator_speak.rate = 0.8;
      element.classList.add('text-blue');

      speechSynthesis.speak(this.navigator_speak);
    } else if (speechSynthesis.speaking && !this.speaking) {
      element.classList.remove('text-blue');
      speechSynthesis.cancel();
    }

    // Making a valitation if the voice is not talking, this variable gonna be false.
    this.navigator_speak.addEventListener('end', () => {
      element.classList.remove('text-blue');
      return (this.speaking = false);
    });
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

  textCopied!: boolean;
  Copy(text: string) {
    // If are not text return
    if (!text) return;

    navigator.clipboard.writeText(text);
    this.textCopied = true;

    setTimeout(() => {
      this.textCopied = false;
    }, 1000);
  }
}
