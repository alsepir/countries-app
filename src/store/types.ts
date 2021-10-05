export interface IReduxAction<T = any, P = any> {
  type: T;
  payload?: P;
}

export interface ICountryModel {
  altSpellings: string[];
  area: number;
  borders: string[];
  capital: string[];
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  currencies: any;
  demonyms: any;
  flag: string;
  flags: {
    [key: string]: string;
  };
  idd: any;
  independent: boolean;
  landlocked: boolean;
  languages: {
    [key: string]: string;
  };
  latlng: number[]
  maps: {
    [key: string]: string;
  };
  name: {
    [key: string]: string;
  };
  population: number;
  region: string;
  status: string;
  subregion: string;
  tld: string[];
  translations: any;
  unMember: boolean;
}