export interface Dog {
  breed: string;
  image: string;
  scolded: number;
}

export interface BreedFilter {
  letter: string;
  selected: boolean;
}

export interface BeerForm {
  beerName: string;
  beerType: string;
  hasCorn: boolean;
  ingredients: string;
}

export interface FormEvent {
  name: string;
  value: any;
}
