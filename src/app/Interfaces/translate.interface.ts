export interface RootObject {
  data: Data;
}

export interface Data {
  languages: Language[];
}

export interface Language {
  language: string;
}
