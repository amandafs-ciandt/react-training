import { createEvent } from 'effector';
import { Dog, BeerForm, FormEvent } from '../shared/types';

export const setLoaded = createEvent<Boolean>('set loaded list');

export const loadList = createEvent<Dog[]>('load dogs list');
export const updateList = createEvent<Dog>('update dogs list');

export const selectDog = createEvent<Dog>('select dog');
export const scoldDog = createEvent<void>('scold dog');

export const toggleFilter = createEvent<string>('toggle filter');

export const setField = createEvent<FormEvent>('set field');
export const submitForm = createEvent<BeerForm>('submit form');
