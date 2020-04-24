import { createStore, combine } from 'effector';
import {
  loadList,
  setLoaded,
  selectDog,
  scoldDog,
  updateList,
  toggleFilter,
  submitForm,
  setField,
} from './event';
import { Dog, BreedFilter, BeerForm, FormEvent } from '../shared/types';

export const dogBreedFilter = createStore([
  { letter: 'a', selected: false },
  { letter: 'b', selected: false },
  { letter: 'c', selected: false },
  { letter: 'd', selected: false },
  { letter: 'e', selected: false },
  { letter: 'f', selected: false },
  { letter: 'g', selected: false },
  { letter: 'h', selected: false },
  { letter: 'i', selected: false },
  { letter: 'j', selected: false },
  { letter: 'k', selected: false },
  { letter: 'l', selected: false },
  { letter: 'm', selected: false },
  { letter: 'n', selected: false },
  { letter: 'o', selected: false },
  { letter: 'p', selected: false },
  { letter: 'q', selected: false },
  { letter: 'r', selected: false },
  { letter: 's', selected: false },
  { letter: 't', selected: false },
  { letter: 'u', selected: false },
  { letter: 'v', selected: false },
  { letter: 'w', selected: false },
  { letter: 'x', selected: false },
  { letter: 'y', selected: false },
  { letter: 'z', selected: false },
  { letter: '', selected: false },
]).on(toggleFilter, (list: BreedFilter[], selectedLetter: string) =>
  list.map((breedFilterItem: BreedFilter) => {
    return breedFilterItem.letter === selectedLetter
      ? {
          ...breedFilterItem,
          selected: true,
        }
      : {
          ...breedFilterItem,
          selected: false,
        };
  })
);

const filter = createStore('').on(
  dogBreedFilter,
  (_, list) =>
    list.find((breedFilter: BreedFilter) => breedFilter.selected)?.letter
);

const filterFn = filter.map((filter) => {
  if (filter === '') {
    return (dog: Dog) => true;
  } else {
    return (dog: Dog) => dog.breed.startsWith(filter);
  }
});

export const loaded = createStore<Boolean>(false).on(
  setLoaded,
  (_, isLoaded: Boolean) => isLoaded
);

export const selectedDog = createStore<Dog>({
  breed: '',
  image: '',
  scolded: 0,
})
  .on(selectDog, (_, newSelectedDog: Dog) => newSelectedDog)
  .on(scoldDog, (currentSelectedDog: Dog) => {
    const updatedDog = {
      ...currentSelectedDog,
      scolded: currentSelectedDog.scolded + 1,
    };

    updateList(updatedDog);

    return updatedDog;
  });

export const dogs = createStore<Dog[]>([])
  .on(loadList, (_, list: Dog[]) => list)
  .on(updateList, (list: Dog[], updatedDog: Dog) =>
    list.map((dog: Dog) => {
      if (dog.breed === updatedDog.breed) {
        return updatedDog;
      }

      return dog;
    })
  );

export const filtered = combine(dogs, filterFn, (list: Dog[], fn: any) =>
  list.filter(fn)
);

export const beerForm = createStore<BeerForm>({
  beerName: '',
  beerType: '',
  hasCorn: false,
  ingredients: '',
}).on(setField, (form: BeerForm, event: FormEvent) => {
  return { ...form, [event.name]: event.value };
});

export const validForm = beerForm.map(
  (form: BeerForm) =>
    form.beerName.length > 0 &&
    form.beerType.length > 0 &&
    form.ingredients.length > 0
);

export const beerFormik = createStore<BeerForm>({
  beerName: '',
  beerType: '',
  hasCorn: false,
  ingredients: '',
}).on(submitForm, (_, submittedData: any) => submittedData);
